import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [pweet, setPweet] = useState("");
  const [pweets, setPweets] = useState([]);
  const getPweets = async () => {
    const dbPweets = await dbService.collection("pweets").get();
    dbPweets.forEach((document) => {
      const pweetObject = {
        ...document.data(),
        id: document.id,
      };
      setPweets((prev) => [pweetObject, ...prev]); // 작성한 Pweet과 이전에 작성된 Pweet을 같이 합침
    });
  };
  useEffect(() => {
    getPweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("pweets").add({
      text: pweet,
      createdAt: Date.now(),
    });
    setPweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPweet(value);
  };
  console.log(pweets);
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
          <div key={pweet.id}>
            <h4>{pweet.pweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
