import React, { useState, useRef } from 'react';
import BaseForm from './BaseForm';
import swal from 'sweetalert';
import '../App.css';

const DiffTopicsForm = (props) => {
  const inTopicNameRef = useRef();
  const inTopicKeyChainRef = useRef();

  const outTopicNameRef = useRef();
  const outTopicKeyChainRef = useRef();

  const regexFilterRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();
  const returnAsFileRef = useRef();

  const [inputFieldsDisabled, setInputFieldsDisabled] = useState({
    from: true,
    to: true,
  });

  const validateStringNotEmpty = async (param, message) => {
    let res = true;
    if (!param || param.length === 0) {
      res = false;
      await swal('Please set all options', message, 'error');
    }
    return res;
  };

  const toggleEnable = (field, e) => {
    setInputFieldsDisabled((prev) => {
      let newState = { ...prev };
      newState[field] = !e.target.checked;
      return newState;
    });
  };

  const onSubmitForm = async () => {
    let cont = true;
    const inTopicName = inTopicNameRef.current.value.trim();
    const inTopicKeyChain = inTopicKeyChainRef.current.value.trim();
    const outTopicName = outTopicNameRef.current.value.trim();
    const outTopicKeyChain = outTopicKeyChainRef.current.value.trim();
    const regexFilter = regexFilterRef.current.value.trim();

    let fromEpoch = 0;
    let toEpoch = 0;
    if (
      !(await validateStringNotEmpty(inTopicName, 'In Topic Name')) ||
      !(await validateStringNotEmpty(inTopicKeyChain, 'In Topic Key Chain')) ||
      !(await validateStringNotEmpty(outTopicName, 'Out Topic Name')) ||
      !(await validateStringNotEmpty(outTopicKeyChain, 'Out Topic Key Chain'))
    ) {
      cont = false;
    }
    if (cont) {
      if (!inputFieldsDisabled.from && fromRef.current.value.length > 0) {
        const fromDate = new Date(fromRef.current.value);
        fromEpoch = fromDate.getTime();
      }
      if (!inputFieldsDisabled.to && toRef.current.value.length > 0) {
        const toDate = new Date(toRef.current.value);
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
    }
    if (cont) {
      const data = {};
      data.topicNameIn = inTopicName;
      data.keyChainToCompareIn = inTopicKeyChain;
      data.topicNameOut = outTopicName;
      data.keyChainToCompareOut = outTopicKeyChain;
      if (fromEpoch > 0) {
        data.fromTime = fromEpoch;
      }
      if (toEpoch > 0) {
        data.toTime = toEpoch;
      }
      if (regexFilter.length > 0) {
        data.regexFilter = regexFilter;
      }
      data.asFile = returnAsFileRef.current.checked;
      props.onDiffTopics(data);
    }
  };

  return (
    <BaseForm
      className="form-style-5"
      id="difTopics"
      processing={props.processing}
    >
      <fieldset>
        <legend>
          <span className="number">1</span> Diff Topics
        </legend>
        <label>In Topic Name</label>
        <input list="topicList" id="inTopicName" ref={inTopicNameRef} />
        <label>In Topic Key chain</label>
        <input
          type="text"
          className="generalInput"
          id="inTopicKey"
          ref={inTopicKeyChainRef}
        />
        <label>Out Topic Name</label>
        <input list="topicList" id="outTopicName" ref={outTopicNameRef} />
        <label>Out Topic Key chain</label>
        <input
          type="text"
          className="generalInput"
          id="outTopicKey"
          ref={outTopicKeyChainRef}
        />
        <label>Regex Filter - Optional</label>
        <input
          type="text"
          className="generalInput"
          id="difRegexFilter"
          ref={regexFilterRef}
        />

        <label className="time">From Time</label>
        <label className="switch">
          <input
            id="fromDiffCheck"
            type="checkbox"
            onChange={toggleEnable.bind(null, 'from')}
          />
          <span className="slider round"></span>
        </label>
        <input
          disabled={inputFieldsDisabled.from}
          data-date-format="yyyy/mm/dd"
          type="datetime-local"
          id="fromDiff"
          ref={fromRef}
        />

        <label className="time">To Time</label>
        <label className="switch">
          <input
            id="toDiffCheck"
            type="checkbox"
            onChange={toggleEnable.bind(null, 'to')}
          />
          <span className="slider round"></span>
        </label>
        <input
          disabled={inputFieldsDisabled.to}
          data-date-format="yyyy/mm/dd"
          type="datetime-local"
          id="toDiff"
          ref={toRef}
        />
        <label className="time">Return as file</label>
        <label className="switch">
          <input id="difFile" type="checkbox" ref={returnAsFileRef} />
          <span className="slider round"></span>
        </label>
      </fieldset>
      <input type="submit" onClick={onSubmitForm} value="Apply" />
    </BaseForm>
  );
};

export default DiffTopicsForm;
