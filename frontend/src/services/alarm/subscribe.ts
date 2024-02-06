import { EventSourcePolyfill } from "event-source-polyfill";
const EventSource = EventSourcePolyfill;

const token = localStorage.getItem("token");

if (!token) {
  throw new Error("Token not found");
}

export const source = new EventSource(
  `${import.meta.env.VITE_API_BASE_URL}/api/alarm/subscribe`,
  {
    headers: {
      Authorization: token,
    },
  }
);
