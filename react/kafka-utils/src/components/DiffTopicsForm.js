import React from 'react';
import '../App.css';

const DiffTopicsForm = (props) => {
  return (
    <div className="form-style-5" id="difTopics">
      <fieldset>
        <legend>
          <span className="number">1</span> Diff Topics
        </legend>
        <label>In Topic Name</label>
        <input list="topicList" id="inTopicName" />
        <label>In Topic Key chain</label>
        <input type="text" className="generalInput" id="inTopicKey" />
        <label>Out Topic Name</label>
        <input list="topicList" id="outTopicName" />
        <label>Out Topic Key chain</label>
        <input type="text" className="generalInput" id="outTopicKey" />
        <label>Regex Filter - Optional</label>
        <input type="text" className="generalInput" id="difRegexFilter" />

        <label className="time">From Time</label>
        <label className="switch">
          <input
            id="fromDiffCheck"
            type="checkbox"
            onclick="toggleEnable('fromDiffCheck','fromDiff')"
          />
          <span className="slider round"></span>
        </label>
        <input
          disabled
          data-date-format="yyyy/mm/dd"
          type="datetime-local"
          id="fromDiff"
        />

        <label className="time">To Time</label>
        <label className="switch">
          <input
            id="toDiffCheck"
            type="checkbox"
            onclick="toggleEnable('toDiffCheck','toDiff')"
          />
          <span className="slider round"></span>
        </label>
        <input
          disabled
          data-date-format="yyyy/mm/dd"
          type="datetime-local"
          id="toDiff"
        />
        <label className="time">Return as file</label>
        <label className="switch">
          <input id="difFile" type="checkbox" />
          <span className="slider round"></span>
        </label>
      </fieldset>
      <input type="submit" onclick="difSubmit()" value="Apply" />
    </div>
  );
};

export default DiffTopicsForm;