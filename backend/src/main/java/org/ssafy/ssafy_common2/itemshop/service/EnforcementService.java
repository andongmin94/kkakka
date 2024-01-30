package org.ssafy.ssafy_common2.itemshop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2.itemshop.dto.request.EnforcementCreateRequestDto;
import org.ssafy.ssafy_common2.itemshop.dto.response.EnforcementCreateResponseDto;
import org.ssafy.ssafy_common2.itemshop.entity.Enforcement;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.itemshop.repository.EnforcementRepository;
import org.ssafy.ssafy_common2.user.entity.User;

@Service
@RequiredArgsConstructor
public class EnforcementService {

    private final EnforcementRepository enforcementRepository;
    private final ItemDealService itemDealService;

    @Transactional
    public EnforcementCreateResponseDto addEnforcement(User attacker, User defender, EnforcementCreateRequestDto requestDto) {

        // 아이템 거래 내역 생성
        ItemDealList itemDealList = itemDealService.buyItem(attacker, "칭찬");

        // 칭찬권 생성
        Enforcement enforcement = Enforcement.of(attacker.getKakaoEmail(), defender.getKakaoEmail(), requestDto.getEnfScript());
        
        // 연관관계 편의 메서드 사용
        enforcement.addItemDealList(itemDealList);
        itemDealList.setEnforcement(enforcement);

        enforcementRepository.save(enforcement);

        return EnforcementCreateResponseDto.from(enforcement);
        
    }

}
