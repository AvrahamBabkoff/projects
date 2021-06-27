import React, { Fragment, useState } from 'react';
import swal from 'sweetalert';
import Api from './Api/Api';
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
  const [spinnerText, setSpinnerText] = useState('');
  const [activeForm, setActiveForm] = useState('');

  const [showSpinner, setShowSpinner] = useState(false);

  const [showConsumerResults, setShowConsumerResults] = useState(false);
  const [topicsList, setTopicsList] = useState([]);
  const [bootstrapServer, setBootstrapServer] = useState('');
  const onSelectFormHandler = (selectedForm) => {
    setActiveForm(selectedForm);
  };

  /*
  const fetchTopicsHandler = async (bootstrapHost, bootstrapPort) => {
    const btstrpsrv = `${bootstrapHost}:${bootstrapPort}`;
    setBootstrapServer(btstrpsrv);
    const params = new URLSearchParams({
      bootstrapServer: btstrpsrv
    });
    // setIsLoading(true);
    // const response = await fetch('http://localhost:3000/kafka/topics?bootstrapServer=kafka-kafka-brokers%3A9092', {
    //   mode: 'no-cors'
    // });
    // const response = await fetch('http://localhost:3000/kafka/topics?bootstrapServer=kafka-kafka-brokers%3A9092');
    const response = await fetch('http://localhost:9876/kafka/topics?' + params);
    console.log(response);
    const dt = await response.json();
    setTopicsList(dt);
  };
*/
  const fetchTopicsHandler = async (bootstrapHost, bootstrapPort) => {
    const btstrpsrv = `${bootstrapHost}:${bootstrapPort}`;
    setBootstrapServer(btstrpsrv);
    const dt = await Api.fetchTopics(btstrpsrv);
    if (dt) {
      setTopicsList(dt);
    }
  };

  const invalidateTopicHandler = async (data) => {
    data.bootStrapServer = bootstrapServer;
    // console.log(data);
    setActiveForm('');
    setSpinnerText('Invalidating topic');
    setShowSpinner(true);
    const res = await Api.invalidateTopic(data);
    // const response = await fetch(
    //   'http://localhost:9876/kafka/topics/invalidate',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   }
    // );
    setShowSpinner(false);
    if(res) {
      swal('Invalidated success', '', 'success');
    }
  };

  return (
    <React.Fragment>
      <Navbar
        onSelect={onSelectFormHandler}
        onFetchTopics={fetchTopicsHandler}
      />
      <h3>Kafka 360°</h3>
      <Topics topics={topicsList} />
      {showSpinner && (
        <div className="center" id="loading">
          <div className="spin-container">
            <div className="lds-hourglass"></div>
          </div>
          <h2 id="spinText">{spinnerText}</h2>
        </div>
      )}
      {showConsumerResults && <ConsumeResults />}
      <datalist className="topicList" id="topicList">
        {topicsList.map((topic) => {
          return <option key={topic.topicName} value={topic.topicName} />;
        })}
      </datalist>
      {activeForm === 'consume' && <ConsumeForm />}
      {activeForm === 'consume_multiple' && <ConsumeMultipleForm />}
      {activeForm === 'diff_topics' && <DiffTopicsForm />}
      {activeForm === 'produce' && <ProduceForm />}
      {activeForm === 'produce_file' && <ProduceFromFileForm />}
      {activeForm === 'create_topic' && <CreateTopicForm />}
      {activeForm === 'invalidate_topic' && (
        <InvalidateTopicForm onInvalidate={invalidateTopicHandler} />
      )}
      {activeForm === 'offset_topics' && <TopicOffsetForm />}
      {activeForm === 'topic_to_es' && <TopicToESForm />}
      <div className="version">
        <label className="versionLabel">Version 1.0.17</label>
      </div>
    </React.Fragment>
  );
}

export default App;
