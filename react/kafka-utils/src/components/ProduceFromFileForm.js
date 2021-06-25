import React, { Fragment } from 'react';
import '../App.css';

const ProduceFromFileForm = (props) => {
  return (
    <div className="form-style-5" id="produceFile">
      <fieldset>
        <legend>
          <span className="number">1</span> Produce File
        </legend>
        <label>Topic Name</label>
        <input list="topicList" id="producerFileTopicName" />
        <input className="block" type="file" id="fileToProduce" />
        <label className="time">Multi line file</label>
        <label className="switch">
          <input
            id="multiLine"
            type="checkbox"
            onclick="toggleEnable('multiLine','sleepMS')"
          />
          <span className="slider round"></span>
        </label>
        <input
          disabled
          type="number"
          className="generalInput"
          id="sleepMS"
          placeholder="sleep MS between massages- optional"
        />
        <label className="time">Use server default producer</label>
        <label className="switch">
          <input id="produceFileDefault" type="checkbox" />
          <span className="slider round"></span>
        </label>
        <label className="time">produce as Hexadecimal</label>
        <label className="switch">
          <input id="produceFileAsHexadecimal" type="checkbox" />
          <span className="slider round"></span>
        </label>
      </fieldset>
      <input type="submit" onclick="produceFile()" value="Apply" />
    </div>
  );
};

export default ProduceFromFileForm;
