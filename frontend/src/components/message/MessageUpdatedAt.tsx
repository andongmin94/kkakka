interface updatedAtProps {
  updatedAt: Date;
}

export default function MessageUpdatedAt({ updatedAt }: updatedAtProps) {
  // const now = new Date();
  // const timeDiff = "1일 전";

  return (
    <>
      <div className="text-xs text-zinc-500">
        {updatedAt ? (
          `${updatedAt.toString().substring(5, 7)}월 ${updatedAt
            .toString()
            .substring(8, 10)}일`
        ) : (
          <div className="invisible">00월 00일</div>
        )}
      </div>
    </>
  );
}
