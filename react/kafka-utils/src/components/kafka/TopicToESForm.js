import React, { useState, useRef } from 'react';
import MultiInput from './MultiInput';
import BaseForm from './BaseForm';
import swal from 'sweetalert';
import '../../App.css';

const TopicToESForm = (props) => {
  const topicNameRef = useRef();
  const esHostRef = useRef();
  const esPortRef = useRef();
  // const useCustomIndexRef = useRef();
  const customIndexNameRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();

  const [inputFieldsDisabled, setInputFieldsDisabled] = useState({
    useCustomIndex: true,
    from: true,
    to: true,
  });

  const toggleEnable = (field, e) => {
    setInputFieldsDisabled((prev) => {
      let newState = { ...prev };
      newState[field] = !e.target.checked;
      return newState;
    });
  };

  const onSubmitForm = () => {
    let cont = true;
    const topicName = topicNameRef.current.value.trim();
    const esHost = esHostRef.current.value.trim();
    const esPort = esPortRef.current.value.trim();
    const customIndexName = customIndexNameRef.current.value.trim();
    const data = {};

    let fromEpoch = 0;
    let toEpoch = 0;

    // was topic selected?
    if (topicName.length === 0) {
      cont = false;
      swal('Please set all options', 'Topic must be set', 'error');
    }

    // was es host enetered?
    if (cont && esHost.length === 0) {
      cont = false;
      swal(
        'Please set all options',
        'Elastic Search host must be set',
        'error'
      );
    }

    // was es port enetered?
    if (cont && (esPort.length === 0 || isNaN(esPort) || +esPort < 0)) {
      cont = false;
      swal(
        'Please set all options',
        'Elastic Search port must be set with a valid port',
        'error'
      );
    }

    // is custom index name valid?

    // are input dates valid?
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
      data.topicName = topicName;
      data.esHost = esHost;
      data.esPort = esPort;
      if (!inputFieldsDisabled.useCustomIndex && customIndexName.length > 0) {
        data.esIndex = customIndexName;
      }
      if (fromEpoch > 0) {
        data.fromTime = fromEpoch;
      }
      if (toEpoch > 0) {
        data.toTime = toEpoch;
      }
      props.onProduceToEs(data);
    }
  };

  return (
    <BaseForm
      className="form-style-5"
      id="topicToEs"
      processing={props.processing}
    >
      <fieldset>
        <legend>
          <span className="number">1</span> Produce topic to Elastic Search
        </legend>
        <label>Topic Name</label>
        <input list="topicList" id="esTopicName" ref={topicNameRef} />
        <label>Elastic Search host</label>
        <input
          className="generalInput"
          type="text"
          id="esHost"
          ref={esHostRef}
        />
        <label>Elastic Search port</label>
        <input type="number" id="esPort" defaultValue="9200" ref={esPortRef} />
        <label className="time">Use costume index</label>
        <label className="switch">
          <input
            id="indexCheck"
            type="checkbox"
            onChange={toggleEnable.bind(null, 'useCustomIndex')}
          />
          <span className="slider round"></span>
        </label>
        <input
          disabled={inputFieldsDisabled.useCustomIndex}
          className="generalInput"
          type="text"
          id="esIndex"
          ref={customIndexNameRef}
        />
        <label className="time">From Time</label>
        <label className="switch">
          <input
            id="fromProduceCheck"
            type="checkbox"
            onChange={toggleEnable.bind(null, 'from')}
          />
          <span className="slider round"></span>
        </label>
        <input
          disabled={inputFieldsDisabled.from}
          data-date-format="yyyy/mm/dd"
          type="datetime-local"
          id="fromProduce"
          ref={fromRef}
        />

        <label className="time">To Time</label>
        <label className="switch">
          <input
            id="toProduceCheck"
            type="checkbox"
            onChange={toggleEnable.bind(null, 'to')}
          />
          <span className="slider round"></span>
        </label>
        <input
          disabled={inputFieldsDisabled.to}
          type="datetime-local"
          id="toProduce"
          ref={toRef}
        />
      </fieldset>
      <input type="submit" onClick={onSubmitForm} value="Apply" />
    </BaseForm>
  );
};

export default TopicToESForm;
