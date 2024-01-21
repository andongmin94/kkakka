export default function MessageUpdatedAt({ updatedAt }) {
  const now = new Date();
  const timeDiff = "1일 전";
  return (
    <>
      <div>{timeDiff}</div>
    </>
  );
}
