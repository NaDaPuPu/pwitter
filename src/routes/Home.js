import Pweet from "components/Pweet";
import PweetFactory from "components/PweetFactory";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [pweets, setPweets] = useState([]);
  useEffect(() => {
    dbService.collection("pweets").onSnapshot((snapshot) => {
      // database에 변화가 있을 때, onSnapshot으로 snapshot 받아옴
      const pweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); // 새로운 snapshot을 받았을 때, 새로운 배열을 만듦
      setPweets(pweetArray); // pweets state에 새로운 배열 pweetArray를 넣음
    });
  }, []);
  return (
    <div className="homeContainer">
      <PweetFactory userObj={userObj} />
      <div>
        {pweets.map((pweet) => (
          <Pweet
            key={pweet.id}
            pweetObj={pweet}
            isOwner={pweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
