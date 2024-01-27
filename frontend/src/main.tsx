import "@/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import IndexPage from "@/routes/IndexPage";
import LoginPage from "@/routes/LoginPage.tsx";
import IntroPage from "@/routes/IntroPage.tsx";
import RootLayout from "@/routes/RootLayout.tsx";
import ProfilePage from "@/routes/ProfilePage.tsx";
import SettingPage from "@/routes/SettingPage.tsx";
import ItemshopPage from "@/routes/ItemshopPage.tsx";
import MessageListPage from "@/routes/MessageListPage";
import MessageDetailPage from "@/routes/MessageDetailPage";
import KakaoCallbackPage from "@/routes/KakaoCallbackPage.tsx";
import { ThemeProvider } from "@/components/navbar/ThemeProvider";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileCollection from "./routes/ProfileCollection";
import ProfileDishonorPage from "./routes/ProfileDishonorPage";
import ProfileRecordPage from "./routes/ProfileRecordPage";

const queryClient = new QueryClient();
const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/item", element: <ItemshopPage /> },
      { path: "/messagelist", element: <MessageListPage /> },
      { path: "/messagedetail", element: <MessageDetailPage /> },

      { path: "/setting", element: <SettingPage /> },
      { path: "/intro", element: <IntroPage /> },
      { path: "/login", element: <LoginPage /> },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
        children: [
          { path: "/profile/:id", element: <ProfileCollection /> },
          { path: "/profile/:id/dishonor", element: <ProfileDishonorPage /> },
          { path: "/profile/:id/record", element: <ProfileRecordPage /> },
        ],
      },
      {
        path: "/api/oauth/callback/kakao/token",
        element: <KakaoCallbackPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
