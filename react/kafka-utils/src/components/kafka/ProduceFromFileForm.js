import React, { useState, useRef } from 'react';
import BaseForm from './BaseForm';
import swal from 'sweetalert';
import '../../App.css';

const ProduceFromFileForm = (props) => {
  const topicNameRef = useRef();
  const produceDefaultRef = useRef();
  const produceHexadecimalRef = useRef();
  const fileToProduceRef = useRef();
  const sleepMSeRef = useRef();

  const [multiLine, setMultiline] = useState(false);

  const toggleMultiline = () => {
    setMultiline((prev) => !prev);
  };

  const onSubmitForm = () => {
    const topicName = topicNameRef.current.value.trim();
    const produceDefault = produceDefaultRef.current.checked;
    const hexadecimal = produceHexadecimalRef.current.checked;
    const fileToProduce = fileToProduceRef.current.files[0];
    const sleepMS = sleepMSeRef.current.value;


    if (topicName === '' || !fileToProduce) {
      swal('Please set all options', 'All options should be set', 'error');
    } else {
      const data = {
        topicName,
        fileToProduce,
        hexadecimal,
        produceDefault,
        multiLine
      };
      if(multiLine && sleepMS.length > 0 && !isNaN(sleepMS) && +sleepMS >=0) {
        data.sleepMS = +sleepMS;
      } 
      props.onProduceFile(data);
    }
  };

  return (
    <BaseForm
      className="form-style-5"
      id="produceFile"
      processing={props.processing}
    >
      <fieldset>
        <legend>
          <span className="number">1</span> Produce File
        </legend>
        <label>Topic Name</label>
        <input list="topicList" id="producerFileTopicName" ref={topicNameRef} />
        <input
          className="block"
          type="file"
          id="fileToProduce"
          ref={fileToProduceRef}
        />
        <label className="time">Multi line file</label>
        <label className="switch">
          <input id="multiLine" type="checkbox" onChange={toggleMultiline} />
          <span className="slider round"></span>
        </label>
        <input
          disabled={!multiLine}
          type="number"
          min="0"
          className="generalInput"
          id="sleepMS"
          placeholder="sleep MS between massages- optional"
          ref={sleepMSeRef}
        />
        <label className="time">Use server default producer</label>
        <label className="switch">
          <input
            id="produceFileDefault"
            type="checkbox"
            ref={produceDefaultRef}
          />
          <span className="slider round"></span>
        </label>
        <label className="time">produce as Hexadecimal</label>
        <label className="switch">
          <input
            id="produceFileAsHexadecimal"
            type="checkbox"
            ref={produceHexadecimalRef}
          />
          <span className="slider round"></span>
        </label>
      </fieldset>
      <input type="submit" onClick={onSubmitForm} value="Apply" />
    </BaseForm>
  );
};

export default ProduceFromFileForm;
