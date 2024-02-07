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
import org.ssafy.ssafy_common2.chatting.dto.response.LiveBroadcastListDto;
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
    @PostMapping("/{type}/enter/{user_id}")
    public ApiResponseDto<?> createRoom (
            @PathVariable(value = "type")String type,
            @PathVariable(value = "user_id") long userId,
            @AuthenticationPrincipal UserDetailsImpl userDetails){

        if(userDetails == null){
            return ResponseUtils.error(ErrorResponse.of(ErrorType.NOT_FOUND_USER));
        }

        return chatRoomMySQLService.createRoom(type,userId,userDetails);
    }


    // 2) 현 유저가 참여한 1대1 채팅방 리스트 반환
    @GetMapping("/dm")
    public ApiResponseDto<?> getAllChatRoomInfo (@AuthenticationPrincipal UserDetailsImpl userDetails) {

        List<ChatRoomInfoDto> ans =  chatRoomMySQLService.getChatRoomInfo(userDetails.getUser().getId());

        if(ans == null){
            return  ResponseUtils.error(ErrorResponse.of(ErrorType.NO_CHATTING_ROOM_FOR_U));
        }

        return ResponseUtils.ok(ans, MsgType.DATA_SUCCESSFULLY);
    }

    // 3) 현 유저의 친구 중에 라이브가 열린 채팅방 반환
    @GetMapping("/broadcasts")
    public ApiResponseDto<?> getAllBroadCastsRoomInfo(@AuthenticationPrincipal UserDetailsImpl userDetails){

        List<LiveBroadcastListDto> ans = chatRoomMySQLService.findAllBroadCastsRoom(userDetails.getUser());

        if(ans == null){
            return ResponseUtils.error(ErrorResponse.of(ErrorType.NO_LIVE_BROADCAST_ROOM));
        }


        return  ResponseUtils.ok(ans,MsgType.DATA_SUCCESSFULLY);
    }

    // 4) 특정 채팅방의 메세지 내역 불러오기
    @GetMapping("/dm/load/{chat_room_id}")
    public ApiResponseDto<?> loadChatRoomMessage(
            @PathVariable(value = "chat_room_id") long chatRoomId,
            @RequestParam(required = false, defaultValue = "0", value = "page") int pageNo,
            @RequestParam(required = false, defaultValue = "createdAt", value = "criteria") String criteria
    ){

        Page<ChatMessageDto> ans = chatRoomMySQLService.loadChatRoomMessage(chatRoomId, pageNo, criteria);

        if(ans == null){
            return ResponseUtils.error(ErrorResponse.of(ErrorType.NO_MESSAGES_TO_LOAD));
        }

        return ResponseUtils.ok(ans, MsgType.DATA_SUCCESSFULLY);
    }

}

/*
* 1) 채팅방 생성의 경우
*   chat_join 속 user_id == 방 손님, chat_room 속 chat_owner_name == 방 주인,
    채팅방 타입: 1대1 : (위의 두 사람이 같으면 방을 더 만들면 안됨)
               다대다: (삭제되지 않은 채팅방이 아직 존재한다면, 더 이상 방을 새로 만들면 안됨.)
* */
