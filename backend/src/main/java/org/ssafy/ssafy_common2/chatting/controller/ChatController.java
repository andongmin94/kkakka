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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorResponse;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2.chatting.dto.request.ChatMessageDto;
import org.ssafy.ssafy_common2.chatting.entity.ChatJoin;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;
import org.ssafy.ssafy_common2.chatting.entity.Message;
import org.ssafy.ssafy_common2.chatting.repository.ChatJoinRepository;
import org.ssafy.ssafy_common2.chatting.repository.ChatRoomRepository;
import org.ssafy.ssafy_common2.chatting.repository.MessageRepository;
import org.ssafy.ssafy_common2.chatting.service.ChatRoomMySQLService;
import org.ssafy.ssafy_common2.chatting.service.ChatService;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ChatController {

    private final UserRepository userRepository;
    private final MessageRepository messageRepository;
    private final ChatJoinRepository chatJoinRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomMySQLService chatRoomMySQLService;
    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations template;
    private final ChatService chatService;


    // [1] 입장 메세지 용 ============================================================================
    @MessageMapping("/chat/enterUser")
    @Transactional // 영속성을 위해서
    public void enterUser(String publishMessage, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("++++++ Chat Controller 입장 메세지 받음 ++++++");
        log.info("What Accessor Header got {}", headerAccessor);

        try{
            ChatMessageDto msg = objectMapper.readValue(publishMessage, ChatMessageDto.class);
            log.info("들어온 ENTER 메세지 {}",  "ChatMessageDto{" +
                    "messageType='" + msg.getMessageType() + '\'' +
                    ", content='" + msg.getContent() + '\'' +
                    ", userId=" + msg.getUserId() +
                    ", userName=" + msg.getUserName() +
                    ", chatRoomId=" + msg.getChatRoomId() +
                    ", createdAt=" + msg.getCreatedAt() +
                    ", updateAt=" + msg.getUpdateAt() +
                    ", imageCode=" + msg.getImgCode() +
                    '}');

            LocalDateTime now = LocalDateTime.now();

            // 1) 안 들어온 데이터 추가해주기
            msg.setMessageType("ENTER");
            msg.setCreatedAt(now);
            msg.setUpdateAt(now);

            // 2) 메세지 내용을 DB에 저장

                // 2-1) ChatJoin 찾기
            ChatJoin chatJoin = chatJoinRepository.getChatJoinByUserIdANDByChatRoomIdDAndDeletedAtIsNull(msg.getUserId(), msg.getChatRoomId()).orElse(null);


            // log.info("chatJoin 내용: {} ", chatJoin.toString() );

                // 2-2) 채팅 참여가 존재한다면
            if(chatJoin != null){

                // 2-3) Message Insert DTO에 맞게 만들어 넣기
                Message message = new Message();

                message.setContent(msg.getContent());
                message.setMessageType(Message.MessageType.ENTER);
                message.setChatJoin(chatJoin);
                message.setImgCode(msg.getImgCode());

                User sender = userRepository.findByIdAndDeletedAtIsNull(msg.getUserId()).orElse(null);

                if(sender != null) {
                    msg.setUserName(sender.getUserName());
                }


                // 2-4) 만약 중계방이면 환영합니다 메세지를 프론트로 다시 보내기 + 저장
                if(chatRoomRepository.findById(msg.getChatRoomId()).orElse(null).getChatRoomType().equals(ChatRoom.ChatRoomType.MANY)){
                    messageRepository.save(message);
                    template.convertAndSend("/sub/chat/room/"+ msg.getChatRoomId(), msg);
                }

            }




            // 3) 채팅방 유저 +1
            chatRoomMySQLService.updateUserCnt(msg.getChatRoomId(), "PLUS");



        }catch (Exception e){
            log.error("Exception {}",e.getMessage());
        }
    }


    // [2] TALK 타입 메세지가 WebSocket으로 발행되는 경우, 처리 ============================================
    @MessageMapping("/chat/sendMessage")
    @Transactional // 영속성을 위해서
    public void sendMessage (String publishMessage) {
        log.info("MESSAGE {}", publishMessage);

        ChatMessageDto msg = null;
        try {
            msg = objectMapper.readValue(publishMessage, ChatMessageDto.class);
            log.info("들어온 TALK 메세지 {}",  "ChatMessageDto{" +
                    "messageType='" + msg.getMessageType() + '\'' +
                    ", content='" + msg.getContent() + '\'' +
                    ", userId=" + msg.getUserId() +
                    ", userName=" + msg.getUserName() +
                    ", chatRoomId=" + msg.getChatRoomId() +
                    ", createdAt=" + msg.getCreatedAt() +
                    ", updateAt=" + msg.getUpdateAt() +
                    ", imageCode=" + msg.getImgCode() +
                    '}');

            LocalDateTime now = LocalDateTime.now();

            // 1) 안 들어온 데이터 추가해주기
            msg.setCreatedAt(now);
            msg.setUpdateAt(now);

            // 2) 메세지 내용을 DB에 저장
            // 2-1) ChatJoin 찾기
            ChatJoin chatJoin = chatJoinRepository.getChatJoinByUserIdANDByChatRoomIdDAndDeletedAtIsNull(msg.getUserId(), msg.getChatRoomId()).orElse(null);
            log.info("현재 채팅방에 들어온 사람의 UserId: {}, 방 번호 {}",msg.getUserId(), msg.getChatRoomId());
            // 2-2) 채팅 참여가 존재한다면
            if(chatJoin != null){
                if(msg.getImgCode() == null){

                    Message message = new Message();

                    message.setContent(msg.getContent());
                    if(msg.getMessageType().equals("CHAT_BOT")){
                        message.setMessageType(Message.MessageType.CHAT_BOT);
                    }else{
                        message.setMessageType(Message.MessageType.TALK);
                    }
                    message.setChatJoin(chatJoin);
                    message.setImgCode(msg.getImgCode());


                    messageRepository.save(message);

                    User sender = userRepository.findByIdAndDeletedAtIsNull(msg.getUserId()).orElse(null);

                    if(sender != null) {
                        msg.setUserName(sender.getUserName());
                        msg.setUserProfileImg(sender.getKakaoProfileImg());
                        msg.setUserCurAlias(sender.getUserInfoId().getCurAlias());
                    }

                }else {

                    if(msg.getImgCode().substring(0,4).equals("http")){
                        msg.setContent(msg.getImgCode());


                        Message message = new Message();

                        message.setContent(msg.getContent());
                        message.setMessageType(Message.MessageType.TALK);
                        message.setChatJoin(chatJoin);
                        message.setImgCode(msg.getImgCode());

                        messageRepository.save(message);
                    }else{
                        ChatMessageDto msgWithImg = chatService.BinaryImageChange(msg);
                        Message message = Message.of(msg.getContent(), chatJoin, Message.MessageType.TALK,msg.getImgCode());



                        messageRepository.save(message);

                        User sender = userRepository.findByIdAndDeletedAtIsNull(msg.getUserId()).orElse(null);

                        if(sender != null) {
                            msgWithImg.setUserName(sender.getUserName());
                            msgWithImg.setUserProfileImg(sender.getKakaoProfileImg());
                            msgWithImg.setUserCurAlias(sender.getUserInfoId().getCurAlias());
                        }


                        msg = msgWithImg;
                    }


                }
            }else{
                throw new CustomException(ErrorType.THIS_USER_DIDNT_JOIN_IN_THIS_ROOM);
            }



        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        template.convertAndSend("/sub/chat/room/" + msg.getChatRoomId(), msg);
    }

    // [3] 채팅방 나가기 전 메세지 보내는 곳 ===================================================================
    @MessageMapping("/chat/exitChatRoom")
    @Transactional // 영속성을 위해서
    public void exitChatRoom(String publishMessage){
        log.info("EXIT_MESSAGE {}", publishMessage);

        ChatMessageDto msg = null;
        try {
            msg = objectMapper.readValue(publishMessage, ChatMessageDto.class);

            log.info("들어온 QUIT 메세지 {}",  "ChatMessageDto{" +
                    "messageType='" + msg.getMessageType() + '\'' +
                    ", content='" + msg.getContent() + '\'' +
                    ", userId=" + msg.getUserId() +
                    ", userName=" + msg.getUserName() +
                    ", chatRoomId=" + msg.getChatRoomId() +
                    ", createdAt=" + msg.getCreatedAt() +
                    ", updateAt=" + msg.getUpdateAt() +
                    ", imageCode=" + msg.getImgCode() +
                    '}');

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
                Message message = new Message();

                message.setContent(msg.getContent());
                message.setMessageType(Message.MessageType.QUIT);
                message.setChatJoin(chatJoin);
                message.setImgCode(msg.getImgCode());

                User sender = userRepository.findByIdAndDeletedAtIsNull(msg.getUserId()).orElse(null);

                if(sender != null) {
                    msg.setUserName(sender.getUserName());
                }

                // 2-4) 만약 중계방이면 환영합니다 메세지를 프론트로 다시 보내기
                if(chatRoomRepository.findById(msg.getChatRoomId()).orElse(null).getChatRoomType().equals(ChatRoom.ChatRoomType.MANY)){

                    // 퇴장 메세지는 안 보내는 듯 ======================================================================
                    // messageRepository.save(message);
                    template.convertAndSend("/sub/chat/room/"+ msg.getChatRoomId(), msg);
                }

            }

            // 2-5) 메세지를 보내온 User의 Id와 roomId에 해당하는 방의 수정일자 바꾸기
            chatJoinRepository.updateChatJoinModifiedAt(LocalDateTime.now(), msg.getUserId(), msg.getChatRoomId());


            // 3) 채팅방 유저 -1
            chatRoomMySQLService.updateUserCnt(msg.getChatRoomId(), "MINUS");

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    // [4] 사용자가 App을 끄거나, 방에서 나갔을 때 실행하는 함수 ==========================================================
    @EventListener
    @Transactional // 영속성을 위하여
    public void webSocketDisconnectListener(SessionDisconnectEvent event) {
        log.info("DisConnEvent {}", event);

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        log.info("headAccessor {}", headerAccessor);
    }


    // [5] 메세지 불러오기 =================================================================================

    @GetMapping("/api/friends/chat_bot/{room_id}")
    public ApiResponseDto<?> getChatBotMessage (
            @PathVariable(value = "room_id") long roomId
    ) {
        List<Message> msgList;
        try {
             msgList = messageRepository.findAllByChatJoin_ChatJoinId_ChatRoomIdAndMessageType(roomId, Message.MessageType.CHAT_BOT);
        }catch (Exception e){
            throw new CustomException(ErrorType.CANT_LOAD_MESSAGES);
        }

        List<ChatMessageDto> ans = msgList.stream().map(chatRoomMySQLService::messageDtoConverter).toList();

        return ResponseUtils.ok(ans, MsgType.DATA_SUCCESSFULLY);
    }





}