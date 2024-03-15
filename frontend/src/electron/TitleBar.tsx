import { Button } from "./button";

export default function TitleBar() {
  const electron = window.electron;
  if (!electron) return null;

  return (
    <div
      aria-label="데스크톱 창 제어"
      className="fixed flex justify-end z-10 border"
      style={{ WebkitAppRegion: "drag", width: "100%", borderColor: "transparent", backgroundColor: "#262626" } as React.CSSProperties}
    >
      <div style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
        <Button aria-label="최소화" onClick={() => electron.minimize()} className="text-xl">ㅡ</Button>&nbsp;
        <Button aria-label="최대화 전환" onClick={() => electron.toggleMaximize()} className="text-xl">□</Button>&nbsp;
        <Button aria-label="트레이로 숨기기" onClick={() => electron.hide()} className="text-xl">×</Button>
      </div>
    </div>
  );
}
