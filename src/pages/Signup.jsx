import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { LoadingContext } from "@/App";
import { auth } from "@/firebase";

import Header from "@layouts/Header";
import SignupForm from "@components/SignupForm";
import Container from "@layouts/Container";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const nav = useNavigate();

  const handleSignUp = async ({ email, password, displayName }) => {
    setIsLoading(true);
    try {
      // 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 사용자 이름 업데이트
      await updateProfile(userCredential.user, { displayName });

      // 성공 메시지
      toast.success("회원가입 되었습니다😊");
      nav("/login");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          toast.error("이메일이 이미 사용 중입니다. 다른 이메일을 사용해주세요.");
          break;
        case "auth/invalid-email":
          toast.error("이메일 형식이 잘못되었습니다. 올바른 이메일 주소를 입력하세요.");
          break;
        case "auth/weak-password":
          toast.error("비밀번호가 너무 짧습니다. 최소 6자 이상의 비밀번호를 사용해주세요.");
          break;
        case "auth/network-request-failed":
          toast.error("네트워크 연결에 문제가 있습니다. 다시 시도해주세요.");
          break;
        case "auth/internal-error":
          toast.error("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
          break;
        default:
          toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header title={"회원가입"} />
      <Container>
        <SignupForm onSubmit={handleSignUp} />
      </Container>
    </div>
  );
};

export default Signup;
