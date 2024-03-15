import { createDemoSeed, DEMO_STORAGE_KEY } from "./seed";
import {
  DemoChatMessage,
  DemoEvent,
  DemoState,
} from "./types";

type EventListener = (event: DemoEvent) => void;
type ChatListener = (message: DemoChatMessage) => void;

const createMemoryStorage = (): Storage => {
  const values = new Map<string, string>();
  return {
    get length() {
      return values.size;
    },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => Array.from(values.keys())[index] ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value),
  };
};

const getDefaultStorage = (): Storage =>
  typeof window === "undefined" ? createMemoryStorage() : window.localStorage;

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export class DemoRepository {
  private state: DemoState;
  private readonly eventListeners = new Set<EventListener>();
  private readonly chatListeners = new Map<number, Set<ChatListener>>();

  constructor(private readonly storage: Storage = getDefaultStorage()) {
    this.state = this.load();
    this.save();
  }

  private load(): DemoState {
    const stored = this.storage.getItem(DEMO_STORAGE_KEY);
    if (!stored) return createDemoSeed();

    try {
      const parsed = JSON.parse(stored) as DemoState;
      if (parsed.schemaVersion !== 1) return createDemoSeed();
      return parsed;
    } catch {
      return createDemoSeed();
    }
  }

  private save() {
    this.storage.setItem(DEMO_STORAGE_KEY, JSON.stringify(this.state));
  }

  read(): DemoState {
    return clone(this.state);
  }

  mutate<T>(mutation: (state: DemoState) => T): T {
    const result = mutation(this.state);
    this.save();
    return result;
  }

  reset(): DemoState {
    this.state = createDemoSeed();
    this.save();
    return this.read();
  }

  subscribe(listener: EventListener): () => void {
    this.eventListeners.add(listener);
    return () => this.eventListeners.delete(listener);
  }

  emit(event: DemoEvent) {
    this.eventListeners.forEach((listener) => listener(event));
  }

  subscribeChat(roomId: number, listener: ChatListener): () => void {
    const listeners = this.chatListeners.get(roomId) ?? new Set<ChatListener>();
    listeners.add(listener);
    this.chatListeners.set(roomId, listeners);
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) this.chatListeners.delete(roomId);
    };
  }

  addChatMessage(message: Omit<DemoChatMessage, "id" | "createdAt" | "updateAt">) {
    const added = this.mutate((state) => {
      const room = state.rooms.find((item) => item.id === message.chatRoomId);
      if (!room) throw new Error("채팅방을 찾을 수 없습니다.");
      const createdAt = new Date().toISOString();
      const nextMessage: DemoChatMessage = {
        ...message,
        id: state.nextIds.message++,
        createdAt,
        updateAt: createdAt,
      };
      room.messages.push(nextMessage);
      return clone(nextMessage);
    });

    this.chatListeners.get(added.chatRoomId)?.forEach((listener) => listener(added));
    return added;
  }
}

export const demoRepository = new DemoRepository();
