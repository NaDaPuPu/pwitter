import Pweet from "components/Pweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [pweet, setPweet] = useState("");
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
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("pweets").add({
      text: pweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setPweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={pweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Pweet" />
      </form>
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
