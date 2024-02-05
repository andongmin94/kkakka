import MessageAlias from "@/components/message/MessageAlias";
import MyMsg from "@/components/message/MyMsg";
import SysMsg from "@/components/message/SysMsg";
import YouMsg from "@/components/message/YouMsg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

export default function MessageTestPage() {
  //   임시 채팅 목록 리스트
  const data = [
    {
      // 유저와 아이디를 대조해서 같으면 내 메세지 다르면 상대 메세지
      userId: "2",
      // 내 채팅인지 친구인지 시스템인지 구분
      name: "이해건",
      // 텍스트인지 사진인지
      type: "text",
      // 채팅 내용
      content: "ㅎㅇ",
    },
    {
      userId: "1",
      name: "김상훈",
      type: "img",
      content: "/image/liveImage.png",
    },
    {
      userId: "1",
      name: "김상훈",
      type: "text",
      content:
        "ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ",
    },
    {
      userId: "2",
      name: "이해건",
      type: "img",
      content: "/image/profileBg.png",
    },
    {
      userId: "2",
      name: "이해건",
      type: "text",
      content:
        "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    },
  ];

  // 임시 정적 데이터
  const userId = "1";
  const userName = "김상훈";
  const userImage = "/image/profileImage.png";
  const userAlias = "천재개발자";

  // 페이지에 들어올때 채팅창 스크롤이 항상 하단으로 가게 하기 위해 사용
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 채팅 목록을 저장하는 리스트
  const [messageList, setMessageList] = useState(data);

  // 채팅 입력 상태 관리
  const [inputChat, setInputChat] = useState("");

  useEffect(() => {
    // 여기에 채팅 내용 상태 관리
    // socket.on("message", (message) => {
    //     setMessageList((preState) => preState.concat(message));
    //   });

    // chatContainerRef의 current 값이 존재하는 경우 (컴포넌트가 마운트된 경우)
    // 채팅창 스크롤을 가장 하단으로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <div className="w-full h-screen flex flex-col items-center mb-4">
      <div className="w-[800px] h-full border-8 rounded-3xl grid grid-rows-12">
        {/* 채팅 화면 상단 사용자 정보 바 */}
        <div className="w-full row-span-2 flex justify-between items-center rounded-3xl">
          {/* 왼쪽 사용자 정보 */}
          <div className="h-full w-[300px] flex items-center justify-center gap-8 ml-10">
            {/* 사용자 프사 */}
            <img
              src={userImage}
              className=" rounded-full w-[100px] h-[100px]"
            />
            <div className="flex flex-col items-center gap-3">
              {/* 칭호 */}
              <MessageAlias alias={userAlias} />
              {/* 이름 */}
              <p className="font-bold text-2xl">{userName}</p>
            </div>
          </div>
          {/* 오른쪽 버튼 */}
          <Button
            type="submit"
            variant="secondary"
            className="border-solid border-2 border-inherit bg-white font-bold text-lg mt-2 h-[50px] mr-10 rounded-xl"
          >
            프로필 보기
          </Button>
        </div>
        {/* -------------------------------------------------------------------------------------------------------------------- */}

        {/* 채팅창 부분 */}
        <div
          ref={chatContainerRef}
          className="w-full row-span-9  overflow-y-auto scrollbar-hide flex-row"
        >
          {messageList.map((data, idx) => {
            return (
              <div className="flex flex-col">
                <div
                  className={`flex ${
                    data.userId === userId ? "justify-end" : "justify-start"
                  }`}
                >
                  {data.userId === userId ? (
                    <MyMsg data={data} key={idx} />
                  ) : (
                    <YouMsg data={data} key={idx} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* -------------------------------------------------------------------------------------------------------------------- */}

        {/* 채팅 하단 부분 */}
        <div className="flex border-4 border-blue-300 w-full row-span-1 justify-center items-center gap-6 rounded-3xl">
          {/* 사진 버튼 */}
          <button>
            <img
              src="/image/messagePicture.png"
              className="h-[50px] w-[50px]"
            />
          </button>
          {/* 도감 버튼 */}
          <button>
            <img src="/image/messageDogam.png" className="h-[50px] w-[50px]" />
          </button>
          {/* 채팅 입력칸 */}
          <form
            className="flex justify-center items-center gap-4"
            // 채팅 전송을 눌렀을때 함수
            onSubmit={(e) => {
              e.preventDefault();
              const data = {
                userId: userId,
                name: userName,
                type: "text",
                content: inputChat,
              };

              // 리스트에 정보 저장
              setMessageList((pre) => pre.concat(data));
              setInputChat("");
            }}
          >
            <Input
              type="text"
              className="w-[520px] font-bold text-xl"
              onChange={(e) => {
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
  );
}
