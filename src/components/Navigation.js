import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Navigation = ({ userObj }) => (
  <nav className="navContainer">
    <ul>
      <li>
        <FontAwesomeIcon icon={faTwitter} style={{ width: 30, height: 30 }} />
      </li>
      <li>
        <Link to="/">
          <FontAwesomeIcon
            icon={faHome}
            style={{ width: 26.25, height: 26.25 }}
          />
          <span className="navText">홈</span>
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <FontAwesomeIcon
            icon={faUser}
            style={{ width: 26.25, height: 26.25 }}
          />
          <span className="navText">프로필</span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
