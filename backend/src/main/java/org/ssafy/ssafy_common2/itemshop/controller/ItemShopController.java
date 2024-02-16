package org.ssafy.ssafy_common2.itemshop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.ssafy_common2._common.response.ApiResponseDto;
import org.ssafy.ssafy_common2._common.response.MsgType;
import org.ssafy.ssafy_common2._common.response.ResponseUtils;
import org.ssafy.ssafy_common2.itemshop.dto.response.ItemShopResponseDto;
import org.ssafy.ssafy_common2.itemshop.service.ItemShopService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ItemShopController {

    private final ItemShopService itemShopService;

    @GetMapping("/itemshop")
    public ApiResponseDto<Map<String, Object>> getItemShopList() {

        Map<String, Object> responseMap = new HashMap<String, Object>();
        responseMap.put("itemList", itemShopService.getItemList());
        return ResponseUtils.ok(responseMap, MsgType.SEARCH_SUCCESSFULLY);
    }
}
