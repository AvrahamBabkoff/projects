import React, { Fragment, useState, useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import Api from '../../Api/Api';
import '../../App.css';

const JoltTransform = (props) => {
  const [result, setResult] = useState('');
  const [jsonInputValid, setJsonInputValid] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [joltSpecValid, setJoltSpecValid] = useState(false);
  const [joltSpec, setJoltSpec] = useState('');
  const jsonInputRef = useRef();
  const joltSpecRef = useRef();

  const isValid = () => {
    const res =
      jsonInputValid &&
      joltSpecValid &&
      jsonInput.length > 0 &&
      joltSpec.length > 0;
    // console.log({
    //   jsonInputValid,
    //   joltSpecValid,
    //   jsonInput,
    //   joltSpec
    // });
    return res;
  };

  const onJsonInputChanged = (value) => {
    setJsonInput(value);
  };

  const onJoltSpecChanged = (value) => {
    setJoltSpec(value);
  };

  const onTransform = async () => {
    const data = {
      input: JSON.parse(jsonInput),
      jolt: JSON.parse(joltSpec),
    };
    console.log(data);
    const res = await Api.joltTransform(data);
    setResult(JSON.stringify(res, undefined, 2));
  };
  const display = !props.display ? { display: 'none' } : {};
  return (
    <div style={display}>
      <div className="jolt-header">
        <h1>Jolt Transform</h1>
        <button disabled={!isValid()} onClick={onTransform}>
          Transform
        </button>
      </div>
      <div className="jolt">
        <div className="jsoncard">
          <h3>JSON Input</h3>
          <AceEditor
            className="jsoncardace"
            mode="json"
            height="93%"
            width="100%"
            wrapEnabled
            ref={jsonInputRef}
            onValidate={(a) =>
              setJsonInputValid(a.every(({ type }) => type !== 'error'))
            }
            onChange={onJsonInputChanged}
          />
        </div>
        <div className="jsoncard">
          <h3>JOLT Spec</h3>
          <AceEditor
            className="jsoncardace"
            mode="json"
            height="93%"
            width="100%"
            wrapEnabled
            ref={joltSpecRef}
            onValidate={(a) =>
              setJoltSpecValid(a.every(({ type }) => type !== 'error'))
            }
            onChange={onJoltSpecChanged}
          />
        </div>
        <div className="jsoncard">
          <h3>Result</h3>
          <AceEditor
            className="jsoncardace"
            mode="json"
            height="93%"
            width="100%"
            wrapEnabled
            readOnly
            value={result}
          />
        </div>
      </div>
    </div>
  );
};

export default JoltTransform;
