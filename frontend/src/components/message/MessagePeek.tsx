interface lastMessageProps {
  lastMessage: string;
}

export default function MessagePeek({ lastMessage }: lastMessageProps) {
  return (
    <>
      <p>{lastMessage}</p>
    </>
  );
}
