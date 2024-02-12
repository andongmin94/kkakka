interface lastMessageProps {
  lastMessage: string;
}

export default function MessagePeek({ lastMessage }: lastMessageProps) {
  return (
    <>
      <p className="text-[14px] text-zinc-800 min-w-[200px] max-w-[200px] mr-10">
        {lastMessage.length > 15
          ? `${lastMessage.substring(0, 15)} ...`
          : lastMessage}
      </p>
    </>
  );
}
