import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/RootLayout.tsx";
import ItemshopPage from "./routes/ItemshopPage.tsx";
import MessagePage from "./routes/MessagePage.tsx";
import SettingPage from "./routes/SettingPage.tsx";
import IntroPage from "./routes/IntroPage.tsx";

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
    <RouterProvider router={router} />
  </React.StrictMode>
);
