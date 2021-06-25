import React, { Fragment } from 'react';
import '../App.css';

const InvalidateTopicForm = (props) => {
  return (
    <div className="form-style-5" id="invalidateTopic">
      <fieldset>
        <legend>
          <span className="number">1</span> Invalidate Topic
        </legend>
        <label>Topic Name</label>
        <input list="topicList" id="topicToInvalidate" />
        <div className="input_fields_wrap" id="groupIds">
          <div>
            <label className="time">Consumer group ids</label>
            <button
              className="add_field_button"
              onclick="addInputChild('groupIds','consumerId')"
            >
              Add group id
            </button>
            <button
              className="add_field_button"
              onclick="removeInputChild('consumerId')"
            >
              Remove group id
            </button>
          </div>
          <div>
            <input className="generalInput consumerId" type="text" />
          </div>
        </div>
      </fieldset>
      {/* <input type="submit" onclick="invalidateTopic()" value="Apply" /> */}
      <input type="submit" value="Apply" />
    </div>
  );
};

export default InvalidateTopicForm;
