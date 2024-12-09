import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Home from "@pages/Home";
import Login from "@pages/Login";
import SignUp from "@pages/SignUp";
import Notfound from "@pages/Notfound";
import PrivateRoute from "@components/PrivateRoute"; // PrivateRoute 컴포넌트

import New from "@pages/New";
import Edit from "@pages/Edit";
import Diary from "@pages/Diary";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Notfound />, // 404 페이지
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      { path: "login", element: <Login /> }, // 로그인 페이지
      { path: "signup", element: <SignUp /> }, // 회원가입 페이지
      {
        path: "new",
        element: (
          <PrivateRoute>
            <New />
          </PrivateRoute>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <PrivateRoute>
            <Edit />
          </PrivateRoute>
        ),
      },
      {
        path: "diary/:id",
        element: (
          <PrivateRoute>
            <Diary />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <Notfound /> }, // 잘못된 경로에 대한 404 페이지
    ],
  },
]);

export default router;
