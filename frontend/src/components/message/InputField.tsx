import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function InputField({
  message,
  setMessage,
  sendMessage,
}: {
  message: string;
  setMessage: any;
  sendMessage: any;
}) {
  return (
    <div>
      <div>+</div>
      <form onSubmit={sendMessage}>
        <Input
          placeholder="메시지를 입력하세요"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          //   multiline={false}
          //   rows={1}
        />

        <Button disabled={message === ""} type="submit">
          ↑
        </Button>
      </form>
    </div>
  );
}
