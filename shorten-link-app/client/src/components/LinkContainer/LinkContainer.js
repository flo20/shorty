import React from "react";
import InputField from "../InputField/InputField";

import "./../InputField/InputField.scss";

const LinkContainer = () => {
  return (
    <div>
      <InputField />
      <div className="extra-info">
        <h2>A fast and simple URL shortener</h2>
        <p>
          The ideal free URL shortener for transforming long, ugly URLs is RB.GY
          Links to short URLs which are sweet, memorable and trackable. Using it
          for shortening Links to any site for social media , websites, SMS,
          emails, commercials, or You want to share them almost everywhere else.
          Yahoo, Twitter, Instagram, WhatsApp, contacts, blogs, SMS,
          photographs, YouTube, LinkedIn, The advert.
        </p>
      </div>
      <footer className="page-footer">
        <p>© November 2020. Florence Anipa</p>
      </footer>
    </div>
  );
};

export default LinkContainer;
