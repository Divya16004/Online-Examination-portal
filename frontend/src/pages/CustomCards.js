import React from 'react';
import './CustomCards.css';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomCard = ({ href, coverImage, characterImage, titleText }) => {
  return (
    <div className="custom-card-container">
      <Link to={href} className="custom-title-text" aria-label={titleText}>
        <div className="custom-card">
          <div className="custom-wrapper">
            <img src={coverImage} className="custom-cover-image" alt="Cover" />
          </div>
          <div className="custom-title-text">{titleText}</div>
          <img src={characterImage} className="custom-character" alt="Character" />
        </div>
      </Link>
    </div>
  );
};

const CustomCardApp = () => {
  return (
    <div className="custom-app">
      <CustomCard
        href="/adminlogin"
        coverImage="https://clipart-library.com/images/8i6oer5KT.png"
        characterImage="https://clipart-library.com/images/8i6oer5KT.png"
        titleText="Login as Admin"
      />
      <CustomCard
        href="/examinerlogin"
        coverImage="images/userlogin.png"
        characterImage="images/userlogin.png"
        titleText="Login as Examiner"
      />
      <CustomCard
        href="/login"
        coverImage="images/userlogin.png"
        characterImage="images/userlogin.png"
        titleText="Login as User"
      />
      <div className="query-section">
        <span>Got a question? Don't worry, reach out to us anytime! </span>
        <Link to="/contact" aria-label="Contact us">
          <FontAwesomeIcon icon={faQuestionCircle} className="query-icon" />
        </Link>
      </div>
    </div>
  );
};

export default CustomCardApp;
