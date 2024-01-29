package org.ssafy.ssafy_common2.chatting.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.ssafy_common2._common.exception.ErrorResponse;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;
import org.ssafy.ssafy_common2.chatting.service.ChatRoomMySQLService;
import org.ssafy.ssafy_common2.chatting.service.ChatRoomRedisService;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import static org.ssafy.ssafy_common2.chatting.entity.ChatRoom.ChatRoomType.ONE;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/friends")
public class ChatRoomController {

    private final ChatRoomRedisService chatRoomRedisService;
    private final ChatRoomMySQLService chatRoomMySQLService;
    private final UserRepository userRepository;


    // 1) 채팅방 생성
    @PostMapping("/{type}/create/{email}")
    public ApiResponseDto<?> createRoom (
            @PathVariable(value = "type")String type,
            @PathVariable(value = "email") String friendEmail,
            @AuthenticationPrincipal UserDetailsImpl userDetails){

        // 1-1) 방의 타입을 보고   ONE, MANY, DEAD 중 하나 생성
        String roomType = type.equals("dm")? "ONE" : "MANY";
        User owner = userRepository.findByKakaoEmail(friendEmail).orElse(null);

        // 1-2) 사용자가 등록되지 않았다면 에러 출력
        if(owner == null){
            return ResponseUtils.error(ErrorResponse.of(ErrorType.NOT_FOUND_USER));
        }

        // 1-3) 1대1 채팅방을 만들어달라는 요청을 받았을 경우
        if(roomType.equals("ONE")){
            // 둘 사이의 1대1 채팅방이 있는지 확인
            long roomId = chatRoomMySQLService.getUserConnectedRoomIdWithOwner(friendEmail, userDetails.getUser().getId());

            // 둘 사이의 채팅방이 없다면 -1이 반환 되고, 방 생성을 한다.
            if(roomId == -1) {
                // 방 생성
                ChatRoom createdRoom = chatRoomMySQLService.CreateChatRoom(ONE, owner.getUserName(), owner.getKakaoEmail());
                if(createdRoom == null){
                    return ResponseUtils.error(ErrorResponse.of(ErrorType.FAILED_TO_MAKE_CHATROOM));
                }
                return  ResponseUtils.ok(createdRoom.getId(), MsgType.DATA_SUCCESSFULLY);
            }else {
                return ResponseUtils.ok(roomId, MsgType.DATA_SUCCESSFULLY);
            }
        }
        else{

            ChatRoom broadcastRoom = chatRoomMySQLService.getBroadcastRoomWithEmail(ChatRoom.ChatRoomType.MANY, friendEmail);

            if(broadcastRoom == null){
                broadcastRoom = chatRoomMySQLService.CreateChatRoom(ChatRoom.ChatRoomType.MANY, owner.getUserName(), owner.getKakaoEmail());
            }

            if(broadcastRoom == null){
                return ResponseUtils.error(ErrorResponse.of(ErrorType.FAILED_TO_MAKE_CHATROOM));
            }

            return ResponseUtils.ok(broadcastRoom.getId(), MsgType.DATA_SUCCESSFULLY);
        }
    }


    // 2) 채팅방 리스트 반환


}

/*
* 1) 채팅방 생성의 경우
*   chat_join 속 user_id == 방 손님, chat_room 속 chat_owner_name == 방 주인,
    채팅방 타입: 1대1 : (위의 두 사람이 같으면 방을 더 만들면 안됨)
               다대다: (삭제되지 않은 채팅방이 아직 존재한다면, 더 이상 방을 새로 만들면 안됨.)
* */
