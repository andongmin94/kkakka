export type AppMode = "mock" | "real";

const configuredMode = import.meta.env.VITE_APP_MODE;

/** 설정값이 명시적으로 `real`일 때만 실제 API를 사용하고, 나머지는 안전한 데모로 실행한다. */
export const APP_MODE: AppMode = configuredMode === "real" ? "real" : "mock";

/** API·실시간 gateway가 같은 기준으로 구현체를 선택할 때 사용하는 공통 플래그다. */
export const isMockMode = APP_MODE === "mock";
