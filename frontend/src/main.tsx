import "@/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import IndexPage from "@/routes/IndexPage";
import IntroPage from "@/routes/IntroPage.tsx";
import RootLayout from "@/routes/RootLayout.tsx";
import MessagePage from "@/routes/MessagePage.tsx";
import SettingPage from "@/routes/SettingPage.tsx";
import ItemshopPage from "@/routes/ItemshopPage.tsx";
import { ThemeProvider } from "@/components/navbar/ThemeProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/item", element: <ItemshopPage /> },
      { path: "/message", element: <MessagePage /> },
      { path: "/setting", element: <SettingPage /> },
      { path: "/intro", element: <IntroPage /> },
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
