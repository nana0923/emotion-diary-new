import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, LoadingContext } from "@/App";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { isLoading } = useContext(LoadingContext);

  // 로딩 중일 때 아무것도 렌더링하지 않음
  if (user === undefined || isLoading) {
    return;
  }
  if (!user) {
    // 사용자가 로그인하지 않았으면 로그인 페이지로 리다이렉트
    return <Navigate to="/login" />;
  }
  // 로그인된 경우 자식 컴포넌트 렌더링
  return children;
};

export default PrivateRoute;
