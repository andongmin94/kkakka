package org.ssafy.ssafy_common2.chatting.config.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.ssafy.ssafy_common2._common.jwt.JwtUtil;
import org.ssafy.ssafy_common2.chatting.entity.ChatJoin;
import org.ssafy.ssafy_common2.chatting.repository.ChatJoinRepository;
import org.ssafy.ssafy_common2.chatting.repository.ChatRoomRepository;
import org.ssafy.ssafy_common2.chatting.service.ChatRoomRedisService;
import org.ssafy.ssafy_common2.chatting.service.ChatService;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final JwtUtil jwtUtil;
    private final ChatRoomRedisService chatRoomRedisService;
    private final ChatService chatService;
    private final ChatJoinRepository chatJoinRepository;
    private final ChatRoomRepository chatRoomRepository;

    // 1) WebSocket으로 들어온 메세지 전송 요청이 처리 되기 전에 실행
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        // 1-1)
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        // 1-2) webSocket 연결 시 ======================================================================
        if(StompCommand.CONNECT == accessor.getCommand()) {
            System.out.println("++++++++++++++++++++++++연결 완료++++++++++++++++++++++++++");
            System.out.println(message.getHeaders());
            System.out.println(channel);
        }

        // 1-3) 특정 채팅방 들어가겠다는 요청 시 =========================================================
        else if (StompCommand.SUBSCRIBE == accessor.getCommand()) {

            System.out.println("===================메세지 Header에 든 내용들:" + message.getHeaders().entrySet());

            //1-3-a) 헤더에서 구독 Destination 정보를 얻고, 거기서 roomId를 추출한다.
            long roomId = chatService.getRoomId(
                    Optional.ofNullable(
                            (String) message.getHeaders().get("simpDestination")
                    ).orElse("null"));

            System.out.println(roomId);
            System.out.println(message.getHeaders());


            //1-3-b) ResponseBody 에서 User_id도 추출해서 chat_join에 roomID와 맵핑되어있는지 확인
            long userId = (long)Optional.ofNullable(message.getHeaders().get("userId")).orElse(-1);
            String chatRoomType = (String) Optional.of(message.getHeaders().get("chatRoomType")).orElse("ONE");

            ChatJoin connectedChatJoin = chatJoinRepository.getChatJoinByUserIdANDByChatRoomIdDAndDeletedAtIsNull(userId,roomId).orElse(null);


            //1-3-c) Message 객체 생성 후 ChatService로 전달

            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("UnknownUser");

            chatService.sendChatMessage(org.ssafy.ssafy_common2.chatting.entity.Message.of(name+"님께서 입장하셨습니다.",
                    connectedChatJoin, org.ssafy.ssafy_common2.chatting.entity.Message.MessageType.ENTER));

            log.info("SUBSCRIBE {} {}", name, roomId);

        }

        // 1-4) 채팅방에 수정일자 변경해주기
        else if (StompCommand.DISCONNECT == accessor.getCommand()){
            // 1-4-a) Header에서 RoomId 얻기
            long roomId = (long)Optional.ofNullable(message.getHeaders().get("roomId")).orElse(-1);
            LocalDateTime now = LocalDateTime.now();

            chatRoomRepository.updateModifiedAt(now,roomId);

            log.info("DISCONNECTED 완료 바뀐시간: {} 방번호: {}", now, roomId );

        }


        return message;
    }

}

/*
  1-1)
* STOMP는 HTTP와는 다른 자신만의 규격인 STOMP FRAME 을 가지고 있다.
  StompHeaderAccessor 는 해당 STOMP FRAME 에서 메세지를 추출하거나, 메세지를 STOMP FRAME 으로 만드는데 사용
  StompHeaderAccessor 객체는 존재하는 메세지를 wrap 이란 매소드로 감싸서 바로 사용할 수 있다.


*
* */
