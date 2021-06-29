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

  const [processing, setProcessing] = useState(false);

  const [showConsumerResults, setShowConsumerResults] = useState(false);
  const [topicsList, setTopicsList] = useState([]);
  const [bootstrapServer, setBootstrapServer] = useState('');
  const onSelectFormHandler = (selectedForm) => {
    setActiveForm(selectedForm);
  };

  const fetchTopics = async (btstrpsrv) => {
    const dt = await Api.fetchTopics(btstrpsrv);
    if (dt) {
      setTopicsList(dt);
    }

  }

  const fetchTopicsHandler = async (bootstrapHost, bootstrapPort) => {
    const btstrpsrv = `${bootstrapHost}:${bootstrapPort}`;
    setBootstrapServer(btstrpsrv);

    await fetchTopics(btstrpsrv);
  };

  const invalidateTopicHandler = async (data) => {
    data.bootStrapServer = bootstrapServer;
    setSpinnerText('Invalidating topic');
    setProcessing(true);
    const res = await Api.invalidateTopic(data);
    //const res = await Api.postApi('topics/invalidate', data, 'invalidate topic');
    if (res) {
      await fetchTopics(bootstrapServer);
      swal('Invalidated success', '', 'success');
    }
    setProcessing(false);
  };

  const createTopicHandler = async (data) => {
    data.bootStrapServer = bootstrapServer;
    setActiveForm('');
    setSpinnerText('Creating topic');
    setProcessing(true);
    const res = await Api.createTopic(data);
    //const res = await Api.postApi('topics', data, 'create topic');
    if (res) {
      await fetchTopics(bootstrapServer);
      swal('Topic created', '', 'success');
    }
    setProcessing(false);
  };

  

  const produceHandler = async (data) => {
    if(data.produceDefault) {
      data.bootStrapServer = bootstrapServer;
    }
    delete data.produceDefault;

    setSpinnerText('Producing msg');
    setProcessing(true);
    //const res = await Api.postApi('produce', data, 'produce message');
    const res = await Api.produce(data);
    if (res) {
      swal('Message produced', '', 'success');
    }
    setProcessing(false);
  };

  return (
    <React.Fragment>
      <Navbar
        onSelect={onSelectFormHandler}
        onFetchTopics={fetchTopicsHandler}
      />
      <h3>Kafka 360°</h3>
      <Topics topics={topicsList} />
      {processing && (
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
      {activeForm === 'produce' && <ProduceForm onProduce={produceHandler} processing={processing}/>}
      {activeForm === 'produce_file' && <ProduceFromFileForm />}
      {activeForm === 'create_topic' && (
        <CreateTopicForm onCreateTopic={createTopicHandler} />
      )}
      {activeForm === 'invalidate_topic' && (
        <InvalidateTopicForm onInvalidate={invalidateTopicHandler} processing={processing}/>
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
