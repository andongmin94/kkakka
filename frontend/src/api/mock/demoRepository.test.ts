import { describe, expect, it } from "vitest";
import { DemoRepository } from "./demoRepository";
import { DEMO_STORAGE_KEY } from "./seed";
import { createTestStorage } from "./testStorage";

describe("DemoRepository", () => {
  it("상태 변경을 같은 localStorage 키에 저장하고 다시 복원한다", () => {
    const storage = createTestStorage();
    const repository = new DemoRepository(storage);

    repository.mutate((state) => {
      state.users[0].point = 57;
    });

    expect(storage.getItem(DEMO_STORAGE_KEY)).toContain('"point":57');
    expect(new DemoRepository(storage).read().users[0].point).toBe(57);
  });

  it("손상되거나 버전이 다른 상태는 가상 seed로 복구한다", () => {
    const storage = createTestStorage();
    storage.setItem(DEMO_STORAGE_KEY, "{broken-json");

    const recovered = new DemoRepository(storage).read();

    expect(recovered.schemaVersion).toBe(1);
    expect(recovered.users.every((user) => user.email.endsWith("@example.test"))).toBe(true);
    expect(recovered.rooms.some((room) => room.type === "MANY")).toBe(true);
  });

  it("채팅 메시지를 저장하고 같은 방 구독자에게 전달한다", () => {
    const repository = new DemoRepository(createTestStorage());
    const received: string[] = [];
    const unsubscribe = repository.subscribeChat(301, (message) => {
      received.push(message.content ?? "");
    });

    repository.addChatMessage({
      messageType: "TALK",
      content: "새 가상 메시지",
      userId: 1,
      userName: "별사탕",
      userProfileImg: "/demo/avatar-star.svg",
      userCurAlias: "한타의 별",
      chatRoomId: 301,
      imgCode: null,
    });
    unsubscribe();

    expect(received).toEqual(["새 가상 메시지"]);
    expect(repository.read().rooms.find((room) => room.id === 301)?.messages.at(-1)?.content)
      .toBe("새 가상 메시지");
  });
});
