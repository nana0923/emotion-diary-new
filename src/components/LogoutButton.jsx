import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import Button from "@components/Button";
import "@components/LogoutButton.css";

const LogoutButton = () => {
  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      // 로그아웃 처리
      await signOut(auth);
      nav("/login"); // 로그아웃 후 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error("로그아웃에 실패했습니다:", error);
    }
  };

  return <Button onClick={handleLogout} text={"로그아웃"} buttonType={"LOGOUT"} />;
};

export default LogoutButton;
