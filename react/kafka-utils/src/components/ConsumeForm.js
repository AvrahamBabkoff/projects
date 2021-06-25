import React, { Fragment, useState } from 'react';
import '../App.css';

const ConsumeForm = (props) => {
  const [dateFieldsDisabled, setDateFieldsState] = useState({
    from: true,
    to: true,
  });

  const toggleEnable = (field) => {
    console.log(field);
    setDateFieldsState((prev) => {
      let newState = { ...prev };
      newState[field] = !prev[field];
      return newState;
    });
  };
  const bbb = () => {};


  return (
    <div className="form-style-5" id="consume">
      <fieldset>
        <legend>
          <span className="number">1</span> Consume
        </legend>
        <label>Topic Name</label>
        <input list="topicList" id="cTopicName" />
        <label>Max Massages - Optional</label>
        <input type="number" id="cMaxMassages" />

        <label className="time">From Time</label>
        <label className="switch">
          {/* <input
            id="fromConsumerCheck"
            type="checkbox"
            onclick="toggleEnable('fromConsumerCheck','fromConsumer')"
          /> */}

          <input
            id="fromConsumerCheck"
            type="checkbox"
            onChange={toggleEnable.bind(null, 'from')}
          />

          <span className="slider round"></span>
        </label>
        <input
          disabled={dateFieldsDisabled.from}
          data-date-format="yyyy/mm/dd"
          type="datetime-local"
          id="fromConsumer"
        />

        <label className="time">To Time</label>
        <label className="switch">
          {/* <input
            id="toConsumerCheck"
            type="checkbox"
            onclick="toggleEnable('toConsumerCheck','toConsumer')"
          /> */}

          <input
            id="toConsumerCheck"
            type="checkbox"
            onClick={toggleEnable.bind(null, 'to')}
          />

          <span className="slider round"></span>
        </label>
        <input disabled={dateFieldsDisabled.to} type="datetime-local" id="toConsumer" />
        <div className="input_fields_wrap" id="consumerRegexes">
          <div className="flexButtons">
            <label className="time">Regex List - </label>
            <label className="time">Relation:</label>
            <div className="regexRelationSwitch">
              <input
                type="checkbox"
                name="regexRelationSwitch"
                className="regexRelationSwitch-checkbox"
                id="regexRelationSwitch"
                defaultChecked={true}
              />
              <label
                className="regexRelationSwitch-label"
                htmlFor="regexRelationSwitch"
              >
                <span className="regexRelationSwitch-inner"></span>
                <span className="regexRelationSwitch-switch"></span>
              </label>
            </div>
            <label className="time">Escape regexes:</label>
            <label className="switch">
              <input id="escape" type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flexButtons">
            {/* <button
              className="add_field_button"
              onclick="addInputChild('consumerRegexes','consumerRegex')"
            > */}
            <button className="add_field_button" onClick={bbb}>
              Add Regex
            </button>
            {/* <button
              className="add_field_button"
              onclick="removeInputChild('consumerRegex')"
            >
              Remove Regex
            </button> */}

            <button className="add_field_button" onClick={bbb}>
              Remove Regex
            </button>
          </div>
          <div>
            <input
              className="generalInput consumerRegex"
              type="text"
              defaultValue=".*"
            />
          </div>
        </div>
        <label className="time">Return as file</label>
        <label className="switch">
          <input id="file" type="checkbox" />
          <span className="slider round"></span>
        </label>
        <label className="time toTheRight">Present as Hexadecimal</label>
        <label className="switch">
          <input id="hexa" type="checkbox" />
          <span className="slider round"></span>
        </label>
      </fieldset>
      {/* <input type="submit" onclick="consumerSubmit()" value="Apply" /> */}
      <input type="submit" value="Apply" />
    </div>
  );
};

export default ConsumeForm;
