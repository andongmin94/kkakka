export default function ThumbsDown({ tD }: { tD: boolean }) {
  return (
    <div
      className="h-10 w-10 ml-2"
      onClick={() => {
        !tD;
        // 싫어요 누를때 post 요청보내야 함 (dogamId)
      }}
    >
      {tD ? (
        <img src="/image/thumbsDownOn.png" />
      ) : (
        <img src="/image/thumbsDown.png" />
      )}
    </div>
  );
}
