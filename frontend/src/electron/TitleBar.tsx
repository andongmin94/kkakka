const electron = window.electron;
import { Button } from "@/components/ui/button";

export default function TitleBar() {
  const minimize = () => {
    electron.send("minimize");
  };
  const maximize = () => {
    electron.send("maximize");
  };
  const hidden = () => {
    electron.send("hidden");
  };
  return (
    <div className="fixed flex justify-end z-10 border" style={{ WebkitAppRegion: "drag", width: "100%", borderWidth: "2px", borderColor: "darkorange", backgroundColor: "gold" } as React.CSSProperties }>
      <div className="mx-1 my-1" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
        <Button onClick={minimize} className="text-xl">-</Button>&nbsp;
        <Button onClick={maximize} className="text-xl">ㅁ</Button>&nbsp;
        <Button onClick={hidden} className="text-xl">X</Button>
      </div>
    </div>
  );
}
