import { Link } from "react-router-dom";
export default function LoginSuccessPage() {
  return (
    <div>
      로그인 성공
      <Link to="/main">메인페이지로 돌아가기</Link>
    </div>
  );
}
