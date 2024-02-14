package org.ssafy.ssafy_common2.chatting.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2._common.exception.ErrorResponse;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2._common.security.UserDetailsImpl;
import org.ssafy.ssafy_common2.chatting.dto.request.ChatMessageDto;
import org.ssafy.ssafy_common2.chatting.dto.response.ChatRoomInfoComparator;
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

@Slf4j
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

    // 6) 현재 유저가 참여한 1대1 채팅방 리스트 정보 반환 하기
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
            element.setFriendEmail(Optional.ofNullable(roomInfo.getChatOwnerEmail()).orElse("해당 채팅방 주인의 Email을 찾지 못했습니다."));
            element.setFriendName(Optional.ofNullable(roomInfo.getChatOwnerName()).orElse("해당 채팅방 주인의 이름을 찾지 못했습니다."));
            element.setTenMinute(Optional.ofNullable(roomInfo.isTenMinute()).orElse(false));

            // 6-2) 유저 아이디로 유저 정보 얻기
            User friend = userRepository.findByKakaoEmailAndDeletedAtIsNull(roomInfo.getChatOwnerEmail()).orElse(null);

            if(friend !=null) {
                element.setFriendId(friend.getId());
                element.setFriendEmail(friend.getKakaoEmail());
                element.setFriendImgUrl(friend.getKakaoProfileImg());
                element.setFriendAlias(friend.getUserInfoId().getCurAlias());
                element.setLogin(friend.getUserInfoId().isLogin());
                element.setFriendName(friend.getUserName());
            }

            // 6-3) 참여한 사람들 List 얻기

            // 6-3-a) 참여 정보 얻기
            List<ChatJoin> chatJoin = chatJoinRepository.findChatJoinByChatJoinId_ChatRoomId(roomInfo.getId());


            // 6-3-b) 빈 객체
            ArrayList<CrowdDto> crowdList = new ArrayList<>();

            // 6-3-c) 값 넣기
            for (int j = 0; j < chatJoin.size(); j++) {
                CrowdDto one = new CrowdDto();
                User crowdMember = userRepository.findByIdAndDeletedAtIsNull(chatJoin.get(j).getUser().getId()).orElse(null);

                one.setAttenderEmail(crowdMember.getKakaoEmail());
                one.setAttenderProfileImg(crowdMember.getKakaoProfileImg());
                one.setAttenderName(crowdMember.getUserName());

                if(userId != crowdMember.getId()){
                    element.setFriendId(crowdMember.getId());
                    element.setFriendEmail(crowdMember.getKakaoEmail());
                    element.setFriendImgUrl(crowdMember.getKakaoProfileImg());
                    element.setFriendAlias(crowdMember.getUserInfoId().getCurAlias());
                    element.setLogin(crowdMember.getUserInfoId().isLogin());
                    element.setFriendName(crowdMember.getUserName());
                }

                crowdList.add(one);
            }

            // 9-5) 답 속에 포함
            element.setCrowdDtoList(crowdList);




            // 6-3) 채팅방 번호로 메세지 정보 얻기
            Message lastMessage = messageRepository.findTopByChatJoin_ChatRoom_IdOrderByCreatedAtDesc(temp.get(i).getChatJoinId().getChatRoomId()).orElse(null);
            if(lastMessage != null) {
                element.setLastMessage(lastMessage.getContent());
                element.setLastWrittenMessageTime(lastMessage.getCreatedAt());

            }else{
                element.setLastMessage("아직 서로 대화를 하지 않았어요!, 채팅을 시작하세요!");
                element.setLastWrittenMessageTime(null);
            }

            // 6-4) 채팅방 안 읽은 메세지 수 구하기
            int unReadMessageCnt = messageRepository.getUnreadMessageCnt(temp.get(i).getChatJoinId().getChatRoomId(), userId).orElse(0);
            element.setUnreadMessageCnt(unReadMessageCnt);

            // 6-5) 답속에 포함
            ans.add(element);
        }

        // 7) 날짜순 정렬
        ans.sort(new ChatRoomInfoComparator());

        // 시간 정렬 테스트 ==========================================================
//        for(ChatRoomInfoDto dto : ans){
//           if(dto.getLastWrittenMessageTime() != null){
//               System.out.println(dto.getLastWrittenMessageTime().toLocalTime());
//           }
//        }

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
                message.getUpdatedAt(),
                message.getImgCode(),
                message.getChatJoin().getUser().getUserName(),
                message.getChatJoin().getUser().getUserInfoId().getCurAlias(),
                message.getChatJoin().getUser().getKakaoProfileImg()
        );
    };

    // 8) 특정 방의 최근 메세지 100개 주기
    @Transactional
    public Page<ChatMessageDto> loadChatRoomMessage(long chatRoomId, int pageNo, String criteia){

        // 1) 최신 순, 받은 페이지부터 100개 꺼내도록 설정
        Pageable pageable = PageRequest.of(pageNo,100, Sort.by(Sort.Direction.DESC, criteia));

        // 2) 실제 꺼내는 로직
        Page<Message> messages = messageRepository.findAllByChatJoin_ChatRoom_Id(chatRoomId, pageable);

        return messages.map(this::messageDtoConverter);
    }


    // 9) 라이브 중인 친구 채팅방 얻기
    public List<LiveBroadcastListDto> findAllBroadCastsRoom(User user){

        // 9-1) 친구 목록 받기
        List<FriendInfoDto> friendInfoList = friendListService.getFriendInfoList(user);



        //  9-1-a) 친구 리스트 받기용
        ArrayList<LiveBroadcastListDto> ans = new ArrayList<>();

        System.out.println(friendInfoList.size());

        // 9-1-b) 친구 한 명씩 순회
        for (int i = 0; i < friendInfoList.size(); i++) {

            //9-2 빈 객체 만들기
            LiveBroadcastListDto elements = new LiveBroadcastListDto();

            //9-3 값 얻기
            ChatRoom chatRoom = chatRoomRepository.findChatRoomByChatRoomTypeAndChatOwnerEmailAndDeletedAtIsNull(ChatRoom.ChatRoomType.MANY, friendInfoList.get(i).getEmail()).orElse(null);

            if(chatRoom != null){
                User friend = userRepository.findByKakaoEmailAndDeletedAtIsNull(friendInfoList.get(i).getEmail()).orElse(null);


                //9-5 방에 대한 값들 얻기
                elements.setPlayerId(friendInfoList.get(i).getUserId());
                elements.setPlayerEmail(friendInfoList.get(i).getEmail());
                elements.setPlayerName(chatRoom.getChatOwnerName());
                elements.setPlayerAlias(friendInfoList.get(i).getCurAlias());
                elements.setRoomTitle(RandomPickRoomTitle());
                elements.setRoomId(chatRoom.getId());
                elements.setPlayerProfilePic(friend.getKakaoProfileImg());
                elements.setPlayerBackgroundPic(friend.getUserInfoId().getBackImg());

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

                // 9-5) 답 속에 포함
                elements.setCrowdDtoList(crowdList);

                ans.add(elements);
            }

        }

        // 9-7) 본인 이름 중계방도 리스트에 넣기
        LiveBroadcastListDto Mine = new LiveBroadcastListDto();

        ChatRoom myRoom = chatRoomRepository.findChatRoomByChatRoomTypeAndChatOwnerEmailAndDeletedAtIsNull(ChatRoom.ChatRoomType.MANY, user.getKakaoEmail()).orElse(null);

        if(myRoom != null){
            Mine.setPlayerId(user.getId());
            Mine.setPlayerAlias(user.getUserInfoId().getCurAlias());
            Mine.setPlayerEmail(user.getKakaoEmail());
            Mine.setPlayerName(user.getUserName());
            Mine.setRoomTitle(RandomPickRoomTitle());
            Mine.setRoomId(myRoom.getId());
            Mine.setPlayerProfilePic(user.getKakaoProfileImg());
            Mine.setPlayerBackgroundPic(user.getUserInfoId().getBackImg());


            // 참여한 사람들 List 얻기

            // 참여 정보 얻기
            List<ChatJoin> chatJoin = chatJoinRepository.findChatJoinByChatJoinId_ChatRoomId(myRoom.getId());


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

            // 9-5) 답 속에 포함
            Mine.setCrowdDtoList(crowdList);
        }

        ans.add(Mine);


        return ans;
    }

    // 9) 채팅방 생성 (채팅방 타입, 채팅방을 만들기를 바라는 userId, 현재 유저의 UserDetail )
    public ApiResponseDto<? extends Object> createRoom (String type, long userId, UserDetailsImpl userDetails) {

        // 1-1) 방의 타입을 보고   ONE, MANY, DEAD 중 하나 생성
        String roomType = type.equals("dm")? "ONE" : "MANY";
        // 방주인
        User owner = userRepository.findByIdAndDeletedAtIsNull(userId).orElse(null);

        // 1-2) 사용자가 등록되지 않았다면 에러 출력
        if(owner == null){
            return ResponseUtils.error(ErrorResponse.of(ErrorType.NOT_FOUND_USER));
        }

        // 1-3) 1대1 채팅방을 만들어달라는 요청을 받았을 경우
        if(roomType.equals("ONE")){

            // 1-3-a) 둘 사이의 1대1 채팅방이 있는지 확인
            long roomId = 0;
            if(userId == userDetails.getUser().getId()) {
                // 본인과의 채팅방이 있는지 확인해야하는 경우, 자기 이름으로 생성된 방이 있는지 확인
                roomId = getUserConnectedRoomIdWithOwner(owner.getKakaoEmail(), userDetails.getUser().getId(), "ONE");
            }else {
                // 본인과 타인간의 채팅방이 있는지 확인하는 경우, 둘이 공통으로 참여한 1대1 채팅방이 있는지 확인
                log.info("{}과 {}간의 채팅방 있는지 확인 중...", userId, userDetails.getUser().getId());
                roomId = chatJoinRepository.checkUserConnectedOneByOneRoom(userId, userDetails.getUser().getId()).orElse((long)-1);
                log.info("확인완료!! 둘 사이의 채팅방은... {}", roomId);
            }


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
            ChatRoom broadcastRoom = getRoomWithEmail(ChatRoom.ChatRoomType.MANY, owner.getKakaoEmail());

            // 해당 친구 이름의 안 죽은 중계방이 있다.
            if(broadcastRoom !=null) {
                // 해당 중계방과 유저가 연결되었는지 확인한다.
                long roomId = getUserConnectedRoomIdWithOwner(owner.getKakaoEmail(), userDetails.getUser().getId(), "MANY");

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



        String [] roomTitles = {
                "벌써 3연패 오늘은 이기겠습니다.",
                "엄마! 나 TV 나왔어!!",
                "80대 할배리신 검거",
                "철거하러 왔습니다. 자아 드가자",
                "벌써 해가 중천입니다. 식사는 하셨는지요",
                "채팅방은 공공장소입니다. 에티켓을 지켜주세요.",
                "나이가 들어서 말파이트밖에 못하겠습니다.",
                "아버지... 제가 골드를 갈 수 있을까요??",
                "어 형이야 ㅋㅋ 형 알지?",
                "유연한 남탓, 사고하지 않기",
                "무지성 문도 출격",
                "장인은 도구를 탓해도 된다.",
                "야무치형 미드라이너",
                "숨 막히는 주말 랭겜",
                "테러리스트와는 협상하지 않습니다.",
                "왜 내가 롤을 하면 공포게임이 되지?",
                "RE:제로부터 시작하는 랭크생활",
                "극지방 생존 전문가",
                "인간실격 원딜러 ",
                "순대국 맛있게 먹는 법: 본인 롤을 본다.",
                "전형적인 입시미술 세나 보여드리겠습니다."

        };

        int next = random.nextInt(roomTitles.length);

        return roomTitles[next];
    }
}

/*
*
*
* */

