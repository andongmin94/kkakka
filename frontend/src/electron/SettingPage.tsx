import { useEffect, useState } from "react";

type RuntimeInfo = {
  appMode: "mock" | "real";
  isPackaged: boolean;
};

type DesktopGameEvent = {
  eventName: string;
  message: string;
  source: "sample" | "league";
  occurredAt: string;
};

export default function SettingPage() {
  const electron = window.electron;
  const [runtime, setRuntime] = useState<RuntimeInfo | null>(null);
  const [message, setMessage] = useState("데스크톱 앱에서 샘플 경기 중계를 재생할 수 있습니다.");

  useEffect(() => {
    if (!electron) return;
    electron.getRuntimeInfo().then(setRuntime);
    return electron.onGameEvent((event: DesktopGameEvent) => setMessage(event.message));
  }, [electron]);

  const startEvents = async () => {
    if (!electron) return;
    const result = await electron.startGameEvents();
    if (!result.started && result.message) setMessage(result.message);
  };

  const resetDemo = () => {
    localStorage.removeItem("kkakka:demo:v1");
    window.location.reload();
  };

  if (!electron) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <h1 className="text-2xl font-semibold">데모 설정</h1>
        <p className="mt-3 text-neutral-600">브라우저에서는 가상 데이터 초기화 기능을 사용할 수 있습니다.</p>
        <button className="mt-6 rounded bg-neutral-900 px-4 py-2 text-white" onClick={resetDemo}>가상 데이터 초기화</button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">데스크톱 설정</h1>
      <p className="mt-3 text-neutral-600">
        {runtime?.appMode === "real" ? "League Client 연동 모드" : "샘플 경기 이벤트 모드"}
        {runtime?.isPackaged ? " · 설치 앱" : " · 개발 실행"}
      </p>
      <p className="mt-6 rounded bg-neutral-100 p-4" aria-live="polite">{message}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="rounded bg-neutral-900 px-4 py-2 text-white" onClick={startEvents}>경기 이벤트 시작</button>
        <button className="rounded border px-4 py-2" onClick={() => electron.stopGameEvents()}>이벤트 중지</button>
        <button className="rounded border px-4 py-2" onClick={resetDemo}>가상 데이터 초기화</button>
      </div>
    </main>
  );
}
