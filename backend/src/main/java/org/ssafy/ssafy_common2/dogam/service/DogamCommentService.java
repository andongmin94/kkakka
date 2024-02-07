package org.ssafy.ssafy_common2.dogam.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2.dogam.dto.reqeust.DogamCommentCreateRequestDto;
import org.ssafy.ssafy_common2.dogam.dto.response.DogamCommentResponseDto;
import org.ssafy.ssafy_common2.dogam.entity.CommentDogam;
import org.ssafy.ssafy_common2.dogam.entity.Dogam;
import org.ssafy.ssafy_common2.dogam.repository.CommentDogamRepository;
import org.ssafy.ssafy_common2.dogam.repository.DogamRepository;
import org.ssafy.ssafy_common2.notification.dto.NotificationDto;
import org.ssafy.ssafy_common2.notification.entity.NotificationType;
import org.ssafy.ssafy_common2.notification.service.NotificationService;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
public class DogamCommentService {

    private final DogamRepository dogamRepository;
    private final UserRepository userRepository;
    private final CommentDogamRepository commentDogamRepository;

    private final NotificationService notificationService;

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

        CommentDogam commentDogam = CommentDogam.of(user.getKakaoEmail(), dto.getComment(), dogam);
        commentDogamRepository.saveAndFlush(commentDogam);

        DogamCommentResponseDto commentResponseDto = DogamCommentResponseDto.of(commentDogam.getId(), user.getId(), user.getKakaoProfileImg(), dto.getComment(), user.getUserName(), user.getKakaoEmail(), LocalDateTime.now());

        // 새 댓글 알림
        notifyNewComment(user, dogam.getUser(), dogamId);

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

    // 새 댓글 알림
    private void notifyNewComment(User sender, User receiver, Long dogamId) {

        notificationService.send(
                NotificationDto.of(
                        receiver,
                        NotificationType.NEW_COMMENT,
                        "새로운 댓글이 등록되었습니다.",
                        receiver.getKakaoProfileImg(),
                        sender.getKakaoEmail(),
                        dogamId
                )
        );
    }

}
