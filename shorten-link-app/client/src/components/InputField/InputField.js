import axios from "axios";
import React, { Component, Fragment } from "react";
import validator from "validator";


import "./InputField.scss";

class InputField extends Component {
  state = {
    url: "",
    link: "",
    data: [],
  };

  handleChange = (e) => {
    this.setState({
      url: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const validURL = validator.isURL(this.state.url, {
      require_protocol: true,
    });
    if (!validURL) {
      alert("Ensure the URL is correct");
    } else {
      try {
        const { data } = await axios.post("/links", { url: this.state.url });
        this.setState({ link: `${data.url}` });
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    return (
      <Fragment>
        <div className="main-background">
          <div className="heading-container">
            <h1 className="heading">Shorten your Url</h1>
            <p>Shorten, track every link to boost your brand!</p>
            <form onSubmit={this.handleSubmit} className="form">
              <div className="form-container">
                <input
                  type="text"
                  name="url"
                  placeholder="Enter your url here"
                  onChange={this.handleChange}
                  className="input-box"
                />
                {/* <input type="submit" value="Shorten" /> */}
                <button className="shorten-button">
                  <span>Shorten Link</span>
                </button>
              </div>
              {/* <fieldset className="result-field"> */}
                <span id="result">{this.state.link}</span>
              {/* </fieldset> */}
              {/* <div className="result-wrapper"> */}
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default InputField;
