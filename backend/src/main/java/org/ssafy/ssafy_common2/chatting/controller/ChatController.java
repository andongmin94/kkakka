package org.ssafy.ssafy_common2.chatting.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2.chatting.dto.request.ChatMessageDto;
import org.ssafy.ssafy_common2.chatting.entity.ChatJoin;
import org.ssafy.ssafy_common2.chatting.entity.Message;
import org.ssafy.ssafy_common2.chatting.repository.ChatJoinRepository;
import org.ssafy.ssafy_common2.chatting.repository.MessageRepository;
import org.ssafy.ssafy_common2.chatting.service.ChatRoomMySQLService;
import org.ssafy.ssafy_common2.chatting.service.ChatService;

import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ChatController {

    private final MessageRepository messageRepository;
    private final ChatJoinRepository chatJoinRepository;
    private final ChatRoomMySQLService chatRoomMySQLService;
    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations template;
    private final ChatService chatService;


    // 1) 입장 메세지 용

    @MessageMapping("/chat/enterUser")
    @Transactional // 영속성을 위해서
    public void enterUser(String publishMessage, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("++++++ Chat Controller 입장 메세지 받음 ++++++");
        log.info("What Accessor Header got {}", headerAccessor);

        try{
            ChatMessageDto msg = objectMapper.readValue(publishMessage, ChatMessageDto.class);
            log.info("들어온 ENTER 메세지 {}", msg.toString());

            LocalDateTime now = LocalDateTime.now();

            // 1) 안 들어온 데이터 추가해주기
            msg.setMessageType("ENTER");
            msg.setCreatedAt(now);
            msg.setUpdateAt(now);

            // 2) 메세지 내용을 DB에 저장

                // 2-1) ChatJoin 찾기
            ChatJoin chatJoin = chatJoinRepository.getChatJoinByUserIdANDByChatRoomIdDAndDeletedAtIsNull(msg.getUserId(), msg.getChatRoomId()).orElse(null);


//            log.info("chatJoin 내용: {} ", chatJoin.toString() );

                // 2-2) 채팅 참여가 존재한다면
            if(chatJoin != null){
                // 2-3) Message Insert DTO에 맞게 만들어 넣기
                messageRepository.InsertMessage(msg.getContent(), msg.getMessageType(), msg.getUserId(), msg.getChatRoomId(),
                        msg.getCreatedAt(), msg.getUpdateAt());
            }




            // 3) 채팅방 유저 +1
            chatRoomMySQLService.updateUserCnt(msg.getChatRoomId(), "PLUS");

            // 4) 프론트로 다시 보내기
            template.convertAndSend("/sub/chat/room/"+ msg.getChatRoomId(), msg);
        }catch (Exception e){
            log.error("Exception {}",e.getMessage());
        }
    }


    // 2) TALK 타입 메세지가 WebSocket으로 발행되는 경우, 전처리기 STOMP Handler를 거친 후 실행된다.
    @MessageMapping("/chat/sendMessage")
    @Transactional // 영속성을 위해서
    public void sendMessage (String publishMessage) {
        log.info("MESSAGE {}", publishMessage);

        ChatMessageDto msg = null;
        try {
            msg = objectMapper.readValue(publishMessage, ChatMessageDto.class);
            log.info("들어온 TALK 메세지 {}", msg.toString());

            LocalDateTime now = LocalDateTime.now();

            // 1) 안 들어온 데이터 추가해주기
            msg.setCreatedAt(now);
            msg.setUpdateAt(now);

            // 2) 메세지 내용을 DB에 저장
            // 2-1) ChatJoin 찾기
            ChatJoin chatJoin = chatJoinRepository.getChatJoinByUserIdANDByChatRoomIdDAndDeletedAtIsNull(msg.getUserId(), msg.getChatRoomId()).orElse(null);

            // 2-2) 채팅 참여가 존재한다면
            if(chatJoin != null){
                if(msg.getImgCode() == null){
                    // 2-3) Message Insert DTO에 맞게 만들어 넣기
                    messageRepository.InsertMessage(msg.getContent(), msg.getMessageType(), msg.getUserId(), msg.getChatRoomId(),
                            msg.getCreatedAt(), msg.getUpdateAt());
                }else {
                    ChatMessageDto msgWithImg = chatService.BinaryImageChange(msg);

                    System.out.println(msgWithImg.toString());

                    messageRepository.InsertMessage(msgWithImg.getContent(),
                            msgWithImg.getMessageType(),
                            msgWithImg.getUserId(),
                            msgWithImg.getChatRoomId(),
                            msgWithImg.getCreatedAt()
                    ,msgWithImg.getUpdateAt());

                    msg = msgWithImg;
                }
            }else{
                throw new CustomException(ErrorType.THIS_USER_DIDNT_JOIN_IN_THIS_ROOM);
            }



        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        template.convertAndSend("/sub/chat/room/" + msg.getChatRoomId(), msg);
    }

    // 채팅방 나가기 전 메세지 보내는 곳
    @MessageMapping("/chat/exitChatRoom")
    @Transactional // 영속성을 위해서
    public void exitChatRoom(String publishMessage){
        log.info("EXIT_MESSAGE {}", publishMessage);

        ChatMessageDto msg = null;
        try {
            msg = objectMapper.readValue(publishMessage, ChatMessageDto.class);
            log.info("들어온 EXIT 메세지 {}", msg.toString());

            LocalDateTime now = LocalDateTime.now();

            // 1) 안 들어온 데이터 추가해주기
            msg.setMessageType("QUIT");
            msg.setCreatedAt(now);
            msg.setUpdateAt(now);

            // 2) 메세지 내용을 DB에 저장
            // 2-1) ChatJoin 찾기
            ChatJoin chatJoin = chatJoinRepository.getChatJoinByUserIdANDByChatRoomIdDAndDeletedAtIsNull(msg.getUserId(), msg.getChatRoomId()).orElse(null);

            // 2-2) 채팅 참여가 존재한다면
            if(chatJoin != null){
                // 2-3) Message Insert DTO에 맞게 만들어 넣기
                messageRepository.InsertMessage(msg.getContent(), msg.getMessageType(), msg.getUserId(), msg.getChatRoomId(),
                        msg.getCreatedAt(), msg.getUpdateAt());
            }

            // 2-3) 메세지를 보내온 User의 Id와 roomId에 해당하는 방의 수정일자 바꾸기
            chatJoinRepository.updateChatJoinModifiedAt(LocalDateTime.now(), 1, msg.getChatRoomId());


            // 3) 채팅방 유저 -1
            chatRoomMySQLService.updateUserCnt(msg.getChatRoomId(), "MINUS");

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    // 사용자가 App을 끄거나, 방에서 나갔을 때 실행하는 함수
    @EventListener
    @Transactional // 영속성을 위하여
    public void webSocketDisconnectListener(SessionDisconnectEvent event) {
        log.info("DisConnEvent {}", event);

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        //
//        long userId = Long.parseLong((String) headerAccessor.getSessionAttributes().get("userId"));
//        long chatRoomId = Long.parseLong((String) headerAccessor.getSessionAttributes().get("chatRoomId"));
//
//        System.out.println("DisConnectEvent로 알게된 UserId: "+userId);
//        System.out.println("DISCONNECTEVENT로 알게된 ChatRoomId: "+chatRoomId);

        log.info("headAccessor {}", headerAccessor);
    }
}
