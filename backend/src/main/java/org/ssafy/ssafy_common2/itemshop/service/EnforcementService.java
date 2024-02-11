package org.ssafy.ssafy_common2.itemshop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2.itemshop.dto.request.EnforcementCreateRequestDto;
import org.ssafy.ssafy_common2.itemshop.dto.response.EnforcementCreateResponseDto;
import org.ssafy.ssafy_common2.itemshop.entity.Enforcement;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.itemshop.repository.EnforcementRepository;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class EnforcementService {

    private final EnforcementRepository enforcementRepository;
    private final UserRepository userRepository;

    private final ItemDealService itemDealService;

    @Transactional
    public EnforcementCreateResponseDto addEnforcement(User attacker, Long defenderUserId, EnforcementCreateRequestDto requestDto) {

        // 받는 사람 찾기
        User defender = userRepository.findByIdAndDeletedAtIsNull(defenderUserId)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_RECEIVER));

        // 아이템 거래 내역 생성
        ItemDealList itemDealList = itemDealService.buyItem(attacker, "강제 칭찬권");

        // 칭찬권 생성
        Enforcement enforcement = Enforcement.of(attacker.getKakaoEmail(), defender.getKakaoEmail(), requestDto.getEnfScript());
        
        // 연관관계 편의 메서드 사용
        enforcement.addItemDealList(itemDealList);
        itemDealList.setEnforcement(enforcement);

        enforcementRepository.save(enforcement);

        return EnforcementCreateResponseDto.from(enforcement);
        
    }

}
