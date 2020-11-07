import axios from "axios";
import React, { useState, Fragment, useEffect, useRef } from "react";
import validator from "validator";

import "./InputField.scss";
import { AiOutlineDelete } from "react-icons/ai";

const InputField = () => {
  const [input, setInput] = useState({
    url: "",
    link: "",
    data: [],
  });
  const [showResult, setShowResult] = useState(false);

  const handleShow = () => setShowResult(!showResult);

  //handling focus cursor
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput({
      url: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validURL = validator.isURL(input.url, {
      require_protocol: true,
    });
    //handling valid url
    if (!validURL) {
      alert("Ensure the URL is correct");
    } else {
      try {
        const { data } = await axios.post("/links", { url: input.url });
        setInput({ link: `http:/${data.url}` });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeLink = () => {
    setInput({ link: "" });
  };
  return (
    <Fragment>
      <div className="main-background">
        <div className="heading-container">
          <h1 className="heading">Shorten your Url</h1>
          <p>Shorten, track every link to boost your brand!</p>
          <form onSubmit={handleSubmit} className="link-form">
            <div className="form-container">
              <input
                type="text"
                name="url"
                placeholder="Enter your url here"
                onChange={handleChange}
                className="input-box"
                ref={inputRef}
              />

              <button className="shorten-button" onClick={handleShow}>
                Shorten
              </button>
            </div>
          </form>

          <div className={showResult ? "field" : ""}>
            <div className="result">{input.link}</div>
            <div className="icon">
              <AiOutlineDelete
                onClick={() => removeLink()}
                className="delete-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InputField;
