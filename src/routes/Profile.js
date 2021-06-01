import React, { useState, useEffect } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";

const Profile = ({ refreshUser, userObj }) => {
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
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onProfileEditClick = () => {
    setIsEditing(!isEditing);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
    setIsEditing(!isEditing);
  };

  const dt = new Date(authService.currentUser.metadata.creationTime);
  const createdTime =
    dt.getFullYear() + "년 " + dt.getMonth() + "월 " + dt.getDay() + "일";

  return (
    <>
      <div className="profileDiv">{authService.currentUser.displayName}</div>
      <div className="profileContainer">
        <div className="profileBGIContainer"></div>
        <div className="profileContentContainer">
          <div className="profileImgContainer">
            <img
              src={authService.currentUser.photoURL}
              alt={authService.currentUser.displayName}
            />
            <button onClick={onProfileEditClick}>프로필 수정</button>
          </div>
          <div className="profileUserContainer">
            <span>{authService.currentUser.displayName}</span>
            <span className="profileUserUid">
              @{authService.currentUser.uid}
            </span>
            <span className="profileUserUid">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ width: 18.75, height: 18.75, marginRight: 5 }}
              />
              가입일 {createdTime}
            </span>
          </div>
        </div>

        <div></div>
        {isEditing && (
          <form className="profileFormContainer" onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="text"
              placeholder="Display name"
              value={newDisplayName}
            />
            <input type="submit" value="Update Profile" />
          </form>
        )}
        <button className="logOutButton" onClick={onLogOutClick}>
          Log Out
        </button>
      </div>
    </>
  );
};

export default Profile;
