package org.ssafy.ssafy_common2.itemshop.repository;

import org.springframework.stereotype.Repository;
import org.ssafy.ssafy_common2.itemshop.dto.response.MegaphoneCreateResponseDto;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

@Repository
public class MegaphoneEventRepository {

    private final Queue<MegaphoneCreateResponseDto> megaphones = new ConcurrentLinkedQueue<>();

    public void saveMegaphoneEvent(MegaphoneCreateResponseDto megaphone) {
        megaphones.add(megaphone);
    }

    public boolean hasPendingMegaphoneEvents() {
        return !megaphones.isEmpty();
    }

    public MegaphoneCreateResponseDto getNextMegaphoneEvent() {
        return megaphones.poll();
    }
}
