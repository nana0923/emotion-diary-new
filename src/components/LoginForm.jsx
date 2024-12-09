import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/Button";
import "@components/Form.css";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  // 회원가입 페이지로 이동하는 함수
  const handleSignupClick = () => {
    nav("/signup");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" text="로그인" buttonType={"FORM"} />
      <Button text="회원가입" onClick={handleSignupClick} />
    </form>
  );
};

export default LoginForm;
