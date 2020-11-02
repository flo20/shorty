import axios from "axios";
import React, { Component } from "react";
import validator from "validator";

class InputField extends Component {
  state = {
    url: "",
    link: "",
  };

  handleChange = (e) => {
    //console.log(e.target.value);
    this.setState({
      url: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const validURL = validator.isURL(this.state.url, {
      require_protocol: true,
    });
    if (!validURL) {
      alert("Ensure the URL is correct");
    } else {
      console.log("URL is: ", this.state.url);

      //post value
        axios
            .post("http://localhost:5000/api/short", {
                url: this.state.url,
            })
            .then((res) => {
                console.log(res.data.hash);
                this.setState({
                    link: `http://shorten/${res.data.hash}`,
                });
            })
            .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <input
              type="text"
              name="url"
              placeholder="Enter url"
              onChange={this.handleChange}
            />
            <input type="submit" value="shorter" />
          </fieldset>
          <fieldset>
            <span id="result">{this.state.link}</span>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default InputField;
