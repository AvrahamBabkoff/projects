import React, { Fragment } from 'react';
import '../App.css';

const TopicOffsetForm = (props) => {
  return (
    <div className="form-style-5" id="offSetTopic">
      <fieldset>
        <legend>
          <span className="number">1</span> Get offset Per groupIds
        </legend>
        <label>Topic Name</label>
        <input list="topicList" id="topicToOffSet" />
        <div className="input_fields_wrap" id="groupIdsOffset">
          <div>
            <label className="time">Consumer group ids</label>
            <button
              className="add_field_button"
              onclick="addInputChild('groupIdsOffset','groupIdsForOffset')"
            >
              Add group id
            </button>
            <button
              className="add_field_button"
              onclick="removeInputChild('groupIdsForOffset')"
            >
              Remove group id
            </button>
          </div>
          <div>
            <input className="generalInput groupIdsForOffset" type="text" />
          </div>
        </div>
      </fieldset>
      <input type="submit" onclick="getTopicOffset()" value="Apply" />
    </div>
  );
};

export default TopicOffsetForm;
