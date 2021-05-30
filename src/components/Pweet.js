import { authService, dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const Pweet = ({ pweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false); // Pweet 수정 여부 확인 state
  const [newPweet, setNewPweet] = useState(pweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this pweet?");
    if (ok) {
      await dbService.doc(`pweets/${pweetObj.id}`).delete();
      await storageService.refFromURL(pweetObj.attachmentUrl).delete(); // 사진 삭제
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(pweetObj, newPweet);
    await dbService.doc(`pweets/${pweetObj.id}`).update({
      text: newPweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewPweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your pweet"
                  value={newPweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Pweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>{" "}
            </>
          )}
        </>
      ) : (
        <div className="pweetContainer">
          <img src={authService.currentUser.photoURL} />
          <div className="pweetTextContainer">
            <div className="pweetCreatorContainer">
              <span>사용자</span>
              <span className="pweetCreatorUid">@{pweetObj.creatorId}</span>
            </div>

            <h4>{pweetObj.text}</h4>
            {pweetObj.attachmentUrl && (
              <img src={pweetObj.attachmentUrl} width="50px" height="50px" />
            )}
            {isOwner && (
              <div className="pweetButtonContainer">
                <label htmlFor="delete">
                  {<FontAwesomeIcon icon={faTrashAlt} />}
                </label>
                <button id="delete" onClick={onDeleteClick}></button>
                <label htmlFor="edit">
                  {<FontAwesomeIcon icon={faEdit} />}
                </label>
                <button id="edit" onClick={toggleEditing}></button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pweet;
