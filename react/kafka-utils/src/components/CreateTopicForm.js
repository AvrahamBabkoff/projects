import React, { Fragment, useState, useRef } from 'react';
import BaseForm from './BaseForm';
import swal from 'sweetalert';
import '../App.css';

const CreateTopicForm = (props) => {
  const topicToCreateRef = useRef();
  const maxMessageSizeRef = useRef();
  const numPartitionsRef = useRef();
  const replicationFactorRef = useRef();
  const retentionMsRef = useRef();


  const onSubmitForm = () => {
    const topicName = topicToCreateRef.current.value.trim();
    const maxMassageSize = maxMessageSizeRef.current.value.trim();
    const numPartitions = numPartitionsRef.current.value.trim();
    const replicationFactor = replicationFactorRef.current.value.trim();
    const retentionMs = retentionMsRef.current.value.trim();

    if (
      topicName === '' ||
      maxMassageSize === '' ||
      numPartitions === '' ||
      replicationFactor === '' ||
      retentionMs === ''
    ) {
      swal('Please set all options', 'All options should be set', 'error');
    } else {
      props.onCreateTopic({
        topicName,
        maxMassageSize,
        numPartitions,
        replicationFactor,
        retentionMs,
      });
    }
  };

  return (
    <div className="form-style-5" id="creatTopic">
      <fieldset>
        <legend>
          <span className="number">1</span> Create Topic
        </legend>
        <label>Topic Name</label>
        <input
          className="generalInput"
          id="topicToCreate"
          type="text"
          ref={topicToCreateRef}
        />
        <label>Max Message Type</label>
        <input
          id="maxMessageType"
          type="number"
          defaultValue="1048576"
          ref={maxMessageSizeRef}
        />
        <label>Num Partitions</label>
        <input
          id="numPartitions"
          type="number"
          defaultValue="25"
          ref={numPartitionsRef}
        />
        <label>Replication Factor</label>
        <input
          id="replicationFactor"
          type="number"
          defaultValue="1"
          ref={replicationFactorRef}
        />
        <label>Retention Ms</label>
        <input
          id="retentionMs"
          type="number"
          defaultValue="172800000"
          ref={retentionMsRef}
        />
      </fieldset>
      <input type="submit" onClick={onSubmitForm} value="Apply" />
    </div>
  );
};

export default CreateTopicForm;
