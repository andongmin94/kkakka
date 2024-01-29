package org.ssafy.ssafy_common2.chatting.service;

import jakarta.annotation.Resource;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2.chatting.entity.ChatRoom;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ChatRoomRedisService {

    // 1) Redis HashKeys
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private static final String USER_COUNT = "USER_COUNT";
    private static final String ENTER_INFO = "ENTER_INFO";

    // 2) Injection to Redis Data Structure
    @Resource(name = "redisTemplate")
    private HashOperations<String, Long, ChatRoom>  hashOpsChatRoom;

    @Resource(name = "redisTemplate")
    private HashOperations<String, Long, Long> hashOpsEnterInfo;

    @Resource(name = "redisTemplate")
    private ValueOperations<String, String> valueOps;

    // 3) 모든 채팅방 조회
    public List<ChatRoom> findAllRoom() {return hashOpsChatRoom.values(CHAT_ROOMS);}

    // 4) 특정 채팅방 조회
    public ChatRoom findRoomById(long id) {return hashOpsChatRoom.get(CHAT_ROOMS, id);}

    // 5) mySQL에서 생성한 채팅방 번호를 Redis에도 Mapping 하기
    public void mappingChatRoom(ChatRoom chatRoom) {

        hashOpsChatRoom.put(CHAT_ROOMS, chatRoom.getId(), chatRoom);
    }

    // 6) 유저가 입장한 채팅방 ID와 유저의 ID를 맵핑하여 정보를 저장한다.
    public void setUserEnterInfo(long userId, long roomId) {
        System.out.println("-----------유저와 채팅방 맵핑 시도-----------------");
        hashOpsEnterInfo.put(ENTER_INFO, userId, roomId);
        System.out.println("-----------유저와 채팅방 맵핑 성공-----------------");
    }

    // 7) 특정 유저 ID가 입장해 있는 채팅방 ID 조회
    public long getUserEnterInfo(long userId) {return hashOpsEnterInfo.get(ENTER_INFO, userId);}


    // 8) 유저 ID가 맵핑된 채팅방 ID 삭제
    public void removeUserEnterInfo(long userId) { hashOpsEnterInfo.delete(ENTER_INFO, userId); }


    //---------------------------------------------------------------------------------------------------

    // 9) 특정 채팅방의 유저 수를 조회
    public long getUserCount(long roomId) {
        return Long.valueOf(Optional.ofNullable(valueOps.get(USER_COUNT+"_"+roomId)).orElse(String.valueOf(0)));
    }

    // 10) 특정 채팅방 유저수를 +1 올린다.
    public long plusUserCount(long roomId) {
        return Optional.ofNullable(valueOps.increment(USER_COUNT+"_"+roomId)).orElse(0L);
    }

    // 11) 채팅방에 입장한 유저 수 -1
    public long minusUserCount(String roomId){
        return Optional.ofNullable(valueOps.decrement(USER_COUNT+"_"+roomId)).filter(count -> count >0).orElse(0L);
    }





}
