import { Mobile, PC } from "@/components/MediaQuery";
import MessageAlias from "@/components/message/MessageAlias";
import MyMsg from "@/components/message/MyMsg";
// import Picture from "@/components/message/Picture";
import YouMsg from "@/components/message/YouMsg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import axios from "axios";
// import TypeIt from "typeit-react";
// import Stack from "react-bootstrap/Stack";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Bar, BarChart, ResponsiveContainer, Cell, XAxis } from "recharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SysMsg from "@/components/message/SysMsg";
import { BettingPredictType } from "@/types/BettingTypes";
import BotMsg from "@/components/message/BotMsg";
import { useProfileDogamQuery } from "@/hooks/profile/queries/useProfileDogamQuery";
import { ProfileDogamType } from "@/types/dogamTypes";

let stompClient: any;

interface playerInfoType {
  playerProfilePic: string;
  playerAlias: string;
  playerName: string;
  playerId: number;
}

export default function LiveChat() {
  // const { userInfo } = useUserStore();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const friendsInfo: playerInfoType = { ...location.state };
  // 페이지에 들어올때 채팅창 스크롤이 항상 하단으로 가게 하기 위해 사용
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const userIdString = localStorage.getItem("userId");
  const userInfo = {
    userId: userIdString !== null ? parseInt(userIdString, 10) : undefined,
    userName: localStorage.getItem("userName"),
  };

  // 채팅 입력 받은것
  const [inputChat, setInputChat] = useState("");

  const { data } = useProfileDogamQuery(friendsInfo.playerId);

  // 어떤 도감을 선택했는지 인덱스를 저장
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  // 모든 채팅 메세지 저장
  const [messages, setMessages] = useState<any[]>([]);
  // 현재 다른 사람이 타이핑하는 메세지를 추적
  const [currentTypingId, setCurrentTypingId] = useState(null);

  const [predictObject, setPredictObject] = useState<BettingPredictType>({
    predictWin: 100,
    predictLose: 100,
  });

  // 배팅 모달에 관한 것들 =====================================================
  const [balance, setBalance] = useState(0);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [goal, setGoal] = useState(0);
  const [isWin, setIsWin] = useState(false);

  // 배팅 함수==================================================
  const onClickRadio = (value: boolean) => {
    setIsWin(value);
    console.log(value);
  };

  const { toast } = useToast();

  // 배팅 제출 form
  function onSubmitBetting(data: any) {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/betting/${roomId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
        {
          params: {
            user_id: data.userId,
            cur_betting_point: data.cur_betting_point,
            is_win: isWin,
          },
        }
      )
      .then((res) => {
        setBalance(balance - res.data.data.myBettingPoint);

        toast({
          title: "배팅이 성공적으로 이루어졌습니다만?",
          description: `이긴다에 걸린 총 금액: ${res.data.data.predictDto.predictWin}, 진다에 걸린 총 금액: ${res.data.data.predictDto.predictLose}
        ,잔액: ${balance}
        `,
        });

        const winOrLose = isWin ? "이긴다" : "진다.";

        var chatMessage = {
          chatRoomId: roomId2,
          userId: userInfo.userId,
          content: `${userInfo.userName}님이 현재 ${winOrLose}에 ${res.data.data.myBettingPoint} point 거셨습니다!`,
          messageType: "CHAT_BOT",
          imgCode: chatImage,
        };
        stompClient.send(
          "/pub/chat/sendMessage",
          {},
          JSON.stringify(chatMessage)
        );
      })
      .catch((error) => {
        console.log(error);

        toast({
          variant: "destructive",
          title: "현재 10분이 지나서 배팅할 수 있는 시간이 아닙니다!",
          description: "배팅 불가!!!",
        });
      });

    setOpen(false);
  }

  // ================================================================

  //currentTypingId를 최신화 한다.
  useEffect(() => {
    // chatContainerRef의 current 값이 존재하는 경우 (컴포넌트가 마운트된 경우)
    // 채팅창 스크롤을 가장 하단으로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    console.log("메세지 배열 혹은 현재 타이핑 ID가 바뀐 것을 확인");
    if (currentTypingId === null) {
      console.log(currentTypingId + "== currentTypingId");
      // User가 아니면서, isTyping이 True인 msg를 messages에서 찾는다.
      const nextTypingMessage = messages.find(
        (msg) => !msg.isUser && msg.isTyping
      );

      // 만약 그런 녀석이 존재한다면, currentTypingId를 그 녀석의 ID로 바꾼다.
      // 이러면 해당 ID의 메세지에 또 다시 타이핑 애니메이션이 나타난다.
      if (nextTypingMessage) {
        setCurrentTypingId(nextTypingMessage.id);
      }
    }
  }, [messages, currentTypingId]);

  //--------------------------웹 소켓 파트 입니다. ------------------------------

  // const roomId = userInfo.roomId;

  const params = useParams();
  const roomId = params.id;
  const roomId2 = roomId;

  const clientHeader = {
    Authorization:
      " Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3anNhb3MyMDgxQG5hdmVyLmNvbSIsImV4cCI6MTcwOTAwMDc5MywiaWF0IjoxNzA2NDA4NzkzfQ.6QDpfmBeUZ6xSOTNWexdeV0EgJVaMcaEPbAMpad-pDM",
  };

  const connect = () => {
    // var sockJS = new SockJS("http://i10d110.p.ssafy.io:8080/ws-stomp");
    var sockJS = new SockJS(`${import.meta.env.VITE_API_BASE_URL}/ws-stomp`);
    stompClient = Stomp.over(sockJS);
    console.log(stompClient);

    stompClient.connect(clientHeader, onConnected, onError);
  };

  // 첫 연결 및 환영 메세지 보내기
  function onConnected() {
    console.log("채팅 앱 첫 연결 실행!");
    stompClient.subscribe(
      "/sub/chat/room/" + roomId,
      onMessageReceivedFromSocket,
      { userId: userInfo.userId, chatRoomType: "ONE" }
    );
    stompClient.send(
      "/pub/chat/enterUser",
      clientHeader,
      JSON.stringify({
        messageType: "ENTER",
        content: userInfo.userName + "님 환영합니다!",
        userId: userInfo.userId,
        chatRoomId: roomId,
      })
    );
  }

  function onError(error: any) {
    console.log(error);
  }

  // 메세지 보내는 로직
  function sendMessageToSocket(message: any) {
    var chatMessage = {
      chatRoomId: roomId,
      userId: userInfo.userId,
      content: message,
      messageType: "TALK",
      userName: userInfo.userName,
    };
    console.log(chatMessage);
    stompClient.send("/pub/chat/sendMessage", {}, JSON.stringify(chatMessage));
  }

  // 메세지 받는 로직 -> subscribe의 두번째 로직으로 넣으면 해당 주소로 들어오는 메세지를 다 받는다.
  function onMessageReceivedFromSocket(payload: any) {
    var chat = JSON.parse(payload.body);
    console.log("들어온 메세지:" + chat.content);
    // console.log(payload.body);

    const messageDTO = {
      isUser: chat.userId === userInfo.userId ? true : false,
      content: chat.content,
      isTyping: chat.userId === userInfo.userId ? false : true,
      id: Date.now(),
      imgCode: chat.imgCode,
      messageType: chat.messageType,
      userId: chat.userId,
      createdAt: chat.createdAt,
      userName: chat.userName,
      userCurAlias: chat.userCurAlias,
      userProfileImg: chat.userProfileImg,
    };

    // 소켓에서 받은 메세지를 전체 배열에 넣는 걸로 바꿔야함.
    // 이전 메세지를 받아서 메세지 전체 배열에 저장
    setMessages((prevMessages) => [...prevMessages, messageDTO]);
  }

  useEffect(() => {
    connect();
    // console.log(userInfo);
    // console.log(friendsInfo);

    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);

    // 이전 메시지 불러오기
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/dm/load/${roomId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.content[0]);
        setMessages((prevMessages) => [
          ...prevMessages,
          ...res.data.data.content.reverse(),
        ]);
      });

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/betting/room/${roomId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res: any) => {
        setPredictObject(res.data.data);
      });

    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/api/betting/user/${
          userInfo.userId
        }`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res: any) => {
        setBalance(res.data.data);
      });

    const timer = setTimeout(
      () =>
        setProgress(
          predictObject.predictLose + predictObject.predictWin === 0
            ? 0
            : (predictObject.predictWin /
                (predictObject.predictLose + predictObject.predictWin)) *
                100
        ),
      500
    );

    return () => {
      stompClient.send(
        "/pub/chat/exitChatRoom",
        clientHeader,
        JSON.stringify({
          messageType: "QUIT",
          content: userInfo.userName + "님이 퇴장했습니다.",
          userId: userInfo.userId,
          chatRoomId: roomId,
        })
      );
      stompClient.disconnect();
      clearTimeout(timer);
    };
  }, [roomId]);

  const [chatImage, setChatImage]: any = useState(null);
  const imageChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertBase64(file);
      setChatImage(base64);
    }
  };

  const handleImageChange = () => {
    var chatMessage = {
      chatRoomId: roomId2,
      userId: userInfo.userId,
      content: null,
      messageType: "TALK",
      imgCode: chatImage,
    };
    stompClient.send("/pub/chat/sendMessage", {}, JSON.stringify(chatMessage));
  };

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onClickDrawer = (adjustment: number) => {
    setGoal(Math.max(200, Math.min(1000, goal + adjustment)));
  };

  const bettingData = [
    {
      color: "hsl(var(--foreground))",
      goal: 400,
    },
    {
      color: "hsl(var(--foreground))",
      goal: 300,
    },
    {
      color: "hsl(var(--foreground))",
      goal: 200,
    },
    {
      color: "hsl(var(--foreground))",
      goal: 300,
    },
    {
      name: "친구들",
      color: "hsl(var(--foreground))",
      goal: 200,
    },
    {
      color: "hsl(var(--foreground))",
      goal: 278,
    },
    {
      color: "hsl(var(--foreground))",
      goal: 189,
    },
    {
      color: "hsl(var(--foreground))",
      goal: 239,
    },
    {
      color: "hsl(var(--foreground))",
      goal: 300,
    },
    {
      color: "hsl(var(--foreground))",
      goal: 200,
    },
    {
      name: "당신",
      color: "rgba(234,19,24,1)",
      goal: goal,
    },
  ];

  return (
    <>
      {/* ------------------------------------------------------- */}
      {/* 피시 화면 */}
      <PC>
        {/* 배팅 현황 화면 */}
        <Alert className=" w-[700px] h-[100%] m-auto">
          <div className="flex flex-row justify-between  h-full">
            <div className="flex flex-row">
              {/* 프사 */}
              <img
                src={friendsInfo.playerProfilePic}
                className=" rounded-full w-[80px] h-[80px] mb-3"
              />
              <div className="flex flex-col items-center gap-3 ml-3">
                {/* 칭호 */}
                <MessageAlias alias={friendsInfo.playerAlias} />
                {/* 이름 */}
                <div className="flex flex-row">
                  <p className="font-bold text-2xl">
                    {friendsInfo.playerName}님이 이긴다!! :{" "}
                    {predictObject.predictLose + predictObject.predictWin === 0
                      ? 0
                      : (
                          (predictObject.predictWin /
                            (predictObject.predictLose +
                              predictObject.predictWin)) *
                          100
                        ).toFixed(3)}{" "}
                    %{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to={`/main/profile/${friendsInfo.playerId}`}>
              <Button
                type="submit"
                variant="secondary"
                className="border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px] mr-10 rounded-xl"
              >
                프로필 보기
              </Button>
            </Link>
          </div>
          <AlertTitle>
            <Progress
              style={{ width: "100%", height: "50px", alignSelf: "center" }}
              value={progress}
            />
          </AlertTitle>
          <AlertDescription className="flex flex-row justify-between">
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline">배팅하러 가기</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>얼마 걸 것이여?</DrawerTitle>
                    <DrawerDescription>
                      당신의 현재 잔액: {balance} point <br /> (기본 배팅 단위는
                      200 point 입니다.)
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0">
                    <RadioGroup
                      defaultValue="true"
                      className="flex flex-row justify-around"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="true"
                          id="r2"
                          onClick={() => onClickRadio(true)}
                        />
                        <Label htmlFor="r2">이긴다</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="false"
                          id="r3"
                          onClick={() => onClickRadio(false)}
                        />
                        <Label htmlFor="r3">진다</Label>
                      </div>
                    </RadioGroup>

                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => onClickDrawer(-200)}
                        disabled={goal <= 200}
                      >
                        <MinusIcon className="h-4 w-4" />
                        <span className="sr-only">Decrease</span>
                      </Button>
                      <div className="flex-1 text-center">
                        <div className="text-7xl font-bold tracking-tighter">
                          {goal}
                        </div>
                        <div className="text-[0.70rem] uppercase text-muted-foreground">
                          POINTS
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => onClickDrawer(200)}
                        disabled={goal >= 1000}
                      >
                        <PlusIcon className="h-4 w-4" />
                        <span className="sr-only">Increase</span>
                      </Button>
                    </div>
                    <div className="mt-3 h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={bettingData}>
                          <XAxis dataKey="name" />
                          <Bar dataKey="goal">
                            {bettingData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button
                      onClick={() =>
                        onSubmitBetting({
                          userId: userInfo.userId,
                          roomId: roomId,
                          cur_betting_point: goal,
                          is_win: isWin,
                        })
                      }
                    >
                      배팅!
                    </Button>
                    <DrawerClose asChild>
                      <Button variant="outline">그..그만둘래</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </AlertDescription>
        </Alert>
        <Toaster />
        <div className="w-full h-screen flex flex-col items-center mb-4 pt-10">
          <div className="w-[700px] h-full border-4 rounded-xl grid grid-rows-12">
            {/* 채팅 화면 상단 사용자 정보 바 */}
            {/* -------------------------------------------------------------------------------------------------------------------- */}

            {/* 채팅창 부분 */}
            <div
              ref={chatContainerRef}
              className="w-full row-span-11  overflow-y-auto scrollbar-hide flex-row"
            >
              {/* 채팅 전체 내역을 출력 */}
              {messages.map((data, idx) => {
                return (
                  <div className="flex flex-col" key={idx}>
                    <div
                      className={`flex ${
                        data.messageType === "ENTER" ||
                        data.messageType === "CHAT_BOT"
                          ? "justify-center"
                          : data.userId === userInfo.userId
                          ? "justify-end"
                          : "justify-start"
                      } mb-2`}
                    >
                      {data.messageType === "CHAT_BOT" ? (
                        <BotMsg data={data} key={idx} />
                      ) : data.messageType === "ENTER" ? (
                        <SysMsg data={data} key={idx} />
                      ) : data.userId === userInfo.userId ? (
                        // 내 메세지 컴포넌트
                        <MyMsg data={data} key={idx} />
                      ) : (
                        // 상대방 메세지 컴포넌트
                        <YouMsg data={data} key={idx} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* -------------------------------------------------------------------------------------------------------------------- */}

            {/* 채팅 하단 부분 */}
            <div className="flex  border-b-4 border-blue-300 w-full row-span-1 justify-center items-center gap-1 rounded-3xl ">
              {/* 사진 버튼 */}
              <Dialog>
                <DialogTrigger asChild>
                  {/*  사진 버튼 */}
                  <button>
                    <img
                      src="/image/messagePicture.png"
                      className="h-[50px] w-[50px]"
                    />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>이미지 선택</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col w-full mb-5 mt-5">
                    {/* 이미지 선택 모달 */}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="picture2" className="font-bold">
                        이미지 파일을 선택하세요
                      </Label>
                      <Input
                        id="picture2"
                        type="file"
                        // 이미지 파일만 선택되게
                        accept="image/*"
                        onChange={imageChange}
                      />
                    </div>
                  </div>

                  {/* 하단 부분 */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-x-5">
                      {chatImage ? (
                        <img
                          src={chatImage}
                          className="h-20 w-[100px] rounded-lg border-2"
                        />
                      ) : (
                        <div className="flex justify-center items-center border-2 h-20 w-[100px]  rounded-lg">
                          이미지 없음
                        </div>
                      )}
                    </div>
                    <div>
                      <DialogClose asChild>
                        {/* 이미지 보내기 버튼 */}
                        <Button
                          type="submit"
                          variant="secondary"
                          className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px]"
                          onClick={(_) => {
                            //   이미지는 url 형식임
                            handleImageChange();
                            // 초기화
                            setChatImage(null);
                          }}
                        >
                          보내기
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              {/* 도감 버튼 */}
              <Dialog>
                <DialogTrigger asChild>
                  {/* 도감버튼 */}
                  <button>
                    <img
                      src="/image/messageDogam.png"
                      className="h-[50px] w-[50px]"
                    />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>도감 선택</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col w-full mb-5 mt-5 justify-center">
                    {/* 도감 선택 모달 */}
                    <div className="grid grid-cols-3 overflow-scroll h-[240px] scrollbar-hide place-items-center">
                      {data &&
                        data.pages.map((pageData) => {
                          return pageData.results.map(
                            (profiledogam: ProfileDogamType, idx) => {
                              return (
                                <img
                                  src={profiledogam.dogamImgUrl}
                                  className={`h-20 w-[100px] rounded-lg border-4 ${
                                    selectedImageIndex === idx
                                      ? "border-red-500"
                                      : "border-white"
                                  }`}
                                  key={idx}
                                  onClick={() => {
                                    console.log(profiledogam.dogamImgUrl);
                                    setChatImage(profiledogam.dogamImgUrl);
                                    setSelectedImageIndex(idx);
                                  }}
                                />
                              );
                            }
                          );
                        })}
                    </div>
                  </div>

                  {/* 하단 부분 */}
                  <div className="flex justify-center items-center">
                    <DialogClose asChild>
                      {/* 도감 보내기 버튼 */}
                      <Button
                        type="submit"
                        variant="secondary"
                        className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px]"
                        onClick={(_) => {
                          //   이미지는 url 형식임
                          handleImageChange();
                          // 초기화
                          setChatImage(null);
                        }}
                      >
                        보내기
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>

              {/* 채팅 입력칸 */}
              <form
                className="flex justify-center items-center gap-4 rounded-3xl w-[530px]"
                // 채팅 전송을 눌렀을때 함수
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessageToSocket(inputChat);

                  // 채팅 입력창 초기화
                  setInputChat("");
                }}
              >
                {/* 채팅 입력창 */}
                <Input
                  type="text"
                  className="w-[450px] font-bold text-xl"
                  onChange={(e) => {
                    // 입력받은 정보를 상태관리
                    setInputChat(e.target.value);
                  }}
                  value={inputChat}
                />
                {/* 채팅 입력 버튼 */}
                <button type="submit">
                  <img src="/image/chatBtn.png" className="h-[50px] w-[50px]" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </PC>

      {/* ------------------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------------- */}

      {/* 모바일 화면 */}
      <Mobile>
        <div className=" h-screen grid grid-rows-12">
          <Alert className=" w-full m-auto row-span-2">
            <div className="flex flex-row justify-between  h-full">
              <div className="grid grid-cols-5">
                {/* 프사 */}
                <img
                  src={friendsInfo.playerProfilePic}
                  className=" rounded-full w-[70px] h-[70px] mb-3 col-span-1"
                />
                <div className="flex flex-col items-center gap-3 ml-3 col-span-4">
                  {/* 칭호 */}
                  <MessageAlias alias={friendsInfo.playerAlias} />
                  {/* 이름 */}
                  <div className="flex flex-row">
                    <p className="font-bold text-md">
                      {friendsInfo.playerName}님이 이긴다!! :{" "}
                      {predictObject.predictLose + predictObject.predictWin ===
                      0
                        ? 0
                        : (
                            (predictObject.predictWin /
                              (predictObject.predictLose +
                                predictObject.predictWin)) *
                            100
                          ).toFixed(3)}{" "}
                      %{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <AlertTitle>
              <Progress
                style={{ width: "100%", height: "50px", alignSelf: "center" }}
                value={progress}
              />
            </AlertTitle>
            <AlertDescription className="flex flex-row justify-between">
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <Button variant="outline">배팅하러 가기</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>얼마 걸 것이여?</DrawerTitle>
                      <DrawerDescription>
                        당신의 현재 잔액: {balance} point <br /> (기본 배팅
                        단위는 200 point 입니다.)
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <RadioGroup
                        defaultValue="true"
                        className="flex flex-row justify-around"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="true"
                            id="r2"
                            onClick={() => onClickRadio(true)}
                          />
                          <Label htmlFor="r2">이긴다</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="false"
                            id="r3"
                            onClick={() => onClickRadio(false)}
                          />
                          <Label htmlFor="r3">진다</Label>
                        </div>
                      </RadioGroup>

                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-full"
                          onClick={() => onClickDrawer(-200)}
                          disabled={goal <= 200}
                        >
                          <MinusIcon className="h-4 w-4" />
                          <span className="sr-only">Decrease</span>
                        </Button>
                        <div className="flex-1 text-center">
                          <div className="text-7xl font-bold tracking-tighter">
                            {goal}
                          </div>
                          <div className="text-[0.70rem] uppercase text-muted-foreground">
                            POINTS
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-full"
                          onClick={() => onClickDrawer(200)}
                          disabled={goal >= 1000}
                        >
                          <PlusIcon className="h-4 w-4" />
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                      <div className="mt-3 h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={bettingData}>
                            <XAxis dataKey="name" />
                            <Bar dataKey="goal">
                              {bettingData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <DrawerFooter>
                      <Button
                        onClick={() =>
                          onSubmitBetting({
                            userId: userInfo.userId,
                            roomId: roomId,
                            cur_betting_point: goal,
                            is_win: isWin,
                          })
                        }
                      >
                        배팅!
                      </Button>
                      <DrawerClose asChild>
                        <Button variant="outline">그..그만둘래</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </AlertDescription>
          </Alert>
          <Toaster />
          <div className="w-full flex flex-col items-center mb-4 row-span-10">
            <div className="w-full h-full border-4 rounded-xl grid grid-rows-10">
              {/* 채팅 화면 상단 사용자 정보 바 */}
              {/* -------------------------------------------------------------------------------------------------------------------- */}

              {/* 채팅창 부분 */}
              <div
                ref={chatContainerRef}
                className="w-full row-span-9 overflow-y-auto scrollbar-hide flex-row"
              >
                {/* 채팅 전체 내역을 출력 */}
                {messages.map((data, idx) => {
                  return (
                    <div className="flex flex-col" key={idx}>
                      <div
                        className={`flex ${
                          data.messageType === "ENTER" ||
                          data.messageType === "CHAT_BOT"
                            ? "justify-center"
                            : data.userId === userInfo.userId
                            ? "justify-end"
                            : "justify-start"
                        } mb-2`}
                      >
                        {data.messageType === "CHAT_BOT" ? (
                          <BotMsg data={data} key={idx} />
                        ) : data.messageType === "ENTER" ? (
                          <SysMsg data={data} key={idx} />
                        ) : data.userId === userInfo.userId ? (
                          // 내 메세지 컴포넌트
                          <MyMsg data={data} key={idx} />
                        ) : (
                          // 상대방 메세지 컴포넌트
                          <YouMsg data={data} key={idx} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* -------------------------------------------------------------------------------------------------------------------- */}

              {/* 채팅 하단 부분 */}
              <div className="flex  border-b-4 border-blue-300 w-full row-span-1 justify-center items-center gap-1 rounded-3xl pb-2 ">
                {/* 사진 버튼 */}
                <Dialog>
                  <DialogTrigger asChild>
                    {/*  사진 버튼 */}
                    <button>
                      <div className="h-[40px] w-[40px] bg-[url('/image/messagePicture.png')] bg-cover dark:bg-[url('/image/messagePictureDark.png')]" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>이미지 선택</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col w-full mb-5 mt-5">
                      {/* 이미지 선택 모달 */}
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture2" className="font-bold">
                          이미지 파일을 선택하세요
                        </Label>
                        <Input
                          id="picture2"
                          type="file"
                          // 이미지 파일만 선택되게
                          accept="image/*"
                          onChange={imageChange}
                        />
                      </div>
                    </div>

                    {/* 하단 부분 */}
                    <div className="flex justify-between items-center">
                      <div className="flex gap-x-5">
                        {chatImage ? (
                          <img
                            src={chatImage}
                            className="h-20 w-[100px] rounded-lg border-2"
                          />
                        ) : (
                          <div className="flex justify-center items-center border-2 h-20 w-[100px]  rounded-lg">
                            이미지 없음
                          </div>
                        )}
                      </div>
                      <div>
                        <DialogClose asChild>
                          {/* 이미지 보내기 버튼 */}
                          <Button
                            type="submit"
                            variant="secondary"
                            className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px] text-black"
                            onClick={(_) => {
                              //   이미지는 url 형식임
                              handleImageChange();
                              // 초기화
                              setChatImage(null);
                            }}
                          >
                            보내기
                          </Button>
                        </DialogClose>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                {/* 도감 버튼 */}
                <Dialog>
                  <DialogTrigger asChild>
                    {/* 도감버튼 */}
                    <button>
                      <div className="h-[40px] w-[40px] bg-[url('/image/messageDogam.png')] bg-cover dark:bg-[url('/image/messageDogamDark.png')]" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>도감 선택</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col w-full mb-5 mt-5 justify-center">
                      {/* 도감 선택 모달 */}
                      <div className="grid grid-cols-3 overflow-scroll h-[240px] scrollbar-hide place-items-center">
                        {data &&
                          data.pages.map((pageData) => {
                            return pageData.results.map(
                              (profiledogam: ProfileDogamType, idx) => {
                                return (
                                  <img
                                    src={profiledogam.dogamImgUrl}
                                    className={`h-20 w-[100px] rounded-lg border-4 ${
                                      selectedImageIndex === idx
                                        ? "border-red-500"
                                        : "border-white"
                                    }`}
                                    key={idx}
                                    onClick={() => {
                                      console.log(profiledogam.dogamImgUrl);
                                      setChatImage(profiledogam.dogamImgUrl);
                                      setSelectedImageIndex(idx);
                                    }}
                                  />
                                );
                              }
                            );
                          })}
                      </div>
                    </div>

                    {/* 하단 부분 */}
                    <div className="flex justify-center items-center">
                      <DialogClose asChild>
                        {/* 도감 보내기 버튼 */}
                        <Button
                          type="submit"
                          variant="secondary"
                          className="mr-1 border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px] text-black"
                          onClick={(_) => {
                            //   이미지는 url 형식임
                            handleImageChange();
                            // 초기화
                            setChatImage(null);
                          }}
                        >
                          보내기
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* 채팅 입력칸 */}
                <form
                  className="flex justify-center items-center gap-4 rounded-3xl w-[250px] ml-1"
                  // 채팅 전송을 눌렀을때 함수
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessageToSocket(inputChat);

                    // 채팅 입력창 초기화
                    setInputChat("");
                  }}
                >
                  {/* 채팅 입력창 */}
                  <Input
                    type="text"
                    className="w-[250px] font-bold text-xl border-white"
                    onChange={(e) => {
                      // 입력받은 정보를 상태관리
                      setInputChat(e.target.value);
                    }}
                    value={inputChat}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </Mobile>
    </>
  );
}
