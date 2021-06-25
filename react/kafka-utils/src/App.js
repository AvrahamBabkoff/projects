import React, { Fragment } from 'react';
import Navbar from './components/Navbar';
import Topics from './components/Topics';
import ConsumeResults from './components/ConsumeResults';
import ConsumeForm from './components/ConsumeForm';
import ConsumeMultipleForm from './components/ConsumeMultipeForm';
import DiffTopicsForm from './components/DiffTopicsForm';
import ProduceForm from './components/ProduceForm';
import ProduceFromFileForm from './components/ProduceFromFileForm';
import CreateTopicForm from './components/CreateTopicForm';
import InvalidateTopicForm from './components/InvalidateTopicForm';
import TopicOffsetForm from './components/TopicOffsetForm';
import TopicToESForm from './components/TopicToESForm';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <h3>Kafka 360°</h3>
      <Topics />
      <div className="center" id="loading">
        <div className="spin-container">
          <div className="lds-hourglass"></div>
        </div>
        <h2 id="spinText"></h2>
      </div>
      <ConsumeResults />
      <datalist className="topicList" id="topicList"></datalist>
      <ConsumeForm />
      <ConsumeMultipleForm />
      <DiffTopicsForm />
      <ProduceForm />
      <ProduceFromFileForm />
      <CreateTopicForm />
      <InvalidateTopicForm />
      <TopicOffsetForm />
      <TopicToESForm />
      <div className="version">
        <label className="versionLabel">Version 1.0.17</label>
      </div>
    </React.Fragment>
  );
}

export default App;
