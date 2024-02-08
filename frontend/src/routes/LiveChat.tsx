import { Mobile, PC } from "@/components/MediaQuery";
import MessageAlias from "@/components/message/MessageAlias";
import MyMsg from "@/components/message/MyMsg";
import Picture from "@/components/message/Picture";
import YouMsg from "@/components/message/YouMsg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import axios from "axios";
import TypeIt from "typeit-react";
import Stack from "react-bootstrap/Stack";
import useUserStore from "@/store/userStore";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import SysMsg from "@/components/message/SysMsg";
import { DogamDetailType } from "@/types/dogamTypes";
import BotMsg from "@/components/message/BotMsg";

let stompClient: any;
let roomId2: any;

export default function LiveChat() {
  const { userInfo } = useUserStore();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const friendsInfo = { ...location.state };
  // 페이지에 들어올때 채팅창 스크롤이 항상 하단으로 가게 하기 위해 사용
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 채팅 입력 받은것
  const [inputChat, setInputChat] = useState("");

  // 어떤 도감을 선택했는지 인덱스를 저장
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  // 모든 채팅 메세지 저장
  const [messages, setMessages] = useState<any[]>([]);
  // 현재 다른 사람이 타이핑하는 메세지를 추적
  const [currentTypingId, setCurrentTypingId] = useState(null);
  // 현재 사용자가 업로드한 이미지
  const [curImg, setImgFile] = useState("");
  const imgRef = useRef();

  // 도감 전체 목록
  const [dogamList, setDogamList] = useState<DogamDetailType[]>([]);

  const handleSendMessage = (message: any) => {
    console.log(message);
    // 소켓으로 메세지 보내기
    sendMessageToSocket(message);
  };

  const handleEndTyping = (id: any) => {
    setMessages((prevMessages) =>
      // 이전 메세지들을 전부 순회하면서, 그 중 제일 최근 메세지의 ChatBot Animation 여부를 false로 바꾼다. (isTyping == 챗봇의 애니메이션 여부)
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, isTyping: false } : msg
      )
    );

    // 타이핑이 종료되면, 더 이상 타이핑 중인 메세지가 없으므로 currentTypingId의 상태를 null 로 바꾼다.

    setCurrentTypingId(null);
  };

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
  roomId2 = roomId;

  const clientHeader = {
    Authorization:
      " Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3anNhb3MyMDgxQG5hdmVyLmNvbSIsImV4cCI6MTcwOTAwMDc5MywiaWF0IjoxNzA2NDA4NzkzfQ.6QDpfmBeUZ6xSOTNWexdeV0EgJVaMcaEPbAMpad-pDM",
  };

  const connect = () => {
    var sockJS = new SockJS("http://localhost:8080/ws-stomp");
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
    };
    console.log(chatMessage);
    stompClient.send("/pub/chat/sendMessage", {}, JSON.stringify(chatMessage));
  }

  // 메세지 받는 로직 -> subscribe의 두번째 로직으로 넣으면 해당 주소로 들어오는 메세지를 다 받는다.
  function onMessageReceivedFromSocket(payload: any) {
    var chat = JSON.parse(payload.body);
    console.log("들어온 메세지:" + chat.content);
    console.log(payload.body);

    const messageDTO = {
      isUser: chat.userId === userInfo.userId ? true : false,
      content: chat.content,
      isTyping: chat.userId === userInfo.userId ? false : true,
      id: Date.now(),
      imgCode: chat.imgCode,
      messageType: chat.messageType,
      userId: chat.userId,
      createdAt: chat.createdAt,
    };

    /*
         // 내가 쓴 메세지
      { text: chat.content, isUser: true },

      // ChatBot이 쓴 메세지 
      {
        text: `당신의 메세지는: "${chat.content}"`,
        isUser: false,
        // 타이핑 애니메이션을 내는 트리거 
        isTyping: true,
        id: Date.now()
      }
    */

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
        // console.log("ddd");
        // console.log(res.data.data.content);
      });

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/friends/dogam`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res: any) => {
        console.log(res.data.data);
        setDogamList(res.data.data);
      });

    return () => {
      stompClient.send(
        "/pub/chat/enterUser",
        clientHeader,
        JSON.stringify({
          messageType: "QUIT",
          content: userInfo.userName + "님이 퇴장했습니다.",
          userId: userInfo.userId,
          chatRoomId: roomId,
        })
      );
      stompClient
        .disconnect
        // function () {
        //   alert("see you next Time!!");
        // }
        // { userId: userInfo.userId, chatRoomId: userInfo.roomId },
        // { userId: userInfo.userId, chatRoomId: userInfo.roomId }
        ();
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

  return (
    <>
      {/* ------------------------------------------------------- */}
      {/* 피시 화면 */}
      <div className="w-full h-screen flex flex-col items-center mb-4 pt-10">
        <div className="w-[700px] h-full border-4 rounded-xl grid grid-rows-12">
          {/* 채팅 화면 상단 사용자 정보 바 */}
          <div className="w-full row-span-2 flex justify-between items-center rounded-3xl border-b-4">
            {/* 왼쪽 사용자 정보 */}
            <div className="h-full w-[300px] flex items-center justify-center gap-8 ml-10">
              {/* 사용자 프사 */}
              <img
                src={friendsInfo.playerProfilePic}
                className=" rounded-full w-[80px] h-[80px]"
              />
              <div className="flex flex-col items-center gap-3">
                {/* 칭호 */}
                <MessageAlias alias={friendsInfo.userAlias} />
                {/* 이름 */}
                <p className="font-bold text-2xl">{friendsInfo.playerName}</p>
              </div>
            </div>
            {/* 프로필 보기 버튼 */}
            {/* 해당 사람의 프로필로 이동한다 */}
            {/* 임시 정적 데이터로 profileId를 넣었음 */}
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
          {/* -------------------------------------------------------------------------------------------------------------------- */}

          {/* 채팅창 부분 */}
          <div
            ref={chatContainerRef}
            className="w-full row-span-9  overflow-y-auto scrollbar-hide flex-row"
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
                      <YouMsg
                        data={data}
                        userName={friendsInfo.playerName}
                        userProfileImg={friendsInfo.playerProfilePic}
                        key={idx}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* -------------------------------------------------------------------------------------------------------------------- */}

          {/* 채팅 하단 부분 */}
          <div className="flex border-b-4 border-blue-300 w-full row-span-1 justify-center items-center gap-1 rounded-3xl">
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
                    {dogamList.map((dogam, idx) => (
                      <img
                        src={dogam.dogamImgUrl}
                        className={`h-20 w-[100px] rounded-lg border-4 ${
                          selectedImageIndex === idx
                            ? "border-red-500"
                            : "border-white"
                        }`}
                        key={idx}
                        onClick={() => {
                          console.log(dogam.dogamImgUrl);
                          setChatImage(dogam.dogamImgUrl);
                          setSelectedImageIndex(idx);
                        }}
                      />
                    ))}
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

      {/* 모바일 화면 */}
    </>
  );
}
