package org.ssafy.ssafy_common2.itemshop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.ssafy.ssafy_common2.itemshop.dto.request.MegaphoneCreateRequestDto;
import org.ssafy.ssafy_common2.itemshop.dto.response.MegaphoneCreateResponseDto;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.itemshop.entity.Megaphone;
import org.ssafy.ssafy_common2.itemshop.repository.MegaphoneRepository;
import org.ssafy.ssafy_common2.notification.repository.EmitterRepository;
import org.ssafy.ssafy_common2.notification.service.NotificationService;
import org.ssafy.ssafy_common2.user.entity.User;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MegaphoneService {

    private final MegaphoneRepository megaphoneRepository;
    private final EmitterRepository emitterRepository;

    private final ItemDealService itemDealService;

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
        sendMegaphone(responseDto);

        return responseDto;

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
    private void send(MegaphoneCreateResponseDto megaphone, SseEmitter emitter, String emitterId) {
        try {
            emitter.send(
                    SseEmitter.event()
                    .name("megaphone")
                    .reconnectTime(1000L)
                    .data(megaphone)
            );
        }
        catch (IOException exception) {
            emitter.complete();
            emitterRepository.deleteById(emitterId);
        }

    }


}
