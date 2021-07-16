import React, { Fragment, useState, useRef } from 'react';
import logo from './logo.svg';
import AceEditor from 'react-ace';
// import 'ace-builds/src-noconflict/ace';
// import 'ace-builds/src-noconflict/worker-json';
import 'ace-builds/src-noconflict/mode-json';
import Api from './Api/Api';
import './App.css';

function App() {
  const [result, setResult] = useState('');
  const [jsonInputValid, setJsonInputValid] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [joltSpecValid, setJoltSpecValid] = useState(false);
  const [joltSpec, setJoltSpec] = useState('');
  const jsonInputRef = useRef();
  const joltSpecRef = useRef();

  const isValid = () => {
    const res = jsonInputValid && joltSpecValid && jsonInput.length > 0 && joltSpec.length > 0;
    console.log({
      jsonInputValid,
      joltSpecValid,
      jsonInput,
      joltSpec
    });
    return res;
  };

  const onJsonInputChanged = (value) => {
    setJsonInput(value);
    // setJsonInputValid((old) => {
    //   console.log('onJsonInputChanged old', old);
    //   console.log('onJsonInputChanged length', value.trim().length);
    //   const res = old && value.trim().length > 0;
    //   console.log('onJsonInputChanged setting valid to', res);
    //   return res;
    // });
  };

  // const onValidateJsonInput = (a, b) => {
  //   console.log('onValidateJsonInput a', a);
  //   console.log('onValidateJsonInput b', b);
  //   //console.log('jsonInputRef', jsonInputRef.editor);
  //   //const valid = a.every(({ type }) => type !== 'error') /*&& jsonInputRef.current.editor.getValue().trim().length > 0*/;
  //   //console.log('onValidateJsonInput', valid);
  //   setJsonInputValid(false);

  // };
  const onJoltSpecChanged = (value) => {
    setJoltSpec(value);
    //setJoltSpecValid((old) => old && value.trim().length > 0);
  };

  const onTransform = async () => {
    // console.log(valid);
    // console.log(jsonInputRef.current.editor.getValue());
    // console.log(jsonInputRef.current.editor);
    // setResult(jsonInputRef.current.editor.getValue());
    const data = {
      input: JSON.parse(jsonInput),
      jolt: JSON.parse(joltSpec)
    };
    console.log(data);
    const res = await Api.joltTransform(data);
    setResult(JSON.stringify(res, undefined, 2));
  };
  return (
    <Fragment>
      <div
        style={{ display: 'inline-block', textAlign: 'center', width: '100%' }}
      >
        <h1 style={{ textAlign: 'center' }}>Jolt Transform</h1>
        <button disabled={!isValid()} onClick={onTransform}>
          Transform
        </button>
      </div>
      <div style={{ width: '100%', height: '90vh' }}>
        {/* <div>
          <h1 style={{ textAlign: 'center' }}>Jolt Transform</h1>
        </div> */}
        <div
          style={{ width: '30%', height: '85%', float: 'left', margin: '10px' }}
        >
          <h3 style={{ textAlign: 'center' }}>JSON Input</h3>
          <AceEditor
            mode="json"
            height="93%"
            width="100%"
            wrapEnabled
            style={{ borderStyle: 'solid', borderWidth: 'thin' }}
            ref={jsonInputRef}
            // onValidate={onValidateJsonInput}
            onValidate={(a) =>
              setJsonInputValid(a.every(({ type }) => type !== 'error'))
            }
            onChange={onJsonInputChanged}
          />
        </div>
        <div
          style={{ width: '30%', height: '85%', float: 'left', margin: '10px' }}
        >
          <h3 style={{ textAlign: 'center' }}>JOLT Spec</h3>
          <AceEditor
            mode="json"
            height="93%"
            width="100%"
            wrapEnabled
            style={{ borderStyle: 'solid', borderWidth: 'thin' }}
            ref={joltSpecRef}
            onValidate={(a) =>
              setJoltSpecValid(a.every(({ type }) => type !== 'error'))
            }
            onChange={onJoltSpecChanged}
          />
        </div>
        <div
          style={{ width: '30%', height: '85%', float: 'left', margin: '10px' }}
        >
          <h3 style={{ textAlign: 'center' }}>Transformation Result</h3>
          <AceEditor
            mode="json"
            height="93%"
            width="100%"
            wrapEnabled
            style={{ borderStyle: 'solid', borderWidth: 'thin' }}
            readOnly
            value={result}
          />
        </div>
        {/* <h3>output</h3>
      <AceEditor mode="json" /> */}
      </div>
    </Fragment>
  );
}

export default App;
