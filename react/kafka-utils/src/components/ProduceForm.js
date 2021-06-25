import React, { Fragment } from 'react';
import '../App.css';

const ProduceForm = (props) => {
  return (
    <div className="form-style-5" id="producer">
      <fieldset>
        <legend>
          <span className="number">1</span> Produce
        </legend>
        <label>Topic Name</label>
        <input list="topicList" id="producerTopicName" />
        <textarea
          rows="4"
          cols="50"
          id="producerMessage"
          placeholder="String to produce"
        ></textarea>
        <label className="time">use server default producer</label>
        <label className="switch">
          <input id="produceDefault" type="checkbox" />
          <span className="slider round"></span>
        </label>
        <label className="time toTheRight">produce as Hexadecimal</label>
        <label className="switch">
          <input id="produceHexadecimal" type="checkbox" />
          <span className="slider round"></span>
        </label>
      </fieldset>
      <input type="submit" onclick="produce()" value="Apply" />
    </div>
  );
};

export default ProduceForm;
