package org.ssafy.ssafy_common2.dogam.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2.dogam.entity.CommentDogam;
import org.ssafy.ssafy_common2.dogam.entity.DislikeDogam;
import org.ssafy.ssafy_common2.dogam.entity.Dogam;
import org.ssafy.ssafy_common2.dogam.repository.CommentDogamRepository;
import org.ssafy.ssafy_common2.dogam.repository.DislikeDogamRepository;
import org.ssafy.ssafy_common2.dogam.repository.DogamRepository;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class DogamDislikeService {

    private final DogamRepository dogamRepository;
    private final UserRepository userRepository;
    private final CommentDogamRepository commentDogamRepository;
    private final DislikeDogamRepository dislikeDogamRepository;

    public void createDogamDislike(Long dogamId, User user) {

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        Dogam dogam = dogamRepository.findByIdAndDeletedAtIsNull(dogamId).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_DOGAM)
        );

        if (dogam.getUser() == user) {
            throw new CustomException(ErrorType.FAILED_TO_DISLKE_DOGAM);
        }
        DislikeDogam dislikeDogam = dislikeDogamRepository.findByUserEmailAndDogamIdAndDeletedAtIsNull(user.getKakaoEmail(), dogamId).orElse(
                DislikeDogam.of(user.getKakaoEmail(), false, dogam)
        );

        // is_dislike 는 우선 비활성. 굳이 필요가 없음, 나중에 필요시 수정
        if (dislikeDogam.isDislike()) {
            throw new CustomException(ErrorType.ALREADY_EXIST_DISLIKE);
        }

        dislikeDogam.setDislike(true);
        dislikeDogamRepository.save(dislikeDogam);
    }

    public void deleteDogamDislike(Long dogamId, User user) throws CustomException {

        if (userRepository.findByIdAndDeletedAtIsNull(user.getId()).isEmpty()) {
            throw new CustomException(ErrorType.NOT_FOUND_USER);
        }

        DislikeDogam dislikeDogam = dislikeDogamRepository.findByUserEmailAndDogamIdAndDeletedAtIsNull(user.getKakaoEmail(),dogamId).orElseThrow(
                () -> new CustomException(ErrorType.NOT_FOUND_DOGAM_DISLIKE)
        );

        if (!dislikeDogam.isDislike()) {
            throw new CustomException(ErrorType.ALREADY_EXIST_NON_DISLIKE);
        }

        dislikeDogam.setDislike(false);
    }
}
