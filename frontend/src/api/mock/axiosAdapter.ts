import {
  AxiosAdapter,
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { DemoRepository, demoRepository } from "./demoRepository";
import {
  DemoDogam,
  DemoNotification,
  DemoState,
  DemoUser,
  FriendState,
} from "./types";

interface ApiEnvelope<T> {
  data?: T;
  msg?: string;
  error?: { status: number; message: string };
}

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const jsonBody = (data: unknown): Record<string, unknown> => {
  if (!data) return {};
  if (typeof data === "string") {
    try {
      return JSON.parse(data) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  if (typeof FormData !== "undefined" && data instanceof FormData) {
    return Object.fromEntries(data.entries());
  }
  return data as Record<string, unknown>;
};

const normalizeUrl = (config: InternalAxiosRequestConfig) => {
  const rawUrl = config.url ?? "/";
  const baseUrl = config.baseURL || "http://kkakka.local";
  const url = new URL(rawUrl, baseUrl.startsWith("http") ? baseUrl : "http://kkakka.local");

  if (config.params && typeof config.params === "object") {
    Object.entries(config.params as Record<string, unknown>).forEach(([key, value]) => {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
    });
  }

  return {
    path: url.pathname.replace(/^\/undefined(?=\/api)/, ""),
    query: url.searchParams,
  };
};

const currentUser = (state: DemoState) => {
  const user = state.users.find((item) => item.id === state.currentUserId);
  if (!user) throw new Error("현재 사용자를 찾을 수 없습니다.");
  return user;
};

const getUser = (state: DemoState, userId: number) =>
  state.users.find((item) => item.id === userId);

const userResponse = (user: DemoUser) => ({
  userId: user.id,
  userName: user.name,
  userEmail: user.email,
  userProfileImg: user.profileImg,
  userBackImg: user.backImg,
  userAlias: user.alias,
  bankruptcy: user.point === 0,
  riotId: user.riotId,
});

const friendKey = (currentUserId: number, friendId: number) => `${currentUserId}:${friendId}`;

const getFriendState = (state: DemoState, friendId: number): FriendState =>
  state.friendships[friendKey(state.currentUserId, friendId)] ?? "NONE";

const friendResponse = (user: DemoUser) => ({
  userId: user.id,
  name: user.name,
  email: user.email,
  login: user.state !== "OFFLINE",
  curAlias: user.alias,
  profileImg: user.profileImg,
  state: user.state,
});

const commentResponse = (state: DemoState, comment: DemoDogam["comments"][number]) => {
  const user = getUser(state, comment.userId);
  return {
    commentId: comment.id,
    commentUserId: comment.userId,
    commentUserImgUrl: user?.profileImg ?? "/demo/avatar-star.svg",
    comment: comment.content,
    commentUserName: user?.name ?? "가상 사용자",
    commentUserEmail: user?.email ?? "user@example.test",
    createdAt: comment.createdAt,
  };
};

const dogamFeedResponse = (state: DemoState, dogam: DemoDogam) => {
  const user = getUser(state, dogam.userId);
  return {
    friendId: user?.id ?? dogam.userId,
    dogamTitle: dogam.title,
    dogamId: dogam.id,
    friendName: user?.name ?? "가상 사용자",
    friendEmail: user?.email ?? "user@example.test",
    friendAlias: user?.alias ?? "칭호 없음",
    dogamImgUrl: dogam.imageUrl,
    friendImgUrl: user?.profileImg ?? "/demo/avatar-star.svg",
    hated: dogam.dislikedBy.includes(state.currentUserId),
    dogamDislikeNum: dogam.dislikedBy.length,
    dogamCommentNum: dogam.comments.length,
    dogamCommentResponseDtos: dogam.comments.map((comment) => commentResponse(state, comment)),
    createdAt: dogam.createdAt,
  };
};

const dogamProfileResponse = (state: DemoState, dogam: DemoDogam) => ({
  ...dogamFeedResponse(state, dogam),
  dogamHateAmount: dogam.dislikedBy.length,
  commentNum: dogam.comments.length,
});

const dogamDetailResponse = (state: DemoState, dogam: DemoDogam) => {
  const user = getUser(state, dogam.userId);
  return {
    dogamId: dogam.id,
    dogamUserId: dogam.userId,
    userImgUrl: user?.profileImg ?? "/demo/avatar-star.svg",
    dogamImgUrl: dogam.imageUrl,
    dogamTitle: dogam.title,
    dogamHatedNum: dogam.dislikedBy.length,
    hated: dogam.dislikedBy.includes(state.currentUserId),
    dogamUserName: user?.name ?? "가상 사용자",
    dogamUserEmail: user?.email ?? "user@example.test",
    dogamCreatedAt: dogam.createdAt,
    curAlias: user?.alias ?? null,
    dogamCommentNum: dogam.comments.length,
    dogamCommentResponseDtos: dogam.comments.map((comment) => commentResponse(state, comment)),
  };
};

const notificationResponse = (notification: DemoNotification) => ({
  alarmId: notification.id,
  alarmContent: notification.content,
  alarmPic: notification.imageUrl,
  isChecked: notification.checked,
  createdAt: notification.createdAt,
  frqEmail: notification.relatedEmail,
  relatedContentId: notification.relatedContentId,
});

const buildResponse = <T>(
  config: InternalAxiosRequestConfig,
  data: ApiEnvelope<T>,
  status = 200,
): AxiosResponse<ApiEnvelope<T>> => ({
  data,
  status,
  statusText: status < 400 ? "OK" : "Error",
  headers: new AxiosHeaders({ "content-type": "application/json" }),
  config,
});

const fail = (
  config: InternalAxiosRequestConfig,
  status: number,
  message: string,
): never => {
  const response = buildResponse(config, {
    error: { status, message },
  }, status);
  throw new AxiosError(message, "ERR_BAD_RESPONSE", config, undefined, response);
};

const page = <T>(items: T[], currentPage: number, size: number) => {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / size));
  return {
    data: items.slice(currentPage * size, currentPage * size + size),
    currentPage,
    totalPages,
    totalItems,
  };
};

const addNotification = (
  repository: DemoRepository,
  content: string,
  imageUrl: string,
  relatedContentId: number | null,
) => {
  const notification = repository.mutate((state) => {
    const added: DemoNotification = {
      id: state.nextIds.notification++,
      content,
      imageUrl,
      checked: false,
      createdAt: new Date().toISOString(),
      relatedEmail: null,
      relatedContentId,
    };
    state.notifications.unshift(added);
    return clone(added);
  });
  repository.emit({ type: "alarm", payload: notificationResponse(notification) });
};

export const createMockAxiosAdapter = (
  repository: DemoRepository = demoRepository,
): AxiosAdapter => async (config) => {
  const method = (config.method ?? "get").toUpperCase();
  const { path, query } = normalizeUrl(config);
  const body = jsonBody(config.data);
  const state = repository.read();

  if (method === "GET" && path === "/api/users/data") {
    return buildResponse(config, { data: userResponse(currentUser(state)), msg: "내 프로필 조회 성공" });
  }

  const userDataMatch = path.match(/^\/api\/users\/data\/(\d+)$/);
  if (method === "GET" && userDataMatch) {
    const user = getUser(state, Number(userDataMatch[1]));
    if (!user) return fail(config, 404, "사용자를 찾을 수 없습니다.");
    return buildResponse(config, { data: userResponse(user), msg: "사용자 조회 성공" });
  }

  if (method === "GET" && path === "/api/users/point") {
    return buildResponse(config, { data: { Point: currentUser(state).point }, msg: "포인트 조회 성공" });
  }

  if (method === "PUT" && path === "/api/users/profile-edit") {
    const updated = repository.mutate((draft) => {
      const user = currentUser(draft);
      if (typeof body.riotId === "string" && body.riotId.trim()) user.riotId = body.riotId.trim();
      return clone(user);
    });
    return buildResponse(config, {
      data: { profileImg: updated.profileImg, backImg: updated.backImg, riotId: updated.riotId },
      msg: "프로필 수정 성공",
    });
  }

  if (method === "GET" && path === "/api/users/profile-edit") {
    const user = currentUser(state);
    return buildResponse(config, {
      data: { profileImg: user.profileImg, backImg: user.backImg, riotId: user.riotId },
      msg: "프로필 수정 정보 조회 성공",
    });
  }

  if (method === "POST" && path === "/api/users/friends/search") {
    const term = String(body.userEmail ?? "").trim().toLowerCase();
    const user = state.users.find(
      (item) => item.id !== state.currentUserId && item.email.toLowerCase() === term,
    );
    if (!user) return fail(config, 404, "일치하는 가상 사용자가 없습니다.");
    return buildResponse(config, {
      data: { UserDataResponseDto: userResponse(user) },
      msg: "사용자 검색 성공",
    });
  }

  if (method === "GET" && path === "/api/friends") {
    const friends = state.users
      .filter((user) => getFriendState(state, user.id) === "FRIEND")
      .map((user) => friendResponse(user));
    return buildResponse(config, { data: { friendList: friends }, msg: "조회 성공" });
  }

  if (method === "GET" && path === "/api/friends/broadcasts") {
    const broadcasts = state.rooms
      .filter((room) => room.type === "MANY")
      .map((room) => {
        const owner = getUser(state, room.ownerId)!;
        return {
          playerId: owner.id,
          playerEmail: owner.email,
          playerName: owner.name,
          playerAlias: owner.alias,
          playerProfilePic: owner.profileImg,
          playerBackgroundPic: owner.backImg,
          roomId: room.id,
          roomTitle: room.title,
          crowdDtoList: room.memberIds
            .filter((id) => id !== room.ownerId)
            .map((id) => getUser(state, id))
            .filter((user): user is DemoUser => Boolean(user))
            .map((user) => ({
              attenderEmail: user.email,
              attenderName: user.name,
              attenderProfileImg: user.profileImg,
            })),
        };
      });
    return buildResponse(config, { data: broadcasts, msg: "라이브 방 조회 성공" });
  }

  const enterRoomMatch = path.match(/^\/api\/friends\/(dm|broadcasts)\/enter\/(\d+)$/);
  if (method === "POST" && enterRoomMatch) {
    const type = enterRoomMatch[1] === "dm" ? "ONE" : "MANY";
    const userId = Number(enterRoomMatch[2]);
    const roomId = repository.mutate((draft) => {
      const existing = draft.rooms.find((room) =>
        room.type === type &&
        (type === "MANY"
          ? room.ownerId === userId
          : room.memberIds.includes(draft.currentUserId) && room.memberIds.includes(userId)),
      );
      if (existing) return existing.id;
      const id = draft.nextIds.room++;
      const friend = getUser(draft, userId);
      draft.rooms.push({
        id,
        type,
        ownerId: type === "MANY" ? userId : draft.currentUserId,
        memberIds: [draft.currentUserId, userId],
        title: type === "MANY" ? `${friend?.name ?? "친구"}의 라이브` : `${friend?.name ?? "친구"}와의 메시지`,
        messages: [],
        betting: { predictWin: 0, predictLose: 0, bets: {} },
      });
      return id;
    });
    return buildResponse(config, { data: roomId, msg: "채팅방 입장 성공" });
  }

  if (method === "GET" && path === "/api/friends/dm") {
    const rooms = state.rooms
      .filter((room) => room.type === "ONE" && room.memberIds.includes(state.currentUserId))
      .map((room) => {
        const friendId = room.memberIds.find((id) => id !== state.currentUserId) ?? room.ownerId;
        const friend = getUser(state, friendId)!;
        const lastMessage = room.messages.at(-1);
        return {
          friendId,
          roomId: room.id,
          chatRoomType: room.type,
          friendName: friend.name,
          friendEmail: friend.email,
          friendImgUrl: friend.profileImg,
          login: friend.state !== "OFFLINE",
          friendAlias: friend.alias,
          lastMessage: lastMessage?.content ?? "새 대화를 시작해보세요.",
          lastWrittenMessageTime: lastMessage?.createdAt ?? "2024-02-16T12:00:00",
          unreadMessageCnt: 0,
          tenMinute: false,
          state: friend.state,
        };
      });
    return buildResponse(config, { data: rooms, msg: "채팅방 목록 조회 성공" });
  }

  const loadRoomMatch = path.match(/^\/api\/friends\/dm\/load\/(\d+)$/);
  if (method === "GET" && loadRoomMatch) {
    const room = state.rooms.find((item) => item.id === Number(loadRoomMatch[1]));
    if (!room) return fail(config, 404, "채팅방을 찾을 수 없습니다.");
    const content = [...room.messages].reverse();
    return buildResponse(config, {
      data: {
        content,
        number: Number(query.get("page") ?? 0),
        totalPages: 1,
        totalElements: content.length,
        last: true,
      },
      msg: "메시지 조회 성공",
    });
  }

  if (method === "GET" && path === "/api/friends/dogam") {
    const currentPage = Number(query.get("page") ?? 0);
    const size = Number(query.get("size") ?? 5);
    const items = [...state.dogams]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map((dogam) => dogamFeedResponse(state, dogam));
    return buildResponse(config, { data: page(items, currentPage, size), msg: "도감 조회 성공" });
  }

  const userDogamMatch = path.match(/^\/api\/friends\/dogam\/users\/(\d+)$/);
  if (method === "GET" && userDogamMatch) {
    const userId = Number(userDogamMatch[1]);
    const currentPage = Number(query.get("page") ?? 0);
    const size = Number(query.get("size") ?? 5);
    const items = state.dogams
      .filter((dogam) => dogam.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map((dogam) => dogamProfileResponse(state, dogam));
    return buildResponse(config, { data: page(items, currentPage, size), msg: "프로필 도감 조회 성공" });
  }

  const dogamCommentMatch = path.match(/^\/api\/friends\/dogam\/comment\/(\d+)$/);
  if (dogamCommentMatch && method === "POST") {
    const dogamId = Number(dogamCommentMatch[1]);
    const added = repository.mutate((draft) => {
      const dogam = draft.dogams.find((item) => item.id === dogamId);
      if (!dogam) throw new Error("도감을 찾을 수 없습니다.");
      const comment = {
        id: draft.nextIds.comment++,
        userId: draft.currentUserId,
        content: String(body.comment ?? "").trim(),
        createdAt: new Date().toISOString(),
      };
      dogam.comments.push(comment);
      return clone(comment);
    });
    const nextState = repository.read();
    return buildResponse(config, {
      data: commentResponse(nextState, added),
      msg: "댓글 생성 성공",
    });
  }

  if (dogamCommentMatch && method === "DELETE") {
    const commentId = Number(dogamCommentMatch[1]);
    repository.mutate((draft) => {
      draft.dogams.forEach((dogam) => {
        dogam.comments = dogam.comments.filter((comment) => comment.id !== commentId);
      });
    });
    return buildResponse(config, { msg: "댓글 삭제 성공" });
  }

  const dogamHateMatch = path.match(/^\/api\/friends\/dogam\/hate\/(\d+)$/);
  if (dogamHateMatch && (method === "POST" || method === "DELETE")) {
    const dogamId = Number(dogamHateMatch[1]);
    repository.mutate((draft) => {
      const dogam = draft.dogams.find((item) => item.id === dogamId);
      if (!dogam) throw new Error("도감을 찾을 수 없습니다.");
      dogam.dislikedBy = method === "POST"
        ? Array.from(new Set([...dogam.dislikedBy, draft.currentUserId]))
        : dogam.dislikedBy.filter((id) => id !== draft.currentUserId);
    });
    return buildResponse(config, { msg: method === "POST" ? "싫어요 생성 성공" : "싫어요 삭제 성공" });
  }

  const dogamDetailMatch = path.match(/^\/api\/friends\/dogam\/(\d+)$/);
  if (dogamDetailMatch && method === "GET") {
    const dogam = state.dogams.find((item) => item.id === Number(dogamDetailMatch[1]));
    if (!dogam) return fail(config, 404, "도감을 찾을 수 없습니다.");
    return buildResponse(config, { data: dogamDetailResponse(state, dogam), msg: "도감 상세 조회 성공" });
  }

  if (dogamDetailMatch && method === "DELETE") {
    const dogamId = Number(dogamDetailMatch[1]);
    const point = repository.mutate((draft) => {
      draft.dogams = draft.dogams.filter((dogam) => dogam.id !== dogamId);
      return currentUser(draft).point;
    });
    return buildResponse(config, { data: { "UserPoint : ": point }, msg: "도감 삭제 성공" });
  }

  if (method === "POST" && path === "/api/friends/dogam") {
    const targetUserId = Number(query.get("friends-user-id") ?? state.currentUserId);
    const title = String(body.dogamTitle ?? "새로운 가상 도감").trim();
    const added = repository.mutate((draft) => {
      const dogam: DemoDogam = {
        id: draft.nextIds.dogam++,
        userId: targetUserId,
        title,
        imageUrl: "/demo/dogam-bush.svg",
        createdAt: new Date().toISOString(),
        dislikedBy: [],
        comments: [],
      };
      draft.dogams.unshift(dogam);
      return clone(dogam);
    });
    return buildResponse(config, {
      data: { imgUrl: added.imageUrl, dogamTitle: added.title },
      msg: "도감 생성 성공",
    });
  }

  const friendStateMatch = path.match(/^\/api\/friends\/(\d+)$/);
  if (friendStateMatch && method === "GET") {
    return buildResponse(config, {
      data: { state: getFriendState(state, Number(friendStateMatch[1])) },
      msg: "친구 상태 조회 성공",
    });
  }

  if (friendStateMatch && method === "POST") {
    const friendId = Number(friendStateMatch[1]);
    const result = repository.mutate((draft) => {
      const key = friendKey(draft.currentUserId, friendId);
      const current = draft.friendships[key] ?? "NONE";
      const transitions: Record<FriendState, { next: FriendState; msg: string }> = {
        NONE: { next: "SEND", msg: "친구 요청 성공" },
        SEND: { next: "NONE", msg: "친구 요청 취소 성공" },
        RECEIVE: { next: "FRIEND", msg: "친구 요청 수락 성공" },
        FRIEND: { next: "NONE", msg: "친구 관계 끊기 성공" },
      };
      draft.friendships[key] = transitions[current].next;
      return transitions[current];
    });
    const friend = getUser(repository.read(), friendId);
    addNotification(
      repository,
      `${friend?.name ?? "친구"}님과의 친구 상태가 변경되었습니다.`,
      friend?.profileImg ?? "/demo/avatar-star.svg",
      friendId,
    );
    return buildResponse(config, { msg: result.msg });
  }

  if (method === "GET" && path === "/api/profile/alias") {
    const userId = query.get("user-id") ?? String(state.currentUserId);
    return buildResponse(config, {
      data: { aliasList: state.aliases[userId] ?? [] },
      msg: "칭호 조회 성공",
    });
  }

  if (method === "GET" && path === "/api/itemshop") {
    return buildResponse(config, {
      data: {
        itemList: [
          { itemId: 1, itemName: "칭호 지정권", itemPrice: 5, itemDesc: "친구에게 새로운 가상 칭호를 지정합니다." },
          { itemId: 2, itemName: "도감 삭제권", itemPrice: 10, itemDesc: "내 도감 하나를 삭제합니다." },
          { itemId: 3, itemName: "강제 칭찬권", itemPrice: 3, itemDesc: "라이브 채팅에 사용할 칭찬 문구를 저장합니다." },
          { itemId: 4, itemName: "확성기", itemPrice: 5, itemDesc: "접속 화면에 가상 확성기 메시지를 표시합니다." },
        ],
      },
      msg: "아이템 조회 성공",
    });
  }

  if (method === "POST" && path === "/api/friends/alias") {
    const receiverId = Number(query.get("receiver-id"));
    const aliasName = String(body.aliasName ?? "새 칭호").trim();
    const result = repository.mutate((draft) => {
      const buyer = currentUser(draft);
      if (buyer.point < 5) throw new Error("포인트가 부족합니다.");
      buyer.point -= 5;
      const receiver = getUser(draft, receiverId);
      if (!receiver) throw new Error("사용자를 찾을 수 없습니다.");
      receiver.alias = aliasName;
      const createdAt = new Date().toISOString();
      draft.aliases[String(receiverId)] = [
        { alias: aliasName, creator: buyer.name, createdAt },
        ...(draft.aliases[String(receiverId)] ?? []),
      ];
      return { aliasName, createdAt };
    });
    return buildResponse(config, { data: result, msg: "칭호 생성 성공" });
  }

  if (method === "POST" && path === "/api/friends/compliment") {
    const receiverId = Number(query.get("receiver-id"));
    const result = repository.mutate((draft) => {
      const buyer = currentUser(draft);
      if (buyer.point < 3) throw new Error("포인트가 부족합니다.");
      buyer.point -= 3;
      const createdAt = new Date().toISOString();
      const content = String(body.enfScript ?? "멋진 플레이였어요!");
      draft.enforcementScripts.push({ receiverId, content, createdAt });
      return { enfScript: content, createdAt };
    });
    return buildResponse(config, { data: result, msg: "강제 칭찬권 구매 성공" });
  }

  if (method === "POST" && path === "/api/friends/megaphone") {
    const result = repository.mutate((draft) => {
      const buyer = currentUser(draft);
      if (buyer.point < 5) throw new Error("포인트가 부족합니다.");
      buyer.point -= 5;
      const createdAt = new Date().toISOString();
      const content = String(body.content ?? "가상 확성기 메시지");
      draft.megaphones.push({ userId: buyer.id, content, createdAt });
      return { userEmail: buyer.email, content, createdAt };
    });
    repository.emit({ type: "megaphone", payload: result });
    return buildResponse(config, { data: result, msg: "확성기 생성 성공" });
  }

  if (method === "GET" && path === "/api/alarm") {
    const alarms = state.notifications.map(notificationResponse);
    return buildResponse(config, {
      data: {
        alarmList: alarms,
        numOfUncheckedAlarm: state.notifications.filter((item) => !item.checked).length,
        lastNotiEventId: state.lastNotiEventId,
      },
      msg: "알림 조회 성공",
    });
  }

  if (method === "PUT" && path === "/api/alarm") {
    repository.mutate((draft) => {
      draft.lastNotiEventId = String(body.lastEventId ?? draft.lastNotiEventId);
    });
    return buildResponse(config, { msg: "알림 이벤트 갱신 성공" });
  }

  const alarmMatch = path.match(/^\/api\/alarm\/(\d+)$/);
  if (alarmMatch && method === "PUT") {
    const unchecked = repository.mutate((draft) => {
      const notification = draft.notifications.find((item) => item.id === Number(alarmMatch[1]));
      if (notification) notification.checked = true;
      return draft.notifications.filter((item) => !item.checked).length;
    });
    return buildResponse(config, { data: { numOfUncheckedAlarm: unchecked }, msg: "알림 확인 성공" });
  }

  const bettingRoomMatch = path.match(/^\/api\/betting\/room\/(\d+)$/);
  if (bettingRoomMatch && method === "GET") {
    const room = state.rooms.find((item) => item.id === Number(bettingRoomMatch[1]));
    if (!room) return fail(config, 404, "라이브 방을 찾을 수 없습니다.");
    return buildResponse(config, {
      data: { predictWin: room.betting.predictWin, predictLose: room.betting.predictLose },
      msg: "배팅 현황 조회 성공",
    });
  }

  const bettingUserMatch = path.match(/^\/api\/betting\/user\/(\d+)$/);
  if (bettingUserMatch && method === "GET") {
    const user = getUser(state, Number(bettingUserMatch[1]));
    if (!user) return fail(config, 404, "사용자를 찾을 수 없습니다.");
    return buildResponse(config, { data: user.point, msg: "잔액 조회 성공" });
  }

  const bettingMatch = path.match(/^\/api\/betting\/(\d+)$/);
  if (bettingMatch && method === "POST") {
    const roomId = Number(bettingMatch[1]);
    const point = Number(query.get("cur_betting_point") ?? 0);
    const isWin = query.get("is_win") === "true";
    const userId = Number(query.get("user_id") ?? state.currentUserId);
    if (!Number.isFinite(point) || point <= 0) return fail(config, 400, "배팅 포인트를 확인해주세요.");

    const result = repository.mutate((draft) => {
      const room = draft.rooms.find((item) => item.id === roomId);
      const user = getUser(draft, userId);
      if (!room || !user) throw new Error("배팅 대상을 찾을 수 없습니다.");
      if (user.point < point) throw new Error("포인트가 부족합니다.");
      user.point -= point;
      if (isWin) room.betting.predictWin += point;
      else room.betting.predictLose += point;
      room.betting.bets[String(userId)] = { point, isWin };
      return {
        predictDto: {
          predictWin: room.betting.predictWin,
          predictLose: room.betting.predictLose,
        },
        myBettingPoint: point,
        myChosenTeam: isWin ? "WIN" : "LOSE",
      };
    });
    return buildResponse(config, { data: result, msg: "배팅 성공" });
  }

  return fail(config, 404, `Mock API가 처리하지 않는 요청입니다: ${method} ${path}`);
};
