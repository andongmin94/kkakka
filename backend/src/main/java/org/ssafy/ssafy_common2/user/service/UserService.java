package org.ssafy.ssafy_common2.user.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.ssafy.ssafy_common2._common.exception.CustomException;
import org.ssafy.ssafy_common2._common.exception.ErrorType;
import org.ssafy.ssafy_common2._common.infra.oauth.entity.KakaoProfile;
import org.ssafy.ssafy_common2._common.infra.oauth.entity.OauthToken;
import org.ssafy.ssafy_common2._common.jwt.JwtUtil;
import org.ssafy.ssafy_common2.itemshop.entity.ItemDealList;
import org.ssafy.ssafy_common2.itemshop.entity.ItemShop;
import org.ssafy.ssafy_common2.itemshop.repository.ItemDealListRepository;
import org.ssafy.ssafy_common2.itemshop.repository.ItemShopRepository;
import org.ssafy.ssafy_common2.user.entity.Alias;
import org.ssafy.ssafy_common2.user.entity.DynamicUserInfo;
import org.ssafy.ssafy_common2.user.entity.FriendList;
import org.ssafy.ssafy_common2.user.entity.User;
import org.ssafy.ssafy_common2.user.repository.AliasRepository;
import org.ssafy.ssafy_common2.user.repository.DynamicUserInfoRepository;
import org.ssafy.ssafy_common2.user.repository.FriendListRepository;
import org.ssafy.ssafy_common2.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AliasRepository aliasRepository;
    private final DynamicUserInfoRepository dynamicUserInfoRepository;
    private final FriendListRepository friendListRepository;
    private final ItemShopRepository itemShopRepository;
    private final ItemDealListRepository itemDealListRepository;

    @Value("${kakao.clientId}")
    String clientId;

    @Value("${kakao.secret}")
    String clientSecret;

    public OauthToken getAccessToken(String code, String redirectUri) {
        return requestAccessToken(code, redirectUri);
    }

    private OauthToken requestAccessToken(String code, String redirectUri) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);
        params.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);

        ResponseEntity<String> responseEntity = new RestTemplate().exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        try {
            ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            return objectMapper.readValue(responseEntity.getBody(), OauthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<String> SaveUserAndGetToken(String token, HttpServletResponse response) {

        //(1)
        KakaoProfile profile = findProfile(token);

        //(2)
        User user = userRepository.findByKakaoEmailAndDeletedAtIsNull(profile.getKakao_account().getEmail()).orElse(null);

        System.out.println("카카오 이메일 : " + profile.getKakao_account().getProfile().getProfile_image_url());

        boolean isUserNull = false;

        //(3)
        if (user == null) {

            DynamicUserInfo userInfo = DynamicUserInfo.of(10000, false, 0,
                    "https://ssafys3.s3.ap-northeast-2.amazonaws.com/static/%EB%A1%A4+%EB%B0%B0%EA%B2%BD.jpg", LocalDate.now());
            user = User.of(
                    profile.getId(),
                    profile.getKakao_account().getProfile().getProfile_image_url(),
                    profile.getKakao_account().getProfile().getNickname(),
                    profile.getKakao_account().getEmail(),
                    "ROLE_USER",
                    userInfo);

            Alias alias = Alias.of(user, "까까머거쪄");
            userRepository.save(user);
            aliasRepository.save(alias);
            ItemShop itemShop = itemShopRepository.findById(1L).get();
            ItemDealList itemDealList = ItemDealList.of(user, itemShop);
            itemDealListRepository.save(itemDealList);
            isUserNull = true;

            // 김상훈 유저와 친구 추가 로직
            User kimsanghun = userRepository.findByKakaoEmailAndDeletedAtIsNull("k1016h@naver.com").orElseThrow(
                    () -> new CustomException(ErrorType.NOT_FOUND_SANG)
            );

            FriendList friendList = FriendList.of(user, kimsanghun, true);
            FriendList friendList1 = FriendList.of(kimsanghun, user, true);
            friendListRepository.save(friendList);
            friendListRepository.save(friendList1);
        }else{
            // 사용자가 이미 존재하는 경우, 마지막 보상 지급 날짜를 확인하여 오늘 보상을 이미 받았는지 검사합니다.
            DynamicUserInfo dynamicUserInfo = dynamicUserInfoRepository.findByIdAndDeletedAtIsNull(user.getId()).orElseThrow(
                    () -> new CustomException(ErrorType.NOT_FOUND_USER_INFO)
            );

            // 현재 날짜와 마지막 보상 지급 날짜가 다르면 보상을 지급하고 마지막 보상 지급 날짜를 업데이트합니다.
            LocalDate today = LocalDate.now();
            if (!today.equals(dynamicUserInfo.getLastRewardDate())) {
                dynamicUserInfo.addPoint(5000);
                dynamicUserInfo.setLastRewardDate(today);
            }
        }
        String jwtToken = jwtUtil.createToken(user.getKakaoEmail());
        response.addHeader("Authorization", jwtToken);

        List<String> ans = new ArrayList<>();
        ans.add(jwtToken);
        ans.add(String.valueOf(isUserNull));
        return ans;
    }

    public User getUser(User nowUser) {

//        Long userCode = (Long) nowUser.getAttribute("userCode");
//
//        User user = userRepository.findById(userCode).orElseThrow(
//                ()->new CustomException(ErrorType.NOT_FOUND_USER)
//        );

        return nowUser;
    }


    //(1-1)
    public KakaoProfile findProfile(String token) {

        //(1-2)
        RestTemplate rt = new RestTemplate();

        System.out.println("token : " + token);

        //(1-3)
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token); //(1-4)
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //(1-5)
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest =
                new HttpEntity<>(headers);

        //(1-6)
        // Http 요청 (POST 방식) 후, response 변수에 응답을 받음
        ResponseEntity<String> kakaoProfileResponse = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        //(1-7)
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try {
            kakaoProfile = objectMapper.readValue(kakaoProfileResponse.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoProfile;
    }

   /* public JsonNode Logout(String autorize_code){

        final String RequestUrl = "https://kapi.kakao.com/v1/user/logout";

        final HttpClient client = HttpClientBuilder.create().build();

        final HttpPost post =new HttpPost(RequestUrl);

        post.addHeader("Authorization","Bearer" + autorize_code);

        JsonNode returnNode =null;

        try{
            final HttpResponse response = client.execute(post);

             ObjectMapper mapper = new ObjectMapper();

             returnNode = mapper.readTree(response.getEntity().getContent());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch(ClientProtocolException e){
            e.printStackTrace();
        } catch(IOException e){
            e.printStackTrace();
        } finally{

        }
        return returnNode;}*/

    public User validateUserByEmail(String email){

        return userRepository.findByKakaoEmailAndDeletedAtIsNull(email)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_USER));
    }
}
