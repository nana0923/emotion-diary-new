import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Header from "@layouts/Header"; // Header 컴포넌트

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
        ), // Home 페이지는 로그인 후 접근 가능
      },
      { path: "login", element: <Login /> }, // 로그인 페이지
      { path: "signup", element: <SignUp /> }, // 회원가입 페이지
      {
        path: "new",
        element: (
          <PrivateRoute>
            <New />
          </PrivateRoute>
        ), // 새로운 일기 작성 페이지는 로그인 후 접근 가능
      },
      {
        path: "edit/:id",
        element: (
          <PrivateRoute>
            <Edit />
          </PrivateRoute>
        ), // 일기 수정 페이지는 로그인 후 접근 가능
      },
      {
        path: "diary/:id",
        element: (
          <PrivateRoute>
            <Diary />
          </PrivateRoute>
        ), // 일기 상세 페이지는 로그인 후 접근 가능
      },
      { path: "*", element: <Notfound /> }, // 잘못된 경로에 대한 404 페이지
    ],
  },
]);

export default router;
