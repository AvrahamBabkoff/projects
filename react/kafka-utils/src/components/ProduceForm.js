import React, { Fragment, useRef } from 'react';
import swal from 'sweetalert';
import '../App.css';

const ProduceForm = (props) => {
  const topicNameRef = useRef();
  const stringToProduceRef = useRef();
  const produdeDefaultRef = useRef();
  const produceHexadecimalRef = useRef();

  const display=(props.processing ? {display: 'none'}: {display: 'block'});

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
    <div className="form-style-5" id="producer" style={display}>
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
        <label className="time toTheRight">produce as Hexadecimal</label>
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
    </div>
  );
};

export default ProduceForm;
