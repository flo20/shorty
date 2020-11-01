import React, { Component } from "react";
import axios from "axios";

class Demo extends Component {
  state = {
    url: "",
    link: "",
  };

  handleChange = (e) => {
     console.log(e.target.value);
    this.setState({
      url: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/short", {
        url: this.state.url,
      })
      .then((res) => {
        console.log(res.data.hash);
       this.setState({
          link: `http://link-shortener/${res.data.hash}`,
        });
      });
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
            <input type="submit" value="short" />
          </fieldset>

          <fieldset>
            <span id="result">{this.state.link}</span>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Demo;
