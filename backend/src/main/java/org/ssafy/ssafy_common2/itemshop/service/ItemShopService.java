package org.ssafy.ssafy_common2.itemshop.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.ssafy_common2.itemshop.dto.response.ItemShopResponseDto;
import org.ssafy.ssafy_common2.itemshop.repository.ItemShopRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemShopService {

    private final ItemShopRepository itemShopRepository;

    public List<ItemShopResponseDto> getItemList(){
        return itemShopRepository.findAllByDeletedAtIsNull().stream().map(ItemShopResponseDto::from).toList();
    }

}
