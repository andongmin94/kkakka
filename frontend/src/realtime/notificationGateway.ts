import { EventSourcePolyfill } from "event-source-polyfill";
import { demoRepository } from "@/api/mock/demoRepository";
import { isMockMode } from "@/runtime/mode";

type RealtimeEvent = { data: string };
type RealtimeListener = (event: RealtimeEvent) => void;

/** 알림 화면이 Mock event와 실제 SSE를 같은 방식으로 소비하기 위한 최소 stream 계약이다. */
export interface NotificationStream {
  onerror: ((event: unknown) => void) | null;
  addEventListener(type: "alarm" | "megaphone", listener: RealtimeListener): void;
  close(): void;
}

/** DemoRepository event를 브라우저 EventSource 형태로 변환하는 Mock stream이다. */
class MockNotificationStream implements NotificationStream {
  onerror: ((event: unknown) => void) | null = null;
  private readonly listeners = new Map<string, Set<RealtimeListener>>();
  private readonly unsubscribe: () => void;

  constructor() {
    this.unsubscribe = demoRepository.subscribe((event) => {
      this.listeners.get(event.type)?.forEach((listener) =>
        listener({ data: JSON.stringify(event.payload) }),
      );
    });
  }

  addEventListener(type: "alarm" | "megaphone", listener: RealtimeListener) {
    const listeners = this.listeners.get(type) ?? new Set<RealtimeListener>();
    listeners.add(listener);
    this.listeners.set(type, listeners);
  }

  close() {
    this.unsubscribe();
    this.listeners.clear();
  }
}

/** 실행 모드에 따라 DemoRepository 구독 또는 인증 헤더를 포함한 SSE 연결을 반환한다. */
export const createNotificationStream = (
  url: string,
  options: { headers: Record<string, string>; heartbeatTimeout: number },
): NotificationStream => {
  if (isMockMode) return new MockNotificationStream();
  return new EventSourcePolyfill(url, options) as unknown as NotificationStream;
};
