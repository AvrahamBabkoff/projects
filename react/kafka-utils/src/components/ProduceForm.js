import React, { useRef } from 'react';
import BaseForm from './BaseForm';
import swal from 'sweetalert';
import '../App.css';

const ProduceForm = (props) => {
  const topicNameRef = useRef();
  const stringToProduceRef = useRef();
  const produdeDefaultRef = useRef();
  const produceHexadecimalRef = useRef();

  
  const onSubmitForm = () => {
    const topicName = topicNameRef.current.value.trim();
    const message = stringToProduceRef.current.value.trim();
    const produdeDefault = produdeDefaultRef.current.checked;
    const hexadecimal = produceHexadecimalRef.current.checked;

    if (topicName === '' || message === '') {
      swal('Please set all options', 'All options should be set', 'error');
    } else {
      const data = {
        topicName,
        message,
        produdeDefault,
        hexadecimal,
      };
      props.onProduce(data);
    }
  };
  return (
    <BaseForm
      className="form-style-5"
      id="producer"
      processing={props.processing}
    >
      <fieldset>
        <legend>
          <span className="number">1</span> Produce
        </legend>
        <label>Topic Name</label>
        <input list="topicList" id="producerTopicName" ref={topicNameRef} />
        <textarea
          rows="4"
          cols="50"
          id="producerMessage"
          placeholder="String to produce"
          ref={stringToProduceRef}
        ></textarea>
        <label className="time">use server default producer</label>
        <label className="switch">
          <input id="produceDefault" type="checkbox" ref={produdeDefaultRef} />
          <span className="slider round"></span>
        </label>
        <label className="time toTheRight">produce Hexadecimal</label>
        <label className="switch">
          <input
            id="produceHexadecimal"
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

export default ProduceForm;
