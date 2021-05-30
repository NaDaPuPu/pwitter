import { authService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import "./AuthForm.css";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <div className="authFormContainer">
        <FontAwesomeIcon
          className="twitterIcon"
          icon={faTwitter}
          color={"#d9d9d9"}
          size="3x"
          style={{ marginLeft: 5 }}
        />
        <div className="loginText">프위터 로그인</div>
        <form onSubmit={onSubmit} className="authInputContainer">
          <input
            name="email"
            type="email"
            placeholder="이메일"
            required
            value={email}
            onChange={onChange}
            className="authInput"
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            required
            value={password}
            onChange={onChange}
            className="authInput"
          />
          <input type="submit" value="로그인" className="authSignIn" />
          {error && <span className="authError">{error}</span>}
        </form>
      </div>
    </>
  );
};

export default AuthForm;
