import "@/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import IndexPage from "@/routes/IndexPage";
// import LoginPage from "@/routes/LoginPage.tsx";
import IntroPage from "@/routes/IntroPage.tsx";
import RootLayout from "@/routes/RootLayout.tsx";
import ProfilePage from "@/routes/ProfilePage.tsx";
import ItemshopPage from "@/routes/ItemshopPage.tsx";
import MessageListPage from "@/routes/MessageListPage";
import MessageDetailPage from "@/routes/MessageDetailPage";
import KakaoCallbackPage from "@/routes/KakaoCallbackPage.tsx";
import ProfileCollection from "@/routes/ProfileCollection";
import ProfileDishonorPage from "@/routes/ProfileDishonorPage";
import ProfileRecordPage from "@/routes/ProfileRecordPage";
import { ThemeProvider } from "@/components/navbar/ThemeProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
/////////////////////////////////////////////////////
// 일렉트론 빌드 때만 사용되는 컴포넌트
import TitleBar from "../electron/TitleBar.tsx";
import SettingPage from "../electron/SettingPage.tsx";
/////////////////////////////////////////////////////
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  // { path: "/", element: <LoginPage /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/main", element: <IndexPage /> },
      { path: "/main/item", element: <ItemshopPage /> },
      { path: "/main/messagelist", element: <MessageListPage /> },
      {
        path: "/main/messagedetail",
        element: <MessageDetailPage user={undefined} />,
      },

      { path: "/main/setting", element: <SettingPage /> },
      { path: "/main/intro", element: <IntroPage /> },
      {
        path: "/main/profile/:id",
        element: <ProfilePage />,
        children: [
          { path: "/main/profile/:id", element: <ProfileCollection /> },
          {
            path: "/main/profile/:id/dishonor",
            element: <ProfileDishonorPage />,
          },
          { path: "/main/profile/:id/record", element: <ProfileRecordPage /> },
        ],
      },
    ],
  },
  {
    path: "/api/oauth/callback/kakao/token",
    element: <KakaoCallbackPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TitleBar />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
