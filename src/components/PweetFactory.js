import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { authService, dbService, storageService } from "fbase";
import "./PweetFactory.css";

const PweetFactory = ({ userObj }) => {
  const [pweet, setPweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const pweetObj = {
      text: pweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("pweets").add(pweetObj);
    setPweet("");
    setAttachment("");
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
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile); // 이미지 URL 획득
  };
  const onClearAttachment = () => setAttachment(null);
  return (
    <div className="pweetFactoryContainer">
      <div className="homeDiv">홈</div>
      <div className="mainContainer">
        <img src={authService.currentUser.photoURL} />
        <form className="formContainer" onSubmit={onSubmit}>
          <div className="pweetContainer">
            <input
              value={pweet}
              onChange={onChange}
              type="text"
              placeholder="무슨 일이 일어나고 있나요??"
              maxLength={120}
              className="pweetText"
            />
          </div>
          <div className="inputContainer">
            <input
              className="addImage"
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
            <input className="submitButton" type="submit" value="프윗하기" />
            {attachment && (
              <div className="imgContainer">
                <img src={attachment} width="50px" height="50px" />
                <button onClick={onClearAttachment}>Clear</button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PweetFactory;
