import { useState } from "react";
import classes from "@/components/navbar/FriendsBtn.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchFriendBtn = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [showSearchField, setShowSearchField] = useState(false); // 검색 필드 표시 여부 상태

  const token = localStorage.getItem("token");

  const handleSearch = async () => {
    try {
      // 친구 검색 API 호출
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/friends/search`,
        { userEmail: searchTerm },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("유저 아이디 : " + response.data.data.UserDataResponseDto.userId);
      // 검색 결과가 있으면 userId를 가져와서 저장
      if (response.data.data.UserDataResponseDto.userId) {
        setSearchResult(response.data.data.UserDataResponseDto.userId);
        // 아이디가 존재하면 이동
        const confirmed = window.confirm("친구 페이지로 이동!");
        if (confirmed) {
          // 확인을 누르면 해당 친구의 프로필 페이지로 이동
          window.location.href = `/main/profile/${response.data.data.UserDataResponseDto.userId}`;
        }
      } else {
        // 아이디가 존재하지 않는다는 창 띄우기
        alert("아이디가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("Error searching for friend:", error);
      // 요청 실패 시 아이디가 존재하지 않는다는 창 띄우기
      alert("아이디가 존재하지 않습니다.");
      setSearchResult(null);
    }
  };

  const handleCancel = () => {
    // 취소 버튼을 클릭하면 검색 필드가 사라지고 search_image가 보이게 설정
    setShowSearchField(false);
  };

  return (
    <div>
      {/* 친구 버튼 */}
      <div
        className={classes.search_image}
        onClick={() => setShowSearchField(!showSearchField)}
        style={{ display: showSearchField ? "none" : "block" }}
      />
      {/* 친구 검색 필드 */}
      {showSearchField && (
        <div>
          {/* 친구 검색 입력 필드 */}
          <input
            type="text"
            placeholder="친구 이메일 입력"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* 친구 검색 버튼 */}
          <button onClick={handleSearch}>검색</button>
          {/* 취소 버튼 */}
          <button onClick={handleCancel} style={{ marginLeft: "10px" }}>취소</button>
          {/* 검색 결과가 있을 경우 해당 친구의 프로필 페이지로 이동하는 링크 */}
          {searchResult && (
            <Link to={`/main/profile/${searchResult}`}>
              친구 프로필 보기
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFriendBtn;
