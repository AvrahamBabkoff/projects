import React, { Fragment } from 'react';
import '../../App.css';

const MultiInput = (props) => {

  // calback for adding new input
  const onAddInputHandler = () => {
    const newInputs = [...props.inputs, props.defaultInput];
    props.updateInputs(newInputs);
  };

  // callback for removing last input
  const onRemoveInputHandler = () => {
    if (props.inputs.length > 1) {
      const newInputs = [...props.inputs];
      newInputs.splice(-1, 1);
      props.updateInputs(newInputs);
    }
  };

  // callback for updating a groupid input
  const onInputChangeHandler = (event) => {
    const newInputs = [...props.inputs];
    newInputs[event.target.id] = event.target.value;
    props.updateInputs(newInputs);
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
        {props.inputs.map((input, i) => {
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
