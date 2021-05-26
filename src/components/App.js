import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null); // 다른 곳에서 userObj를 원할 수도 있기 때문에 앱의 가장 위(상위)에 존재함.
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // 로그인, 로그아웃, 앱 초기화 시에 발생
      if (user) {
        // 로그인 한 user가 존재 시(user가 존재할 경우)
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        }); // userObj에 user 입력\
      }
      setInit(true); // 앱이 준비가 되었을 때, init state를 true로 설정
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={userObj}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
