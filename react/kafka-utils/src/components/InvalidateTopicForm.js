import React, { Fragment, useState, useRef } from 'react';
import swal from 'sweetalert';
import '../App.css';

const InvalidateTopicForm = (props) => {
  const topic = useRef('');

  const [consumerGroupIds, setConsumerGroupIds] = useState(['']);

  const onAddConsumerGroupIdInputHandler = () => {
    setConsumerGroupIds((prevValue) => {
      return [...prevValue, ''];
    });
  };

  const onRemoveConsumerGroupIdHandler = () => {
    if (consumerGroupIds.length > 1) {
      setConsumerGroupIds((prevValue) => {
        const newArr = [...prevValue];
        newArr.splice(-1, 1);
        return newArr;
      });
    }
  };

  const onConsumerGroupIdChangeHandler = (event) => {
    setConsumerGroupIds((prevValue) => {
      const newArr = [...prevValue];
      newArr[event.target.id] = event.target.value;
      return newArr;
    });
  };

  const onSubmitForm = () => {
    let consumerGroupIdsValid = true;
    for (let i = 0; i < consumerGroupIds.length; i++) {
      if (consumerGroupIds[i].trim() === '') {
        consumerGroupIdsValid = false;
        break;
      }
    }
    if (!topic.current.value || topic.current.value.trim() === '') {
      swal('Please set all options', 'Invalid topic', 'error');
    } else if (!consumerGroupIdsValid) {
      swal('Please set all options', 'Group id cannot be empty', 'error');
    } else {
      props.onInvalidate({
        consumerGroupIds: consumerGroupIds,
        topicName: topic.current.value,
      });
    }
  };

  return (
    <div className="form-style-5" id="invalidateTopic">
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
            {/* <input className="generalInput consumerId" type="text" /> */}
          </div>
        </div>
      </fieldset>
      {/* <input type="submit" onclick="invalidateTopic()" value="Apply" /> */}
      <input type="submit" value="Apply" onClick={onSubmitForm} />
    </div>
  );
};

export default InvalidateTopicForm;
