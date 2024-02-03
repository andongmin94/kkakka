package org.ssafy.ssafy_common2.chatting.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2._common.exception.ErrorResponse;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.chatting.dto.request.ChatMessageDto;
import org.ssafy.ssafy_common2.chatting.dto.response.ChatRoomInfoDto;
import org.ssafy.ssafy_common2.chatting.dto.response.CrowdDto;
import org.ssafy.ssafy_common2.chatting.entity.ChatJoin;
import org.ssafy.ssafy_common2.chatting.entity.ChatJoinId;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;
import org.ssafy.ssafy_common2.chatting.entity.Message;
import org.ssafy.ssafy_common2.chatting.repository.ChatJoinRepository;
import org.ssafy.ssafy_common2.chatting.repository.ChatRoomRepository;
import org.ssafy.ssafy_common2.chatting.repository.MessageRepository;
import org.ssafy.ssafy_common2.user.dto.FriendInfoDto;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.UserRepository;
import org.ssafy.ssafy_common2.user.service.FriendListService;
import org.ssafy.ssafy_common2.chatting.dto.response.LiveBroadcastListDto;

import java.util.*;

import static org.ssafy.ssafy_common2.chatting.entity.ChatRoom.ChatRoomType.ONE;

@Service
@RequiredArgsConstructor
public class ChatRoomMySQLService {

    private final UserRepository userRepository;
    private final ChatJoinRepository chatJoinRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;
    private final FriendListService friendListService;



    // 0) 채팅방 생성
    public ChatRoom CreateChatRoom (ChatRoom.ChatRoomType chatRoomType, String chatOwnerName, String chatOwnerEmail) {
       ChatRoom chatRoom = chatRoomRepository.save(ChatRoom.of(chatRoomType, chatOwnerName, chatOwnerEmail, 0,false, 0, 0));


       return chatRoom;
    }


    // 1) 채팅 주인 이메일로 파진 채팅방 리스트 확인
    public List<ChatRoom> getChatRoomList (String ownerEmail) {

        return chatRoomRepository.findAllByChatOwnerEmailAndDeletedAtIsNull(ownerEmail);
    }

    // 2) 인수로 받은 유저 아이디가 참여한 채팅방 참여 정보 반환 (chat_join 만!)
    public List<ChatJoin> getChatJoinList (long userId) {

        return  chatJoinRepository.findAllByUserIdAndDeletedAtIsNull(userId);
    }

    // 3) 현 사용자와 인수로 주어진 Email 간의 1대1 채팅방이 있으면 방 번호 반환 없으면 -1 반환
    public long getUserConnectedRoomIdWithOwner(String ownerEmail, long attenderId, String chatRoomType) {

        long RoomIds = chatJoinRepository.getUserConnectedRoomIdsAndDeletedAtISNULL(ownerEmail, attenderId, chatRoomType).orElse(0L);

        if(RoomIds == 0) {
            return  -1;
        }else {
            return RoomIds;
        }
    }

    // 4) 요청한 Email 이름으로 만들어진 중계방이나 1대1 채팅방 있는지 조회
    public ChatRoom getRoomWithEmail(ChatRoom.ChatRoomType chatRoomType, String email) {
        ChatRoom broadCastRoom = chatRoomRepository.findChatRoomByChatRoomTypeAndChatOwnerEmailAndDeletedAtIsNull(chatRoomType, email).orElse(null);
        return  broadCastRoom;
    }

    // 5) 현재 유저를 특정 채팅방에 참여
    public void insertChatJoin (User user, ChatRoom chatRoom, int betPrice, boolean isWin) {
        chatJoinRepository.save(ChatJoin.of(new ChatJoinId(), user, chatRoom, betPrice, isWin));
    }

    // 6) 현재 유저가 참여한 채팅방 리스트 정보 반환 하기
    public List<ChatRoomInfoDto> getChatRoomInfo (long userId) {

        // 유저 아이디로 그 사람이 참여한 모든 채팅방 번호를 얻기 (chatJoin 객체 다 가져옴)
        List<ChatJoin> temp = chatJoinRepository.findAllByUserIdAndDeletedAtIsNull(userId);
        ArrayList<ChatRoomInfoDto> ans = new ArrayList<>();

        // 해당 채팅방 번호 하나하나마다 필요한 정보 얻어내서 element 객체에 담기
        for (int i = 0; i < temp.size(); i++) {
            ChatRoomInfoDto element = new ChatRoomInfoDto();

            // 6-1) 채팅방 정보로 주인 이메일과 아이디 얻기
            ChatRoom roomInfo = chatRoomRepository.findById(temp.get(i).getChatJoinId().getChatRoomId()).orElse(null);

            // 6-1-a) 다대다 방은 안 담는다.
            if(roomInfo.getChatRoomType().equals(ChatRoom.ChatRoomType.MANY)){
                continue;
            }

            if(roomInfo == null){
                return  null;
            }

            element.setRoomId(temp.get(i).getChatJoinId().getChatRoomId());
            element.setChatRoomType(Optional.ofNullable(roomInfo.getChatRoomType()).orElse(ChatRoom.ChatRoomType.DEAD));
            element.setFriendName(Optional.ofNullable(roomInfo.getChatOwnerName()).orElse("해당 채팅방의 주인ID을 찾지 못했습니다."));
            element.setFriendEmail(Optional.ofNullable(roomInfo.getChatOwnerEmail()).orElse("해당 채팅방 주인의Email을 찾지 못했습니다."));
            element.setTenMinute(Optional.ofNullable(roomInfo.isTenMinute()).orElse(false));
            // 6-2) 유저 아이디로 유저 정보 얻기
            User friend = userRepository.findByKakaoEmailAndDeletedAtIsNull(roomInfo.getChatOwnerEmail()).orElse(null);

            if(friend !=null) {
                element.setFriendImgUrl(friend.getKakaoProfileImg());
                element.setFriendAlias(friend.getUserInfoId().getCurAlias());
                element.setLogin(friend.getUserInfoId().isLogin());
            }

            System.out.println(temp.get(i).getChatJoinId().getChatRoomId());

            // 6-3) 채팅방 번호로 메세지 정보 얻기
            Message lastMessage = messageRepository.getLastMessage(temp.get(i).getChatJoinId().getChatRoomId()).orElse(null);
            if(lastMessage != null) {
                element.setLastMessage(lastMessage.getContent());
                element.setLastWrittenMessageTime(lastMessage.getCreatedAt());
            }else{
                element.setLastMessage("아직 서로 대화를 하지 않았어요!, 채팅을 시작하세요!");
                element.setLastWrittenMessageTime(null);
            }

            // 6-4) 채팅방 안 읽은 메세지 수 구하기
            int unReadMessageCnt = messageRepository.getUnreadMessageCnt(temp.get(i).getChatJoinId().getChatRoomId()).orElse(0);
            element.setUnreadMessageCnt(unReadMessageCnt);

            // 6-5) 답속에 포함
            ans.add(element);
        }

        return ans;
    }


    // 7) 채팅방 인원 +1 혹은 -1
    public void updateUserCnt(long roomId, String mode) {


        // 채팅방 특정
        ChatRoom room = chatRoomRepository.findById(roomId).orElse(null);



        // 이전 채팅방 인원 수
        int cnt = room.getUserCnt();
        System.out.println("방의 이전 인원수: " + cnt);
        // 채팅방 인원 +1
        if(mode.equals("PLUS")){
            chatRoomRepository.updateUserCnt(cnt+1, roomId);
        }else{
            chatRoomRepository.updateUserCnt(cnt-1, roomId);
        }

    }

    // 메세지 Entity를 메세지 Dto로 전환
    public ChatMessageDto messageDtoConverter (Message message) {
        return ChatMessageDto.of(
                message.getMessageType().name(),
                message.getContent(),
                message.getChatJoin().getUser().getId(),
                message.getChatJoin().getChatRoom().getId(),
                message.getCreatedAt(),
                message.getUpdatedAt()
        );
    };

    // 8) 특정 방의 최근 메세지 100개 주기
    public Page<ChatMessageDto> loadChatRoomMessage(long chatRoomId, int pageNo, String criteia){

        // 1) 최신 순, 받은 페이지부터 100개 꺼내도록 설정
        Pageable pageable = PageRequest.of(pageNo,100, Sort.by(Sort.Direction.DESC, criteia));

        // 2) 실제 꺼내는 로직
        Page<Message> messages = messageRepository.findAllByChatJoin_ChatRoom_Id(chatRoomId, pageable);

        return messages.map(this::messageDtoConverter);
    }


    // 9) 라이브 중인 친구 채팅방 얻기
    public List<LiveBroadcastListDto> findAllBroadCastsRoom(User user){

        // 3-1) 친구 목록 받기
        List<FriendInfoDto> friendInfoList = friendListService.getFriendInfoList(user);
        //  3-1-a) 친구 리스트 받기용
        ArrayList<LiveBroadcastListDto> ans = new ArrayList<>();

        // 3-1-b) 친구 한 명씩 순회
        for (int i = 0; i < friendInfoList.size(); i++) {

            // 빈 객체 만들기
            LiveBroadcastListDto elements = new LiveBroadcastListDto();

            // 값 얻기
            ChatRoom chatRoom = chatRoomRepository.findChatRoomByChatRoomTypeAndChatOwnerEmailAndDeletedAtIsNull(ChatRoom.ChatRoomType.MANY, friendInfoList.get(i).getEmail()).orElse(null);
            User friend = userRepository.findByKakaoEmailAndDeletedAtIsNull(friendInfoList.get(i).getEmail()).orElse(null);

            // 방에 대한 값들 얻기
            elements.setPlayerEmail(friendInfoList.get(i).getEmail());
            elements.setPlayerName(chatRoom.getChatOwnerName());
            elements.setRoomTitle(RandomPickRoomTitle());
            elements.setRoomId(chatRoom.getId());
            elements.setPlayerKakaoImg(friend.getKakaoProfileImg());

            // 참여한 사람들 List 얻기

                // 참여 정보 얻기
            List<ChatJoin> chatJoin = chatJoinRepository.findChatJoinByChatJoinId_ChatRoomId(chatRoom.getId());


                // 빈 객체
            ArrayList<CrowdDto> crowdList = new ArrayList<>();

                // 값 넣기
            for (int j = 0; j < chatJoin.size(); j++) {
                CrowdDto one = new CrowdDto();
                User crowdMember = userRepository.findByIdAndDeletedAtIsNull(chatJoin.get(j).getUser().getId()).orElse(null);

                one.setAttenderEmail(crowdMember.getKakaoEmail());
                one.setAttenderProfileImg(crowdMember.getKakaoProfileImg());
                one.setAttenderName(crowdMember.getUserName());

                crowdList.add(one);
            }

            // 3-5) 답 속에 포함
            elements.setCrowdDtoList(crowdList);

            ans.add(elements);

        }
        return ans;
    }

    // 9) 채팅방 생성
    public ApiResponseDto<? extends Object> createRoom (String type, String friendEmail, UserDetailsImpl userDetails) {

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
            long roomId = getUserConnectedRoomIdWithOwner(friendEmail, userDetails.getUser().getId(), "ONE");

            // 1-3-b) 둘 사이의 채팅방이 없다면 -1이 반환 되고, 방 생성을 한다.
            if(roomId == -1) {
                // 방 생성
                ChatRoom createdRoom = CreateChatRoom(ONE, owner.getUserName(), owner.getKakaoEmail());

                //1-3-b-가) 채팅방 생성이 성공적으로 마무리 되면, chatJoin으로 둘을 연결한다.
                insertChatJoin(userDetails.getUser(), createdRoom, 0, false);

                //1-4-d) 나 자신에게 말하기가 아니라면 채팅방 주인도 참가시켜야함.
                if(!Objects.equals(owner.getId(), userDetails.getUser().getId())){
                    insertChatJoin(owner,createdRoom, 0, false);
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
            ChatRoom broadcastRoom = getRoomWithEmail(ChatRoom.ChatRoomType.MANY, friendEmail);

            // 해당 친구 이름의 안 죽은 중계방이 있다.
            if(broadcastRoom !=null) {
                // 해당 중계방과 유저가 연결되었는지 확인한다.
                long roomId = getUserConnectedRoomIdWithOwner(friendEmail, userDetails.getUser().getId(), "MANY");

                // 연결이 안되어있을 경우 roomId == -1이다. 따라서 해당 중계방에 현 유저를 참여시킨다.
                if(roomId == -1){
                    insertChatJoin(userDetails.getUser(), broadcastRoom, 0, false);
                }
            }

            // 해당 친구 이름으로 안 죽은 중계방이 없다.
            else if(broadcastRoom == null){
                broadcastRoom = CreateChatRoom(ChatRoom.ChatRoomType.MANY, owner.getUserName(), owner.getKakaoEmail());

                //1-4-c) 만드는데 성공하면, 현재 유저를 해당 중계방에 참여한 것으로 바꾼다.
                insertChatJoin(userDetails.getUser(), broadcastRoom, 0, false);



            }

            // 1-4-e) 만드는데 실패하면, 에러 출력한다.
            if(broadcastRoom == null){
                return ResponseUtils.error(ErrorResponse.of(ErrorType.FAILED_TO_MAKE_CHATROOM));
            }


            // 결과 주기
            return ResponseUtils.ok(broadcastRoom.getId(), MsgType.DATA_SUCCESSFULLY);
        }
    }


    public String RandomPickRoomTitle () {

        Random random = new Random();

        int next = random.nextInt(10);

        String [] roomTitles = {
                "벌써 3연패 오늘은 이기겠습니다.",
                "더 이상 물러설 곳이 없다.",
                "어머니, 제가 해낼 수 있을까요?",
                "오늘은 제가 얼마나 죽을까요? 이재, 곧 죽습니다.",
                "이기는 놈이 강한 게 아니라 버티는 놈이 강한 거더라",
                "공이 웃으면 풋볼 ㅋㅋㅋ",
                "자동차를 톡하고 치면? 카톡",
                "벌써 해가 중천입니다. 식사는 하셨는지요",
                "채팅방은 공공장소입니다. 에티켓을 지켜주세요.",
                "미국에서 비가 내리면? USB lol",
                "나이가 들어서 말파이트밖에 못하겠습니다.",
                "아버지 제게 힘을 주세요",
                "어 상훈이형이야 ㅋㅋ 형 알지?"
        };


        return roomTitles[next];
    }
}

/*
*
*
* */

