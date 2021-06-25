import React, { Fragment } from 'react';
import '../App.css';

const CreateTopicForm = (props) => {
  return (
    <div className="form-style-5" id="creatTopic">
      <fieldset>
        <legend>
          <span className="number">1</span> Create Topic
        </legend>
        <label>Topic Name</label>
        <input className="generalInput" id="topicToCreate" type="text" />
        <label>Max Message Type</label>
        <input id="maxMessageType" type="number" value="1048576" />
        <label>Num Partitions</label>
        <input id="numPartitions" type="number" value="25" />
        <label>Replication Factor</label>
        <input id="replicationFactor" type="number" value="1" />
        <label>Retention Ms</label>
        <input id="retentionMs" type="number" value="172800000" />
      </fieldset>
      <input type="submit" onclick="createTopic()" value="Apply" />
    </div>
  );
};

export default CreateTopicForm;
