import React, { Fragment, useState, useRef } from 'react';
import BaseForm from './BaseForm';
import swal from 'sweetalert';
import '../App.css';

const InvalidateTopicForm = (props) => {
  
  // ref to topic input
  const topic = useRef('');

  // state to hold array of groupid values
  const [consumerGroupIds, setConsumerGroupIds] = useState(['']);

  // calback for adding new groupid input
  const onAddConsumerGroupIdInputHandler = () => {
    setConsumerGroupIds((prevValue) => {
      return [...prevValue, ''];
    });
  };

  // callback for removing last groupid input
  const onRemoveConsumerGroupIdHandler = () => {
    if (consumerGroupIds.length > 1) {
      setConsumerGroupIds((prevValue) => {
        const newArr = [...prevValue];
        newArr.splice(-1, 1);
        return newArr;
      });
    }
  };

  // callback for updating a groupid input
  const onConsumerGroupIdChangeHandler = (event) => {
    setConsumerGroupIds((prevValue) => {
      const newArr = [...prevValue];
      newArr[event.target.id] = event.target.value;
      return newArr;
    });
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
      props.onInvalidate({
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
          <span className="number">1</span> Invalidate Topic
        </legend>
        <label>Topic Name</label>
        <input list="topicList" id="topicToInvalidate" ref={topic} />
        <div className="input_fields_wrap" id="groupIds">
          <div>
            <label className="time">Consumer group ids</label>
            <button
              className="add_field_button"
              onClick={onAddConsumerGroupIdInputHandler}
            >
              Add group id
            </button>
            <button
              className="add_field_button"
              onClick={onRemoveConsumerGroupIdHandler}
            >
              Remove group id
            </button>
          </div>
          <div>
            {consumerGroupIds.map((input, i) => {
              return (
                <input
                  id={i}
                  className="generalInput consumerId"
                  type="text"
                  key={i}
                  defaultValue={input}
                  onChange={onConsumerGroupIdChangeHandler}
                />
              );
            })}
          </div>
        </div>
      </fieldset>
      <input type="submit" value="Apply" onClick={onSubmitForm} />
    </BaseForm>
  );
};

export default InvalidateTopicForm;
