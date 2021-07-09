import React, { useState, useRef } from 'react';
import BaseForm from './BaseForm';
import MultiInput from './MultiInput';
import swal from 'sweetalert';
import '../App.css';

const ActionOnTopicForm = (props) => {
  
  // ref to topic input
  const topic = useRef('');

  // state to hold array of groupid values
  const [consumerGroupIds, setConsumerGroupIds] = useState(['']);

  const onUpdateInputs = (inputs) => {
    setConsumerGroupIds(inputs);
  };


  // submit invalidate topic form
  const onSubmitForm = () => {
    // set boolean indicating that all groupids have values
    let consumerGroupIdsValid = true;
    for (let i = 0; i < consumerGroupIds.length; i++) {
      if (consumerGroupIds[i].trim() === '') {
        consumerGroupIdsValid = false;
        break;
      }
    }
    // check that a valid topic name was selected and that all groupids have values
    if (!topic.current.value || topic.current.value.trim() === '') {
      swal('Please set all options', 'Invalid topic', 'error');
    } else if (!consumerGroupIdsValid) {
      swal('Please set all options', 'Group id cannot be empty', 'error');
    } else {
      // call parent
      props.onAction({
        consumerGroupIds: consumerGroupIds,
        topicName: topic.current.value,
      });
    }
  };

  return (
    <BaseForm
      className="form-style-5"
      id="invalidateTopic"
      processing={props.processing}
    >
      <fieldset>
        <legend>
          <span className="number">1</span>{props.title}
        </legend>
        <label>Topic Name</label>
        <input list="topicList" id="topicToInvalidate" ref={topic} />
        <div className="input_fields_wrap" id="groupIds">
        <MultiInput
            inputs={consumerGroupIds}
            defaultInput=""
            addButtonText="Add group id"
            removeButtonText="Remove group id"
            updateInputs={onUpdateInputs}
          />
        </div>
      </fieldset>
      <input type="submit" value="Apply" onClick={onSubmitForm} />
    </BaseForm>
  );
};

export default ActionOnTopicForm;
