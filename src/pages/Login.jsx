import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoadingContext } from "@/App";
import { auth } from "@/firebase";
import LoginForm from "@components/LoginForm";
import Header from "@layouts/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "@layouts/Container";

const Login = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const nav = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav("/"); // 로그인 성공 시 홈으로 이동
    } catch (err) {
      if (err.code) {
        switch (err.code) {
          case "auth/invalid-email":
            return toast.error("이메일 형식이 잘못되었습니다.");
          case "auth/user-not-found":
            return toast.error("등록되지 않은 이메일입니다.");
          case "auth/wrong-password":
            return toast.error("비밀번호가 잘못되었습니다.");
          case "auth/invalid-credential":
            return toast.error("이메일 또는 비밀번호가 잘못 되었습니다. 이메일과 비밀번호를 정확히 입력해 주세요.");
          default:
            console.error("Firebase error:", err);
            return toast.error("알 수 없는 오류가 발생했습니다.");
        }
      } else {
        console.error("Unexpected error:", err);
        return toast.error("오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header title={"로그인"} />
      <Container>
        <LoginForm onSubmit={handleLogin} />
      </Container>
    </>
  );
};

export default Login;
