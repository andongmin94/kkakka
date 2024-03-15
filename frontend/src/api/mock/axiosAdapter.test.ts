import axios, { AxiosInstance } from "axios";
import { beforeEach, describe, expect, it } from "vitest";
import { createMockAxiosAdapter } from "./axiosAdapter";
import { DemoRepository } from "./demoRepository";
import { createTestStorage } from "./testStorage";

describe("mock Axios API 계약", () => {
  let repository: DemoRepository;
  let client: AxiosInstance;

  beforeEach(() => {
    repository = new DemoRepository(createTestStorage());
    client = axios.create({
      baseURL: "http://kkakka.local",
      adapter: createMockAxiosAdapter(repository),
    });
  });

  it("현재 사용자와 메인 피드 계약을 반환한다", async () => {
    const [user, broadcasts, dogams] = await Promise.all([
      client.get("/api/users/data"),
      client.get("/api/friends/broadcasts"),
      client.get("/api/friends/dogam", { params: { page: 0, size: 5 } }),
    ]);

    expect(user.data.data.userEmail).toBe("star@example.test");
    expect(broadcasts.data.data[0]).toMatchObject({ roomId: 201, playerId: 2 });
    expect(dogams.data.data).toMatchObject({ currentPage: 0, totalItems: 3 });
  });

  it("검색과 친구 상태 전이를 저장한다", async () => {
    const search = await client.post("/api/users/friends/search", {
      userEmail: "rune@example.test",
    });
    const userId = search.data.data.UserDataResponseDto.userId;

    expect((await client.get(`/api/friends/${userId}`)).data.data.state).toBe("NONE");
    expect((await client.post(`/api/friends/${userId}`)).data.msg).toBe("친구 요청 성공");
    expect((await client.get(`/api/friends/${userId}`)).data.data.state).toBe("SEND");
  });

  it("댓글과 싫어요 상태 변경을 상세 응답에 반영한다", async () => {
    await client.post("/api/friends/dogam/comment/101", { comment: "테스트 댓글" });
    await client.post("/api/friends/dogam/hate/101");

    const detail = (await client.get("/api/friends/dogam/101")).data.data;

    expect(detail.dogamCommentResponseDtos.at(-1).comment).toBe("테스트 댓글");
    expect(detail.hated).toBe(true);
    expect(detail.dogamHatedNum).toBe(2);
  });

  it("배팅과 아이템 구매가 포인트를 차감하고 새로고침 가능한 상태로 남는다", async () => {
    await client.post("/api/betting/201", {}, {
      params: { user_id: 1, cur_betting_point: 10, is_win: true },
    });
    await client.post("/api/friends/megaphone", { content: "가상 확성기" });

    expect((await client.get("/api/users/point")).data.data.Point).toBe(65);
    expect(repository.read().rooms.find((room) => room.id === 201)?.betting.predictWin).toBe(34);
    expect(repository.read().megaphones.at(-1)?.content).toBe("가상 확성기");
  });
});
