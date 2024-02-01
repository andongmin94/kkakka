package org.ssafy.ssafy_common2.chatting.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.ssafy_common2._common.exception.ErrorResponse;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.chatting.dto.request.ChatMessageDto;
import org.ssafy.ssafy_common2.chatting.dto.response.ChatRoomInfoDto;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;
import org.ssafy.ssafy_common2.chatting.service.ChatRoomMySQLService;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.util.List;
import java.util.Objects;

import static org.ssafy.ssafy_common2.chatting.entity.ChatRoom.ChatRoomType.ONE;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/friends")
public class ChatRoomController {

    private final ChatRoomMySQLService chatRoomMySQLService;
    private final UserRepository userRepository;


    // 1) (1대1 혹은 중계) 채팅방 생성
    @PostMapping("/{type}/enter/{email}")
    public ApiResponseDto<?> createRoom (
            @PathVariable(value = "type")String type,
            @PathVariable(value = "email") String friendEmail,
            @AuthenticationPrincipal UserDetailsImpl userDetails){

        // 1-1) 방의 타입을 보고   ONE, MANY, DEAD 중 하나 생성
        String roomType = type.equals("dm")? "ONE" : "MANY";
        User owner = userRepository.findByKakaoEmailAndDeletedAtIsNull(friendEmail).orElse(null);

        // 1-2) 사용자가 등록되지 않았다면 에러 출력
        if(owner == null){
            return ResponseUtils.error(ErrorResponse.of(ErrorType.NOT_FOUND_USER));
        }

        // 1-3) 1대1 채팅방을 만들어달라는 요청을 받았을 경우
        if(roomType.equals("ONE")){

            // 1-3-a) 둘 사이의 1대1 채팅방이 있는지 확인
            long roomId = chatRoomMySQLService.getUserConnectedRoomIdWithOwner(friendEmail, userDetails.getUser().getId(), "ONE");

            // 1-3-b) 둘 사이의 채팅방이 없다면 -1이 반환 되고, 방 생성을 한다.
            if(roomId == -1) {
                // 방 생성
                ChatRoom createdRoom = chatRoomMySQLService.CreateChatRoom(ONE, owner.getUserName(), owner.getKakaoEmail());

                //1-3-b-가) 채팅방 생성이 성공적으로 마무리 되면, chatJoin으로 둘을 연결한다.
                chatRoomMySQLService.insertChatJoin(userDetails.getUser(), createdRoom, 0, false);

                //1-4-d) 나 자신에게 말하기가 아니라면 채팅방 주인도 참가시켜야함.
                if(!Objects.equals(owner.getId(), userDetails.getUser().getId())){
                    chatRoomMySQLService.insertChatJoin(owner,createdRoom, 0, false);
                }

                if(createdRoom == null){
                    return ResponseUtils.error(ErrorResponse.of(ErrorType.FAILED_TO_MAKE_CHATROOM));
                }



                return  ResponseUtils.ok(createdRoom.getId(), MsgType.DATA_SUCCESSFULLY);
            }else {
                return ResponseUtils.ok(roomId, MsgType.DATA_SUCCESSFULLY);
            }
        }

        // 1-4) 중계방 만들어달라는 요청을 받았을 경우
        else{
            // 1-4-a) 해당 친구 이름으로 중계방이 있는지 확인
            ChatRoom broadcastRoom = chatRoomMySQLService.getRoomWithEmail(ChatRoom.ChatRoomType.MANY, friendEmail);

            // 해당 친구 이름의 안 죽은 중계방이 있다.
            if(broadcastRoom !=null) {
                // 해당 중계방과 유저가 연결되었는지 확인한다.
                long roomId = chatRoomMySQLService.getUserConnectedRoomIdWithOwner(friendEmail, userDetails.getUser().getId(), "MANY");

                // 연결이 안되어있을 경우 roomId == -1이다. 따라서 해당 중계방에 현 유저를 참여시킨다.
                if(roomId == -1){
                    chatRoomMySQLService.insertChatJoin(userDetails.getUser(), broadcastRoom, 0, false);
                }
            }

            // 해당 친구 이름으로 안 죽은 중계방이 없다.
            else if(broadcastRoom == null){
                broadcastRoom = chatRoomMySQLService.CreateChatRoom(ChatRoom.ChatRoomType.MANY, owner.getUserName(), owner.getKakaoEmail());

                //1-4-c) 만드는데 성공하면, 현재 유저를 해당 중계방에 참여한 것으로 바꾼다.
                chatRoomMySQLService.insertChatJoin(userDetails.getUser(), broadcastRoom, 0, false);



            }

            // 1-4-e) 만드는데 실패하면, 에러 출력한다.
            if(broadcastRoom == null){
                return ResponseUtils.error(ErrorResponse.of(ErrorType.FAILED_TO_MAKE_CHATROOM));
            }


            // 결과 주기
            return ResponseUtils.ok(broadcastRoom.getId(), MsgType.DATA_SUCCESSFULLY);
        }
    }


    // 2) 현 유저가 참여한 채팅방 리스트 반환
    @GetMapping("/dm")
    public List<ChatRoomInfoDto> getAllChatRoomInfo (@AuthenticationPrincipal UserDetailsImpl userDetails) {
        System.out.println(userDetails.getUser().getId());

        return chatRoomMySQLService.getChatRoomInfo(userDetails.getUser().getId());
    }

    // 3) 현 유저의 친구 중에 라이브가 열린 채팅방 반환
    @GetMapping("/broadcasts")
    public List<ChatRoomInfoDto> getAllBroadCastsRoomInfo(@AuthenticationPrincipal UserDetailsImpl userDetails){

        return  null;
    }

    // 4) 특정 채팅방의 메세지 내역 불러오기
    @GetMapping("/dm/load/{chatRoomId}")
    public Page<ChatMessageDto> loadChatRoomMessage(
            @PathVariable(value = "chatRoomId") long chatRoomId,
            @RequestParam(required = false, defaultValue = "0", value = "page") int pageNo,
            @RequestParam(required = false, defaultValue = "createdAt", value = "criteria") String criteria
    ){
        return chatRoomMySQLService.loadChatRoomMessage(chatRoomId, pageNo, criteria);
    }

}

/*
* 1) 채팅방 생성의 경우
*   chat_join 속 user_id == 방 손님, chat_room 속 chat_owner_name == 방 주인,
    채팅방 타입: 1대1 : (위의 두 사람이 같으면 방을 더 만들면 안됨)
               다대다: (삭제되지 않은 채팅방이 아직 존재한다면, 더 이상 방을 새로 만들면 안됨.)
* */
