import axios from "axios";
import React, { Component } from "react";
import validator from "validator";

class InputField extends Component {
  state = {
    url: "",
    link: "",
    data: [],
  };

  async componentDidMount() {
    try {
      const { data } = await axios("/links");
      // this.setState({data})
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = (e) => {
    //console.log(e.target.value);
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
      console.log("URL is: ", this.state.url);

      try {
        const { data } = await axios.post("/links", { url: this.state.url });
        this.setState({ link: `http://shorten/${data.uniqId}` });
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    const { data } = this.state;
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

        {data.map((d, index) => (
          <li key={index}>{d.url}</li>
        ))}
      </div>
    );
  }
}

export default InputField;
