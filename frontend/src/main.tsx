import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import "@/globals.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "@/routes/RootLayout.tsx";
import ItemshopPage from "@/routes/ItemshopPage.tsx";
import MessagePage from "@/routes/MessagePage.tsx";
import SettingPage from "@/routes/SettingPage.tsx";
import IntroPage from "@/routes/IntroPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/item", element: <ItemshopPage /> },
      { path: "/message", element: <MessagePage /> },
      { path: "/setting", element: <SettingPage /> },
      { path: "intro", element: <IntroPage /> },
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
