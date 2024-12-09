// src/components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/App"; // App에서 제공하는 AuthContext 임포트

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }
  if (!user) {
    // 사용자가 로그인하지 않았으면 로그인 페이지로 리다이렉트
    return <Navigate to="/login" />;
  }

  return children; // 로그인된 사용자는 자식 컴포넌트를 반환
};

export default PrivateRoute;
