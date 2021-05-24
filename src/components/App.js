import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // 로그인, 로그아웃, 앱 초기화 시에 발생
      if (user) {
        // 로그인 한 user가 존재 시(user가 존재할 경우)
        setIsLoggedIn(true); // 로그인 여부 확인용 state isLoggedIn을 true로 설정
        setUserObj(user); // userObj에 user 입력
      } else {
        setIsLoggedIn(false);
      }
      setInit(true); // 앱이 준비가 되었을 때, init state를 true로 설정
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Pwitter</footer>
    </>
  );
}

export default App;
