package org.ssafy.ssafy_common2.dogam.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.service.S3Uploader;
import org.ssafy.ssafy_common2.dogam.dto.reqeust.DogamCommentCreateRequestDto;
import org.ssafy.ssafy_common2.dogam.dto.response.DogamCommentResponseDto;
import org.ssafy.ssafy_common2.dogam.entity.CommentDogam;
import org.ssafy.ssafy_common2.dogam.entity.Dogam;
import org.ssafy.ssafy_common2.dogam.repository.CommentDogamRepository;
import org.ssafy.ssafy_common2.dogam.repository.DislikeDogamRepository;
import org.ssafy.ssafy_common2.dogam.repository.DogamRepository;
import org.ssafy.ssafy_common2.itemshop.repository.ItemDealListRepository;
import org.ssafy.ssafy_common2.itemshop.repository.ItemShopRepository;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.AliasRepository;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;
import org.ssafy.ssafy_common2.user.repository.FriendListRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
public class DogamCommentService {

    private final S3Uploader s3Uploader;
    private final DogamRepository dogamRepository;
    private final UserRepository userRepository;
    private final ItemDealListRepository itemDealListRepository;
    private final DynamicUserInfoRepository dynamicUserInfoRepository;
    private final ItemShopRepository itemShopRepository;
    private final FriendListRepository friendListRepository;
    private final AliasRepository aliasRepository;
    private final DislikeDogamRepository dislikeDogamRepository;
    private final CommentDogamRepository commentDogamRepository;

    public DogamCommentResponseDto createDogamComment(DogamCommentCreateRequestDto dto, Long dogamId, User user) {

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }
        Dogam dogam = dogamRepository.findByIdAndDeletedAtIsNull(dogamId).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_DOGAM)
        );

        if (dto.getComment() == null) {
            throw new CustomException(ErrorType.NOT_FOUND_COMMENT);
        }

        DogamCommentResponseDto commentResponseDto = DogamCommentResponseDto.of(user.getKakaoProfileImg(), dto.getComment(), user.getUserName(), user.getKakaoEmail());
        CommentDogam commentDogam = CommentDogam.of(user.getKakaoEmail(), dto.getComment(), dogam);
        commentDogamRepository.save(commentDogam);
        return commentResponseDto;
    }

    public void deleteComment(Long commentId, User user) {

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        CommentDogam commentDogam = commentDogamRepository.findByIdAndDeletedAtIsNull(commentId).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_DOGAM_COMMENT)
        );

        if (!Objects.equals(commentDogam.getUserEmail(), user.getKakaoEmail())) {
            throw new CustomException(ErrorType.NOT_MATCHING_COMMENT_USER);
        }
        commentDogamRepository.delete(commentDogam);
    }
}
