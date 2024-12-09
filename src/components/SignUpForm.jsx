import React, { useState } from "react";
import Button from "@components/Button";
import "@components/Form.css";

const SignupForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, displayName }); // 부모 컴포넌트로 데이터 전달
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="이름"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        required
      />
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" text="회원가입" buttonType={"FORM"} />
    </form>
  );
};

export default SignupForm;
