package org.ssafy.ssafy_common2.itemshop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.ssafy.ssafy_common2.itemshop.dto.request.MegaphoneCreateRequestDto;
import org.ssafy.ssafy_common2.itemshop.dto.response.MegaphoneCreateResponseDto;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.itemshop.entity.Megaphone;
import org.ssafy.ssafy_common2.itemshop.repository.MegaphoneEventRepository;
import org.ssafy.ssafy_common2.itemshop.repository.MegaphoneRepository;
import org.ssafy.ssafy_common2.notification.repository.EmitterRepository;
import org.ssafy.ssafy_common2.user.entity.User;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
@RequiredArgsConstructor
public class MegaphoneService {

    private final MegaphoneRepository megaphoneRepository;
    private final EmitterRepository emitterRepository;
    private final MegaphoneEventRepository megaphoneEventRepository;

    private final ItemDealService itemDealService;
    private final ExecutorService executor = Executors.newSingleThreadExecutor();

    // 확성기 생성
    @Transactional
    public MegaphoneCreateResponseDto createMegaphone(User user, MegaphoneCreateRequestDto requestDto) {

        // 아이템 거래 내역 생성
        ItemDealList itemDealList = itemDealService.buyItem(user, "확성기");

        // 확성기 생성
        Megaphone megaphone = Megaphone.of(requestDto.getContent());

        // 연관관계 편의 메서드 사용
        megaphone.addItemDealList(itemDealList);
        itemDealList.setMegaphone(megaphone);

        megaphoneRepository.save(megaphone);

        MegaphoneCreateResponseDto responseDto = MegaphoneCreateResponseDto.of(user.getKakaoEmail(), megaphone.getContent(), megaphone.getCreatedAt());

        // 확성기 sse 전역 알림!
        addMegaphoneEvent(responseDto);

        return responseDto;

    }

    private void addMegaphoneEvent(MegaphoneCreateResponseDto megaphoneDto) {

        if (megaphoneEventRepository.hasPendingMegaphoneEvents()) {
            // 확성기 대기열 존재 -> 이미 동작 중인 확성기 전송 메서드 있음
            megaphoneEventRepository.saveMegaphoneEvent(megaphoneDto);
        }
        else {
            // 확성기 대기열 존재하지 않으면, 확성기 전송 시작 필요
            megaphoneEventRepository.saveMegaphoneEvent(megaphoneDto);
            scheduleMegaphoneEventAtInterval();

        }
    }

    private void scheduleMegaphoneEventAtInterval() {
        executor.submit(() -> {
            try {
                while(megaphoneEventRepository.hasPendingMegaphoneEvents()) {
                    sendMegaphone(megaphoneEventRepository.getNextMegaphoneEvent());
                    Thread.sleep(3500); // 명시적으로 10초 뒤에 다음 요소 전송
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

    }

    // 모든 접속자에게 확성기 보내기
    private void sendMegaphone(MegaphoneCreateResponseDto megaphone) {

        Map<String, SseEmitter> emitters = emitterRepository.findAllEmitter();

        emitters.forEach(
                (key, emitter) -> {
                    send(megaphone, emitter, key);
                }
        );
    }

    // emitter로 이벤트 전송
    protected void send(MegaphoneCreateResponseDto megaphone, SseEmitter emitter, String emitterId) {
        try {
            emitter.send(
                    SseEmitter.event()
                            .id(megaphone.getCreatedAt().toString())
                            .name("megaphone")
                            .reconnectTime(1000L)
                            .data(megaphone)
            );
        } catch (IllegalStateException | IOException exception){
            emitter.complete();
            emitterRepository.deleteById(emitterId);
        }

    }
}
