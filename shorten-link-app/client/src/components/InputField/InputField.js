import axios from "axios";
import React, { useState, Fragment, useEffect, useRef } from "react";
import validator from "validator";

import "./InputField.scss";
import { AiOutlineDelete, AiOutlineCopy } from "react-icons/ai";

const InputField = () => {
  const [input, setInput] = useState({
    url: "",
    link: "",
    data: [],
  });
  const [showResult, setShowResult] = useState(false);
  const [showCopy, setShowCopy] = useState("");

  const handleShow = () => setShowResult(!showResult);

  //handling focus cursor
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  //handling copied text
  const textAreaRef = useRef(null);

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setShowCopy("Copied!");
  };

  const onHandle = () => {
    setInput({input:input.link})
  }

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
    setInput({ link: "" }) || setShowCopy("");
  };
  return (
    <Fragment>
      <div className="main-background">
        <div className="heading-container">
          <h1 className="heading">Shorten your Url</h1>
          <p>Shorten every link to boost your brand!</p>
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

          {showResult && (
            <div className="field">
              <div className="icon">
                <AiOutlineCopy onClick={copyToClipboard} />
              </div>

              <input
                name="name"
                type="text"
                value={input.link || ""}
                ref={textAreaRef}
                onChange={onHandle}
              />

              <div className="icon">
                {showCopy}
                <AiOutlineDelete
                  onClick={() => removeLink()}
                  className="delete-icon"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default InputField;
