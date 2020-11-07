import React,{useState} from 'react';

const LinkList = () => {
     const [showLinks, setShowLinks] = useState({
       link: "",
     });
    return (
      <div>
        <span id="result">{showLinks.link}</span>
      </div>
    );
}

export default LinkList;
