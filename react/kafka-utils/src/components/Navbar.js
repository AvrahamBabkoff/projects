import React, { Fragment } from 'react';
import '../App.css';

const Navbar = (props) => {
  const bbb = (evt) => {
    console.log(evt.target.id);
  };
  const changeForm = (form) => {
    console.log(form);
  };
  return (
    <div className="navbar">
      <div className="dropdown">
        <button className="dropbtn">
          Consumer
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <button id="consume_id" className="option" onClick={bbb}>
            Consume
          </button>
          <button id="consume_multiple" className="option" onClick={bbb}>
            Consume Multiple
          </button>
          <button id="diff_topics" className="option" onClick={bbb}>
            dif topic
          </button>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">
          Producer
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <button id="produce" className="option" onClick={bbb}>
            Produce
          </button>
          <button id = "produce_file" className="option" onClick={bbb}>
            Produce File
          </button>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">
          Topics
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <button id="create_topic" className="option" onClick={bbb}>
            Create Topic
          </button>
          <button id="invalidate_topic" className="option" onClick={bbb}>
            Invalidate Topic
          </button>
          <button id="offset_topics" className="option" onClick={bbb}>
            Get offset Per groupIds
          </button>
          <button id="topic_to_es" className="option" onClick={bbb}>
            Produce topic to ES
          </button>
        </div>
      </div>
      <div className="boot">
        <label>host</label>
        <input id="bootstrap-host" type="text" value="kafka-kafka-brokers" />
        <label>port</label>
        <input
          id="bootstrap-port"
          type="number"
          value="9092"
          maxlength="5"
          minlength="4"
        />
        <button onclick="getTopics()"> fetch topics</button>
      </div>
    </div>
  );
};

export default Navbar;
