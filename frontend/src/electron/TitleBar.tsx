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
    <div className="fixed flex gap-1 justify-end z-10 border" style={{ WebkitAppRegion: "drag", width: "99.3%", borderRadius: "8px", margin: "1px", borderColor: "darkorange", backgroundColor: "gold" } as React.CSSProperties }>
      <div style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
        <Button onClick={minimize} className="">-</Button>&nbsp;
        <Button onClick={maximize}>ㅁ</Button>&nbsp;
        <Button onClick={hidden}>X</Button>
      </div>
    </div>
  );
}
