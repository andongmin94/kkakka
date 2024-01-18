export default function ProfilePage({params} : {params: {username: string}}) {
  return (
    <>
      <h1>{params.username}의 프로필 페이지 </h1>
    </>
  );
}
