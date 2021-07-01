import React from 'react';
import '../App.css';

const ConsumeMultipleForm = (props) => {
  return (
    <div className="form-style-5" id="multipleConsume">
      <fieldset>
        <legend>
          <span className="number">1</span> Consume from multiple topics
        </legend>
        <label>Topics Names</label>
        <select className="selectPicker" id="selectMTopics" multiple></select>
        <label className="time">From Time</label>
        <label className="switch">
          <input
            id="mFromConsumerCheck"
            type="checkbox"
            onclick="toggleEnable('mFromConsumerCheck','mFromConsumer')"
          />
          <span className="slider round"></span>
        </label>
        <input
          disabled="true"
          data-date-format="yyyy/mm/dd"
          type="datetime-local"
          id="mFromConsumer"
        />
        <label className="time">To Time</label>
        <label className="switch">
          <input
            id="mToConsumerCheck"
            type="checkbox"
            onclick="toggleEnable('mToConsumerCheck','mToConsumer')"
          />
          <span className="slider round"></span>
        </label>
        <input
          disabled="true"
          data-date-format="yyyy/mm/dd"
          type="datetime-local"
          id="mToConsumer"
        />
        <label className="time">Message Id</label>
        <div>
          <input
            id="messageId"
            className="generalInput regexInput"
            type="text"
          />
        </div>
        <label>Time out in minuets - Optional</label>
        <input type="number" id="mCTimeOut" />
      </fieldset>
      <input type="submit" onclick="mConsumerSubmit()" value="Apply" />
    </div>
  );
};

export default ConsumeMultipleForm;