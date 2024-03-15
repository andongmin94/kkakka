import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { demoRepository } from "@/api/mock/demoRepository";
import { DemoChatMessage } from "@/api/mock/types";
import { isMockMode } from "@/runtime/mode";

type MessageCallback = (payload: { body: string }) => void;

/**
 * STOMP client가 화면에 제공하는 최소 계약을 localStorage 기반 데모 저장소로 재현한다.
 * 구독 destination의 마지막 segment를 방 ID로 사용해 실제 화면 코드를 그대로 유지한다.
 */
class MockChatClient {
  private roomId: number | null = null;
  private unsubscribe: (() => void) | null = null;

  connect(
    _headers: Record<string, unknown>,
    onConnected: () => void,
    _onError: (error: unknown) => void,
  ) {
    queueMicrotask(onConnected);
  }

  subscribe(destination: string, callback: MessageCallback) {
    this.roomId = Number(destination.split("/").at(-1));
    this.unsubscribe = demoRepository.subscribeChat(this.roomId, (message) => {
      callback({ body: JSON.stringify(message) });
    });
    return { unsubscribe: this.unsubscribe };
  }

  send(destination: string, _headers: Record<string, unknown>, rawBody: string) {
    if (!destination.includes("/chat/")) return;
    const body = JSON.parse(rawBody) as Partial<DemoChatMessage>;
    const state = demoRepository.read();
    const user = state.users.find((item) => item.id === Number(body.userId));
    const roomId = Number(body.chatRoomId ?? this.roomId);
    if (!roomId) return;

    const message = demoRepository.addChatMessage({
      messageType: body.messageType ?? "TALK",
      content: body.content ?? null,
      userId: Number(body.userId ?? state.currentUserId),
      userName: body.userName ?? user?.name ?? "가상 사용자",
      userProfileImg: body.userProfileImg ?? user?.profileImg ?? "/demo/avatar-star.svg",
      userCurAlias: body.userCurAlias ?? user?.alias ?? null,
      chatRoomId: roomId,
      imgCode: body.imgCode ?? null,
    });

    const room = state.rooms.find((item) => item.id === roomId);
    if (room?.type === "MANY" && message.messageType === "TALK") {
      window.setTimeout(() => {
        demoRepository.addChatMessage({
          messageType: "CHAT_BOT",
          content: "샘플 중계 봇이 메시지를 확인했습니다.",
          userId: room.ownerId,
          userName: "까까 봇",
          userProfileImg: "/image/icon.png",
          userCurAlias: "샘플 이벤트",
          chatRoomId: roomId,
          imgCode: null,
        });
      }, 250);
    }
  }

  disconnect(callback?: () => void) {
    this.unsubscribe?.();
    this.unsubscribe = null;
    callback?.();
  }
}

/** 실행 모드에 따라 메모리 기반 client 또는 SockJS·STOMP client를 생성한다. */
export const createChatClient = (url: string): any => {
  if (isMockMode) return new MockChatClient();
  return Stomp.over(new SockJS(url));
};
