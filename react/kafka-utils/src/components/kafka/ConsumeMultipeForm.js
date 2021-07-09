import React, { useState, useRef } from 'react';
import BaseForm from './BaseForm';
import swal from 'sweetalert';
import '../../App.css';

const ConsumeMultipleForm = (props) => {
  const topicNamesRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();
  const messageIdRef = useRef();
  const timeoutRef = useRef();

  const [dateFieldsDisabled, setDateFieldsState] = useState({
    from: true,
    to: true,
  });

  const toggleEnable = (field) => {
    setDateFieldsState((prev) => {
      let newState = { ...prev };
      newState[field] = !prev[field];
      return newState;
    });
  };

  const getTopicName = () => {
    const res = [];
    for(let opt of topicNamesRef.current.selectedOptions) {
      res.push(opt.value);
    }
    return res;
  };

  const onSubmitForm = () => {
    let cont = true;
    const topicNames = getTopicName();
    const messageId = messageIdRef.current.value.trim();
    const timeout = timeoutRef.current.value.trim();
    // const escapeRegex = escapeRegexRef.current.checked;
    // let regexList = [];
    const data = {};
    let fromEpoch = 0;
    let toEpoch = 0;

    // topicNames.forEach(topic=>{
    //   console.log(topic);
    // });
    if(timeout.length > 0 && (isNaN(timeout) || +timeout < 0)) {
      cont = false;
      swal('Please set all options', 'Illegal value for Time out', 'error');
    } 

    // was topic selected?
    if (cont &&topicNames.length === 0) {
      cont = false;
      swal('Please set all options', 'At least one topic must be selected', 'error');
    }

    // was message id set?
    if(cont && messageId.length === 0) {
      cont = false;
      swal('Please set all options', 'Message Id cannot be empty', 'error');
    }
    // are input dates valid?
    if (cont) {
      if (!dateFieldsDisabled.from && fromRef.current.value.length > 0) {
        let fromDate = new Date(fromRef.current.value);
        fromEpoch = fromDate.getTime();
      }
      if (!dateFieldsDisabled.to && toRef.current.value.length > 0) {
        let toDate = new Date(toRef.current.value);
        toEpoch = toDate.getTime();
      }
      if (fromEpoch > 0 && toEpoch > 0 && toEpoch < fromEpoch) {
        cont = false;
        swal(
          'Please set all options',
          'To Time must be greater than From Time',
          'error'
        );
      }
      if(cont) {
        data.messageId = messageId;
        if(timeout.length > 0) {
          data.timeoutMinutes = timeout;
        }
        data.messageId = messageId;
        data.topicsNames = topicNames;
        if (fromEpoch > 0) {
          data.fromTime = fromEpoch;
        }
        if (toEpoch > 0) {
          data.toTime = toEpoch;
        }
  
        props.onConsumeMultiple(data);
      }
    }


  };
  return (
    <BaseForm className="form-style-5" id="multipleConsume" processing={props.processing}>
      <fieldset>
        <legend>
          <span className="number">1</span> Consume from multiple topics
        </legend>
        <label>Topics Names</label>
        <select
          className="selectPicker"
          id="selectMTopics"
          multiple
          ref={topicNamesRef}
        >
          {props.topics.map((topic, i) => (
            <option key={i}>{topic.topicName}</option>
          ))}
        </select>
        <label className="time">From Time</label>
        <label className="switch">
          <input
            id="mFromConsumerCheck"
            type="checkbox"
            onChange={toggleEnable.bind(null, 'from')}
          />
          <span className="slider round"></span>
        </label>
        <input
          disabled={dateFieldsDisabled.from}
          data-date-format="yyyy/mm/dd"
          type="datetime-local"
          id="mFromConsumer"
          ref={fromRef}
        />
        <label className="time">To Time</label>
        <label className="switch">
          <input
            id="mToConsumerCheck"
            type="checkbox"
            onClick={toggleEnable.bind(null, 'to')}
          />
          <span className="slider round"></span>
        </label>
        <input
          disabled={dateFieldsDisabled.to}
          data-date-format="yyyy/mm/dd"
          type="datetime-local"
          id="mToConsumer"
          ref={toRef}
        />
        <label className="time">Message Id</label>
        <div>
          <input
            id="messageId"
            className="generalInput regexInput"
            type="text"
            ref={messageIdRef}
          />
        </div>
        <label>Time out in minuets - Optional</label>
        <input type="number" id="mCTimeOut" ref={timeoutRef}/>
      </fieldset>
      <input type="submit" onClick={onSubmitForm} value="Apply" />
    </BaseForm>
  );
};

export default ConsumeMultipleForm;
