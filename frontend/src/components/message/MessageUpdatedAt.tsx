interface updatedAtProps {
  updatedAt: Date;
}

export default function MessageUpdatedAt({ updatedAt }: updatedAtProps) {
  // const now = new Date();
  // const timeDiff = "1일 전";
  return (
    <>
      <div>{updatedAt && updatedAt.toString()}</div>
    </>
  );
}
