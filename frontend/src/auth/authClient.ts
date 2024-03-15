import { demoRepository } from "@/api/mock/demoRepository";
import { isMockMode } from "@/runtime/mode";

const hydrateSession = () => {
  const state = demoRepository.read();
  const user = state.users.find((item) => item.id === state.currentUserId);
  if (!user) throw new Error("가상 사용자를 찾을 수 없습니다.");

  localStorage.setItem("token", "Bearer kkakka-demo-token");
  localStorage.setItem("userId", String(user.id));
  localStorage.setItem("userName", user.name);
  localStorage.setItem("userProfileImg", user.profileImg);
  localStorage.setItem("userBackImg", user.backImg);
  localStorage.setItem("userAlias", user.alias ?? "");
};

export const startLogin = async (): Promise<string | null> => {
  if (isMockMode) {
    hydrateSession();
    return "/main";
  }

  const clientId = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  if (!clientId || !redirectUri) {
    throw new Error("카카오 로그인 환경변수가 설정되지 않았습니다.");
  }

  const query = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
  });
  window.location.assign(`https://kauth.kakao.com/oauth/authorize?${query}`);
  return null;
};

export const ensureDemoSession = () => {
  if (isMockMode && !localStorage.getItem("token")) hydrateSession();
};
