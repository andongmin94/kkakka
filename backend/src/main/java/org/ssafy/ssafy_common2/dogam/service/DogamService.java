package org.ssafy.ssafy_common2.dogam.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.service.S3Uploader;
import org.ssafy.ssafy_common2.dogam.dto.reqeust.DogamCreateRequestDto;
import org.ssafy.ssafy_common2.dogam.dto.response.DogamCreateResponseDto;
import org.ssafy.ssafy_common2.dogam.entity.Dogam;
import org.ssafy.ssafy_common2.dogam.repository.DogamRepository;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.itemshop.entity.ItemShop;
import org.ssafy.ssafy_common2.itemshop.repository.ItemShopRepository;
import org.ssafy.ssafy_common2.itemshop.repository.ItempDealListRepository;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.io.IOException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
public class DogamService {

    private final S3Uploader s3Uploader;
    private final DogamRepository dogamRepository;
    private final UserRepository userRepository;
    private final ItempDealListRepository itempDealListRepository;
    private final DynamicUserInfoRepository dynamicUserInfoRepository;
    private final ItemShopRepository itemShopRepository;

    public DogamCreateResponseDto createDogam(DogamCreateRequestDto dto, String email, User sender) throws IOException {

        if (userRepository.findById(sender.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        // 포인트 차감 로직 시작
        DynamicUserInfo userInfo = dynamicUserInfoRepository.findById(sender.getId()).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_SENDER)
        );

        if (userInfo.getPoint() < 10) {
            throw new CustomException(ErrorType.NOT_ENOUGH_POINT);
        }
        userInfo.minusPoint(10);
        // 포인트 차감 로직 끝

        User receiver = userRepository.findByKakaoEmail(email).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_RECEIVER)
        );

        ItemShop itemShop = itemShopRepository.findByItemName("도감추가").orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_ITEM_SHOP)
        );

        ItemDealList itemDealList = ItemDealList.of(receiver, itemShop);

        // imgURL을 만들어서 S3에 저장 시작
        String imgUrl = "";
        System.out.println(dto.getImgUrl());
        if (dto.getImgUrl() == null) {
            imgUrl = "https://ssafys3.s3.ap-northeast-2.amazonaws.com/static/%EC%9D%B4%EC%A6%88%EB%A6%AC%EC%96%BC.jpg";
        } else {
            imgUrl = s3Uploader.upload(dto.getImgUrl());
        }
        // imgURL을 만들어서 S3에 저장 끝

        Dogam dogam = Dogam.of(dto.getDogamTitle(), imgUrl, receiver);

        // 연관관계 편의 매서드 사용
        dogam.addItemDealList(itemDealList);
        itemDealList.setDogam(dogam);

        dogamRepository.save(dogam);

        DogamCreateResponseDto responseDto = DogamCreateResponseDto.of(imgUrl, dto.getDogamTitle());
        return responseDto;
    }

    public void deleteDogam(Long dogamId, User user) {

        Dogam dogam = dogamRepository.findById(dogamId).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_DOGAM)
        );

        if (userRepository.findById(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        if (!Objects.equals(dogam.getUser().getId(), user.getId())) {
            throw new CustomException(ErrorType.NOT_MATCHING_DOGAM_USER);
        }

        dogamRepository.delete(dogam);
    }
}
