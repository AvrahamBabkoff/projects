import React, { useState, useRef } from 'react';
import MultiInput from './MultiInput';
import BaseForm from './BaseForm';
import swal from 'sweetalert';
import '../App.css';

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&'); // $& means the whole matched string
};

const ConsumeForm = (props) => {
  // ref to topic input
  const topicNameRef = useRef();
  const maxMessageseRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();
  const andOrRef = useRef();
  const escapeRegexRef = useRef();
  const hexadecimalRef = useRef();
  const returnAsFileRef = useRef();

  // state to hold array of regexp values
  const [regExps, setRegExps] = useState(['.*']);

  const onUpdateInputs = (inputs) => {
    setRegExps(inputs);
  };

  const [dateFieldsDisabled, setDateFieldsState] = useState({
    from: true,
    to: true,
  });

  const toggleEnable = (field) => {
    console.log(field);
    setDateFieldsState((prev) => {
      let newState = { ...prev };
      newState[field] = !prev[field];
      return newState;
    });
  };

  const onSubmitForm = () => {
    let cont = true;
    const topicName = topicNameRef.current.value.trim();
    const escapeRegex = escapeRegexRef.current.checked;
    let regexList = [];
    const data = {};
    let fromEpoch = 0;
    let toEpoch = 0;

    // was topic selected?
    if (topicName.length === 0) {
      cont = false;
      swal('Please set all options', 'Topic must be set', 'error');
    }

    if (cont) {
      // go over all regexp inputs
      for (let i = 0; i < regExps.length; i++) {
        let value = regExps[i].trim();
        value = escapeRegex ? escapeRegExp(value) : value;
        if (value.length === 0) {
          break;
        } else {
          regexList.push(value);
        }
      }
    }

    // are all regexp inputs with vaues?
    if (cont && regexList.length < regExps.length) {
      cont = false;
      swal('Please set all options', 'Regex cannot be empty', 'error');
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
    }

    if (cont) {
      // collect all inputs and call parent
      data.topicName = topicName;
      data.regexFilters = regexList;
      if (fromEpoch > 0) {
        data.fromTime = fromEpoch;
      }
      if (toEpoch > 0) {
        data.toTime = toEpoch;
      }
      const maxMessagese = maxMessageseRef.current.value.trim();

      if (
        maxMessagese.length > 0 &&
        !isNaN(maxMessagese) &&
        +maxMessagese >= 0
      ) {
        data.maxMessagese = maxMessagese;
      }
      if (!andOrRef.current.checked) {
        data.regexRelations = 'OR';
      }
      data.hexadecimal = hexadecimalRef.current.checked;
      data.asFile = returnAsFileRef.current.checked;
      //console.log(data);
      props.onConsume(data);
    }
  };

  return (
    <BaseForm
      className="form-style-5"
      id="consume"
      processing={props.processing}
    >
      <fieldset>
        <legend>
          <span className="number">1</span> Consume
        </legend>
        <label>Topic Name</label>
        <input list="topicList" id="cTopicName" ref={topicNameRef} />
        <label>Max Massages - Optional</label>
        <input type="number" id="cMaxMassages" ref={maxMessageseRef} />

        <label className="time">From Time</label>
        <label className="switch">
          <input
            id="fromConsumerCheck"
            type="checkbox"
            onChange={toggleEnable.bind(null, 'from')}
          />

          <span className="slider round"></span>
        </label>
        <input
          disabled={dateFieldsDisabled.from}
          data-date-format="yyyy/mm/dd"
          type="datetime-local"
          id="fromConsumer"
          ref={fromRef}
        />

        <label className="time">To Time</label>
        <label className="switch">
          <input
            id="toConsumerCheck"
            type="checkbox"
            onClick={toggleEnable.bind(null, 'to')}
          />

          <span className="slider round"></span>
        </label>
        <input
          disabled={dateFieldsDisabled.to}
          type="datetime-local"
          id="toConsumer"
          ref={toRef}
        />
        <div className="input_fields_wrap" id="consumerRegexes">
          <div className="flexButtons">
            <label className="time">Regex List - </label>
            <label className="time">Relation:</label>
            <div className="regexRelationSwitch">
              <input
                type="checkbox"
                name="regexRelationSwitch"
                className="regexRelationSwitch-checkbox"
                id="regexRelationSwitch"
                defaultChecked={true}
                ref={andOrRef}
              />
              <label
                className="regexRelationSwitch-label"
                htmlFor="regexRelationSwitch"
              >
                <span className="regexRelationSwitch-inner"></span>
                <span className="regexRelationSwitch-switch"></span>
              </label>
            </div>
            <label className="time">Escape regexes:</label>
            <label className="switch">
              <input id="escape" type="checkbox" ref={escapeRegexRef} />
              <span className="slider round"></span>
            </label>
          </div>
          <MultiInput
            inputs={regExps}
            defaultInput=""
            addButtonText="Add Regex"
            removeButtonText="Remove Regex"
            updateInputs={onUpdateInputs}
          />
        </div>
        <label className="time">Return as file</label>
        <label className="switch">
          <input id="file" type="checkbox" ref={returnAsFileRef} />
          <span className="slider round"></span>
        </label>
        <label className="time toTheRight">Present as Hexadecimal</label>
        <label className="switch">
          <input id="hexa" type="checkbox" ref={hexadecimalRef} />
          <span className="slider round"></span>
        </label>
      </fieldset>
      {/* <input type="submit" onclick="consumerSubmit()" value="Apply" /> */}
      <input type="submit" value="Apply" onClick={onSubmitForm} />
    </BaseForm>
  );
};

export default ConsumeForm;
