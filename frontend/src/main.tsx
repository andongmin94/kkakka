import "@/globals.css";
import ReactDOM from "react-dom/client";
import IndexPage from "@/routes/IndexPage";
import LoginPage from "@/routes/LoginPage.tsx";
import IntroPage from "@/routes/IntroPage.tsx";
import RootLayout from "@/routes/RootLayout.tsx";
import ProfilePage from "@/routes/ProfilePage.tsx";
import DogamDetailPage from "@/routes/DogamDetailPage.tsx";
import ItemshopPage from "@/routes/ItemshopPage.tsx";
import MessageListPage from "@/routes/MessageListPage";
// import MessageDetailPage from "@/routes/MessageDetailPage";
import ProfileCollection from "@/routes/ProfileCollection";
import FirstLoginPage from "@/routes/FirstLoginPage.js";
import LoginSuccessPage from "@/routes/LoginSuccessPage.js";
import KakaoCallbackPage from "@/routes/KakaoCallbackPage.tsx";
import ProfileDishonorPage from "@/routes/ProfileDishonorPage";
import { ThemeProvider } from "@/components/navbar/ThemeProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
////////////////일렉트론 컴포넌트/////////////////////
const electron = window.electron;
import TitleBar from "@/electron/TitleBar.tsx";
import SettingPage from "@/electron/SettingPage";
/////////////////////////////////////////////////////
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MessageTestPage from "./routes/MessageTestPage";
import LiveChat from "./routes/LiveChat";
import NotFound from "./routes/NotFound";
import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_GA_KEY);
ReactGA.send("pageview");

const queryClient = new QueryClient();
const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/first-login", element: <FirstLoginPage /> },
  { path: "/login-success", element: <LoginSuccessPage /> },
  {
    path: "/main",
    element: <RootLayout />,
    children: [
      { path: "/main", element: <IndexPage /> },
      { path: "/main/item", element: <ItemshopPage /> },
      { path: "/main/messagelist", element: <MessageListPage /> },
      // {
      //   path: "/main/messagedetail",
      //   element: <MessageDetailPage user={undefined} />,
      // },
      { path: "/main/setting", element: <SettingPage /> },
      { path: "/main/intro", element: <IntroPage /> },
      // 채팅 테스트용
      { path: "/main/message/:id", element: <MessageTestPage /> },
      { path: "/main/liveChat/:id", element: <LiveChat /> },
      {
        path: "/main/profile/:id",
        element: <ProfilePage />,
        children: [
          { path: "/main/profile/:id", element: <ProfileCollection /> },
          {
            path: "/main/profile/:id/dishonor",
            element: <ProfileDishonorPage />,
          },
        ],
      },
      { path: "/main/dogam/:id", element: <DogamDetailPage /> },
    ],
  },
  {
    path: "/oauth/callback/kakao/token",
    element: <KakaoCallbackPage />,
  },
  { path: "/*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode> 이녀석 킹받으니까 일단 주석 처리
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      {typeof electron !== "undefined" && <TitleBar />}
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </ThemeProvider>
  // </React.StrictMode>
);
