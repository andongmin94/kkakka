// import { Mobile, PC } from "@/components/MediaQuery";
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
import SysMsg from "@/components/message/SysMsg";
import { DogamDetailType } from "@/types/dogamTypes";

let stompClient: any;
let roomId2: any;

export default function MessageTestPage() {
  // const { userInfo } = useUserStore();
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
  const userIdString = localStorage.getItem("userId");
  const userInfo = {
    userId: userIdString !== null ? parseInt(userIdString, 10) : undefined,
    userName: localStorage.getItem("userName"),
  };

  // 모든 채팅 메세지 저장
  const [messages, setMessages] = useState<any[]>([]);
  // 현재 다른 사람이 타이핑하는 메세지를 추적
  const [currentTypingId, setCurrentTypingId] = useState(null);
  // 현재 사용자가 업로드한 이미지
  // const [curImg, setImgFile] = useState("");
  // const imgRef = useRef();

  // 도감 전체 목록
  const [dogamList, setDogamList] = useState<DogamDetailType[]>([]);

  // const handleSendMessage = (message: any) => {
  //   console.log(message);
  //   // 소켓으로 메세지 보내기
  //   sendMessageToSocket(message);
  // };

  // const handleEndTyping = (id: any) => {
  //   setMessages((prevMessages) =>
  //     // 이전 메세지들을 전부 순회하면서, 그 중 제일 최근 메세지의 ChatBot Animation 여부를 false로 바꾼다. (isTyping == 챗봇의 애니메이션 여부)
  //     prevMessages.map((msg) =>
  //       msg.id === id ? { ...msg, isTyping: false } : msg
  //     )
  //   );

  //   // 타이핑이 종료되면, 더 이상 타이핑 중인 메세지가 없으므로 currentTypingId의 상태를 null 로 바꾼다.

  //   setCurrentTypingId(null);
  // };

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

  const goBottomChat = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

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
        userName: userInfo.userName,
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
      userName: chat.userName,
      userCurAlias: chat.userCurAlias,
      userProfileImg: chat.userProfileImg,
    };
    console.log(messageDTO);
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
    console.log("프랜즈인포", friendsInfo);

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
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/api/friends/dogam/users/${
          friendsInfo.userId
        }?page=0&size=10`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res: any) => {
        setDogamList(res.data.data.data);
      });

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
      stompClient
        .disconnect

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
      <div className=" h-screen flex flex-col items-center mb-4 pt-10">
        <div className="w-[70%] h-[99%] border-2 rounded-2xl grid grid-rows-12 ">
          {/* 채팅 화면 상단 사용자 정보 바 */}
          <div className="w-full row-span-2 flex justify-between items-center border-b-2 bg-gray-50 rounded-t-2xl">
            {/* 왼쪽 사용자 정보 */}
            <div className="h-full w-[300px] flex items-center justify-center gap-8 ml-3 ">
              {/* 사용자 프사 */}
              <img
                src={friendsInfo.userProfileImg}
                className=" rounded-full w-[70px] h-[70px] shadow-md"
              />
              <div className="flex flex-col items-center gap-3">
                {/* 칭호 */}
                <MessageAlias alias={friendsInfo && friendsInfo.userAlias} />
                {/* 이름 */}
                <p className="font-bold text-md">
                  {friendsInfo && friendsInfo.userName}
                </p>
              </div>
            </div>
            {/* 프로필 보기 버튼 */}
            {/* 해당 사람의 프로필로 이동한다 */}
            <Link to={`/main/profile/${friendsInfo && friendsInfo.userId}`}>
              <Button
                type="submit"
                variant="secondary"
                className=" bg-gray-100 font-bold text-sm mt-2 h-[50px] mr-10 rounded-2xl shadow-sm"
              >
                프로필 보기
              </Button>
            </Link>
          </div>
          {/* -------------------------------------------------------------------------------------------------------------------- */}

          {/* 채팅창 부분 */}
          <div
            ref={chatContainerRef}
            className="w-full row-span-9 overflow-y-auto scrollbar-hide flex-row bg-gray-200 relative"
          >
            {/* 채팅 전체 내역을 출력 */}
            {messages.map((data, idx) => {
              return (
                <div className="flex flex-col" key={idx}>
                  <div
                    className={`flex ${
                      data.messageType === "ENTER"
                        ? "justify-center"
                        : data.userId === userInfo.userId
                        ? "justify-end"
                        : "justify-start"
                    } mb-2`}
                  >
                    {data.messageType === "ENTER" ? (
                      <SysMsg data={data} />
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

          <button
            onClick={goBottomChat}
            className="absolute w-10 h-10 bg-white bg-opacity-80 right-40 bottom-24 rounded-full flex items-center justify-center shadow-md hover:bg-opacity-100"
          >
            ↓
          </button>

          {/* -------------------------------------------------------------------------------------------------------------------- */}

          {/* 채팅 하단 부분 */}

          <div className="flex border-t-2 w-full row-span-1 justify-center items-center gap-1 pl-3">
            {/* 사진 버튼 */}
            <Dialog>
              <DialogTrigger asChild>
                {/*  사진 버튼 */}
                <div className="h-10 w-12 shadow-inner rounded-lg bg-gray-50 flex items-center justify-center">
                  <button className="text-xl">🖼️</button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="border-b-4 w-fit pb-2">
                    이미지 선택
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col w-full mb-5 mt-5">
                  {/* 이미지 선택 모달 */}
                  <div className="grid w-full h-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture2" className="font-bold mb-2 ml-1">
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
                        className="h-24 w-24 rounded-lg border-2"
                      />
                    ) : (
                      <div className="flex justify-center items-center border-2 h-24 w-24 rounded-lg text-sm">
                        이미지
                      </div>
                    )}
                  </div>
                  <div>
                    <DialogClose asChild>
                      {/* 이미지 보내기 버튼 */}
                      <Button
                        type="submit"
                        className=" bg-blue-400 font-bold text-sm shadow-md text-white rounded-lg mt-10"
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
                <div className="h-10 w-12 shadow-inner bg-gray-50 rounded-lg flex items-center justify-center">
                  <button className="text-xl">📜</button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="border-b-4 w-fit pb-2">
                  <DialogTitle>도감 선택</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col w-full mb-5 mt-5 justify-center">
                  {/* 도감 선택 모달 */}
                  <div className="grid grid-cols-3 overflow-scroll h-[150px] scrollbar-hide place-items-center">
                    {dogamList.map((dogam, idx) => (
                      <img
                        src={dogam.dogamImgUrl}
                        className={`h-24 w-24 rounded-lg border-2 ${
                          selectedImageIndex === idx
                            ? "border-red-300"
                            : "border-white"
                        }`}
                        key={dogam.dogamId}
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
                      className=" bg-blue-400 font-bold text-sm shadow-md text-white rounded-lg "
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
              className="flex justify-center items-center gap-4 rounded-3xl w-[520px]"
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
                className="w-[400px] font-bold text-sm shadow-inner"
                onChange={(e) => {
                  // 입력받은 정보를 상태관리
                  setInputChat(e.target.value);
                }}
                value={inputChat}
              />
              {/* 채팅 입력 버튼 */}
              <Button
                type="submit"
                className=" bg-blue-400 font-bold text-sm shadow-md text-white rounded-lg py-2 px-3"
              >
                보내기
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* 모바일 화면 */}
    </>
  );
}
