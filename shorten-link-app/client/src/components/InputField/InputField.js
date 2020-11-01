import React, { useState } from "react";
import axios from "axios";



const InputField = () => {
  const [links, setLinks] = useState({
    url: "",
    link: "",
  });

  const handleChange = (e) => {
   // console.log(e.target.value);
    setLinks({
      url: e.target.value,
    });
  };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post("http://localhost:5000/api/short", {
            url: links.url,
          })
          .then((res) => {
            //console.log(res.data.hash);
              setLinks({
                  link:`http://ufol.ink/${res.data.hash}`
              })
          });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="url"
          placeholder="Enter url"
          onChange={handleChange}
        />
        <button>Shorten</button>
        <label>
          <h1>{links.link}</h1>
        </label>
      </form>
    </div>
  );
};

export default InputField;
