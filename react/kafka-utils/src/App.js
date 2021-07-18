import React, { Fragment, useState } from 'react';
import swal from 'sweetalert';
import Api from './Api/Api';
import KafkaUtils from './components/kafka/KafkaUtils';
import JoltTransform from './components/JoltTransform/JoltTransform';

import './App.css';

// const slice_size = 100 * 1024;
const APPLICATION = {
  KAFKA_UTILS: 'kafkaUtils',
  EXPORT_LOGS: 'exportLogs',
  FLINK_STATE: 'flinkState',
  JOLT_UTILS: 'joltUtils',
};

function App() {
  const [activeApp, setActiveApp] = useState('');

  const openNav = () => {
    document.getElementById('mySidebar').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  };

  const closeNav = () => {
    document.getElementById('mySidebar').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  };

  const toggleNav = () => {
    console.log(document.getElementById('mySidebar').style.width);
    let w = document.getElementById('mySidebar').style.width;
    if (w && w === '250px') {
      closeNav();
    } else {
      openNav();
    }
  };

  const selectApp = (app) => {
    setActiveApp(app);
    console.log(app);
  };

  return (
    <Fragment>
      <div id="mySidebar" className="sidebar">
        <button onClick={selectApp.bind(null, APPLICATION.KAFKA_UTILS)}>Kafka Utils</button>
        <button onClick={selectApp.bind(null, APPLICATION.FLINK_STATE)}>Flink State</button>
        <button onClick={selectApp.bind(null, APPLICATION.EXPORT_LOGS)}>Export Logs</button>
        <button onClick={selectApp.bind(null, APPLICATION.JOLT_UTILS)}>Jolt Utils</button>
      </div>
      <div id="main">
        <button className="openbtn" onClick={toggleNav}>
          ☰
        </button>
        <KafkaUtils display={activeApp === APPLICATION.KAFKA_UTILS} />
        <JoltTransform display={activeApp === APPLICATION.JOLT_UTILS}/>
      </div>
    </Fragment>
  );
}

export default App;
