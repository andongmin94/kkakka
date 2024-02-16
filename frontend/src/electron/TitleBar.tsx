const electron = window.electron;
import { Button } from "./button";

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
    <div className="fixed flex justify-end z-10 border" style={{ WebkitAppRegion: "drag", width: "100%", borderColor: "rgba(0, 0, 0, 0)", backgroundColor: "#262626" } as React.CSSProperties }>
      <div style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
        <Button onClick={minimize} className="text-xl">ㅡ</Button>&nbsp;
        <Button onClick={maximize} className="text-xl">□</Button>&nbsp;
        <Button onClick={hidden} className="text-xl">X</Button>
      </div>
    </div>
  );
}
