import { Mobile, PC } from "@/components/MediaQuery";
import MessageAlias from "@/components/message/MessageAlias";
import MyMsg from "@/components/message/MyMsg";
import Picture from "@/components/message/Picture";
import YouMsg from "@/components/message/YouMsg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function MessageTestPage() {
  // 프로필 버튼을 눌렀을때 해당 사람의 프로필로 이동하기 위해 사용되는 그 사람의 아이디
  const profileId = "2";

  //   임시 채팅 목록 리스트
  const data = [
    {
      // 유저와 아이디를 대조해서 같으면 내 메세지 다르면 상대 메세지
      userId: "1",
      // 내 채팅인지 친구인지 시스템인지 구분
      name: "이해건",
      // 유저 프사
      msgUserProfile: "/image/joinSample.png",
      // 이미지면 url 정보가 들어가고, 이미지가 아니면 null
      img: null,
      // 채팅 내용, 만약에 이미지라면 '' 빈 문자열이 들어간다
      content: "ㅎㅇ",
    },
    {
      userId: "2",
      name: "김상훈",
      msgUserProfile: "/image/joinSample.png",
      img: null,
      content:
        "ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ",
    },
    {
      userId: "1",
      name: "이해건",
      msgUserProfile: "/image/joinSample.png",
      img: null,
      content:
        "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    },
    {
      userId: "2",
      name: "김상훈",
      msgUserProfile: "/image/joinSample.png",
      img: "/image/liveImage.png",
      content: "",
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
  // 소켓으로 에밋받은 채팅 정보들을 여기에 추가해주면 될듯
  const [messageList, setMessageList] = useState(data);

  // 채팅 입력창에서 받은 값 상태 관리
  const [inputChat, setInputChat] = useState("");

  useEffect(() => {
    // chatContainerRef의 current 값이 존재하는 경우 (컴포넌트가 마운트된 경우)
    // 채팅창 스크롤을 가장 하단으로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <>
      {/* 피시 화면 */}
      <PC>
        <div className="w-full h-screen flex flex-col items-center mb-4 pt-10">
          <div className="w-[800px] h-full border-8 rounded-3xl grid grid-rows-12 border-red-200">
            {/* 채팅 화면 상단 사용자 정보 바 */}
            <div className="w-full row-span-2 flex justify-between items-center rounded-3xl border-b-4">
              {/* 왼쪽 사용자 정보 */}
              <div className="h-full w-[300px] flex items-center justify-center gap-8 ml-10">
                {/* 사용자 프사 */}
                <img
                  src={userImage}
                  className=" rounded-full w-[80px] h-[80px]"
                />
                <div className="flex flex-col items-center gap-3">
                  {/* 칭호 */}
                  <MessageAlias alias={userAlias} />
                  {/* 이름 */}
                  <p className="font-bold text-2xl">{userName}</p>
                </div>
              </div>
              {/* 프로필 보기 버튼 */}
              {/* 해당 사람의 프로필로 이동한다 */}
              {/* 임시 정적 데이터로 profileId를 넣었음 */}
              <Link to={`/main/profile/${profileId}`}>
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
              {messageList.map((data, idx) => {
                return (
                  <div className="flex flex-col">
                    <div
                      className={`flex ${
                        data.userId === userId ? "justify-end" : "justify-start"
                      } mb-2`}
                    >
                      {data.userId === userId ? (
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
            <div className="flex border-b-4 border-blue-300 w-full row-span-1 justify-center items-center gap-6 rounded-3xl">
              {/* 사진 버튼 */}
              <Picture
                messageList={messageList}
                setMessageList={setMessageList}
              />
              {/* 도감 버튼 */}
              <button>
                <img
                  src="/image/messageDogam.png"
                  className="h-[50px] w-[50px]"
                />
              </button>
              {/* 채팅 입력칸 */}
              <form
                className="flex justify-center items-center gap-4 rounded-3xl w-[600px]"
                // 채팅 전송을 눌렀을때 함수
                onSubmit={(e) => {
                  e.preventDefault();
                  // 단순 채팅 보내기라 이미지가 아니다 (이미지는 사진 버튼 눌러서 보낸다)
                  // 데이터 형식
                  const data = {
                    // 채팅 치는 사람 아이디
                    userId: userId,
                    // 채팅 치는 사람 이름
                    name: userName,
                    // 채팅 치는 사람 프사 ( 카톡처럼 상대방 채팅일 경우만 표시될거임)
                    msgUserProfile: userImage,
                    // 이미지가 아니라서 null
                    img: null,
                    // 채팅 입력창에서 받은 값
                    content: inputChat,
                  };

                  // 리스트에 정보 저장
                  setMessageList((pre) => pre.concat(data));
                  // 채팅 입력창 초기화
                  setInputChat("");
                }}
              >
                {/* 채팅 입력창 */}
                <Input
                  type="text"
                  className="w-[520px] font-bold text-xl"
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

      {/* ------------------------------------------------------- */}

      {/* 모바일 화면 */}
      <Mobile>
        <></>
      </Mobile>
    </>
  );
}
