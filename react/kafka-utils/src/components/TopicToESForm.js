import React from 'react';
import '../App.css';

const TopicToESForm = (props) => {
  return (
    <div className="form-style-5" id="topicToEs">
      <fieldset>
        <legend>
          <span className="number">1</span> Produce topic to Elastic Search
        </legend>
        <label>Topic Name</label>
        <input list="topicList" id="esTopicName" />
        <label>Elastic Search host</label>
        <input className="generalInput" type="text" id="esHost" />
        <label>Elastic Search port</label>
        <input type="number" id="esPort" value="9200" />
        <label className="time">Use costume index</label>
        <label className="switch">
          <input
            id="indexCheck"
            type="checkbox"
            onclick="toggleEnable('indexCheck','esIndex')"
          />
          <span className="slider round"></span>
        </label>
        <input
          disabled="true"
          className="generalInput"
          type="text"
          id="esIndex"
        />
        <label className="time">From Time</label>
        <label className="switch">
          <input
            id="fromProduceCheck"
            type="checkbox"
            onclick="toggleEnable('fromProduceCheck','fromProduce')"
          />
          <span className="slider round"></span>
        </label>
        <input
          disabled="true"
          data-date-format="yyyy/mm/dd"
          type="datetime-local"
          id="fromProduce"
        />

        <label className="time">To Time</label>
        <label className="switch">
          <input
            id="toProduceCheck"
            type="checkbox"
            onclick="toggleEnable('toProduceCheck','toProduce')"
          />
          <span className="slider round"></span>
        </label>
        <input disabled="true" type="datetime-local" id="toProduce" />
      </fieldset>
      <input type="submit" onclick="esSubmit()" value="Apply" />
    </div>
  );
};

export default TopicToESForm;
