package org.ssafy.ssafy_common2.itemshop.dto.response;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ssafy.ssafy_common2.itemshop.entity.ItemShop;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ItemShopResponseDto {

    private String itemName;
    private int itemPrice;
    private String itemDesc;

    @Builder
    private ItemShopResponseDto(String itemName, int itemPrice, String itemDesc) {
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemDesc = itemDesc;
    }

    public static ItemShopResponseDto from(ItemShop itemshop) {
        return builder()
                .itemName(itemshop.getItemName())
                .itemPrice(itemshop.getItemPrice())
                .itemDesc(itemshop.getItemDesc())
                .build();
    }
}
