import React, { Fragment, useState, useRef } from 'react';
import BaseForm from './BaseForm';
import swal from 'sweetalert';
import '../App.css';

const MultiInput = (props) => {
  // state to hold array of groupid values
  const [inputs, setInputs] = useState([props.firstInput]);

  // calback for adding new groupid input
  const onAddInputHandler = () => {
    setInputs((prevValue) => {
      return [...prevValue, props.defaultInput];
    });
  };

  // callback for removing last groupid input
  const onRemoveInputHandler = () => {
    if (inputs.length > 1) {
      setInputs((prevValue) => {
        const newArr = [...prevValue];
        newArr.splice(-1, 1);
        return newArr;
      });
    }
  };

  // callback for updating a groupid input
  const onInputChangeHandler = (event) => {
    inputs((prevValue) => {
      const newArr = [...prevValue];
      newArr[event.target.id] = event.target.value;
      props.updateInputs([...newArr]);
      return newArr;
    });
  };

  return (
    <Fragment>
      <div className="flexButtons">
        <button className="add_field_button" onClick={onAddInputHandler}>
          {props.addButtonText}
        </button>

        <button className="add_field_button" onClick={onRemoveInputHandler}>
          {props.removeButtonText}
        </button>
      </div>
      <div>
        {inputs.map((input, i) => {
          return (
            <input
              id={i}
              className="generalInput consumerRegex"
              type="text"
              key={i}
              defaultValue={input}
              onChange={onInputChangeHandler}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default MultiInput;
