import Pweet from "components/Pweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [pweet, setPweet] = useState("");
  const [pweets, setPweets] = useState([]);
  const [attachment, setAttachment] = useState();
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
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0]; // 파일을 가져옴
    const reader = new FileReader(); // FileReader를 만듦
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile); // 이미지 URL 획득
  };
  const onClearAttachment = () => setAttachment(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Pweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
