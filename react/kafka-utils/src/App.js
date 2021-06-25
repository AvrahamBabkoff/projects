import React, { Fragment, useState } from 'react';
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
  const [activeForm, setActiveForm] = useState('');

  const [showSpinner, setShowSpinner] = useState(false);

  const [showConsumerResults, setShowConsumerResults] = useState(false);
  const [topicsList, setTopicsList] = useState([]);

  const onSelectFormHandler = (selectedForm) => {
    setActiveForm(selectedForm);
  };

  const fetchTopicsHandler = async (bootstrapHost, bootstrapPort) => {

    const params = new URLSearchParams({
      bootstrapServer: `${bootstrapHost}:${bootstrapPort}`
    });
    // setIsLoading(true);
    // const response = await fetch('http://localhost:3000/kafka/topics?bootstrapServer=kafka-kafka-brokers%3A9092', {
    //   mode: 'no-cors'
    // });
    // const response = await fetch('http://localhost:3000/kafka/topics?bootstrapServer=kafka-kafka-brokers%3A9092');
    const response = await fetch('http://localhost:3000/kafka/topics?' + params);
    console.log(response);
    const dt = await response.json();
    setTopicsList(dt);
  };




  return (
    <React.Fragment>
      <Navbar onSelect={onSelectFormHandler} onFetchTopics={fetchTopicsHandler}/>
      <h3>Kafka 360°</h3>
      <Topics topics={topicsList}/>
      {showSpinner && <div className="center" id="loading">
        <div className="spin-container">
          <div className="lds-hourglass"></div>
        </div>
        <h2 id="spinText"></h2>
      </div>}
      {showConsumerResults && <ConsumeResults />}
      <datalist className="topicList" id="topicList">
        {topicsList.map(topic=>{
          return <option key={topic.topicName} value={topic.topicName} />
        })}
      </datalist>
      {activeForm === 'consume' && <ConsumeForm />}
      {activeForm === 'consume_multiple' && <ConsumeMultipleForm />}
      {activeForm === 'diff_topics' && <DiffTopicsForm />}
      {activeForm === 'produce' && <ProduceForm />}
      {activeForm === 'produce_file' && <ProduceFromFileForm />}
      {activeForm === 'create_topic' && <CreateTopicForm />}
      {activeForm === 'invalidate_topic' && <InvalidateTopicForm />}
      {activeForm === 'offset_topics' && <TopicOffsetForm />}
      {activeForm === 'topic_to_es' && <TopicToESForm />}
      <div className="version">
        <label className="versionLabel">Version 1.0.17</label>
      </div>
    </React.Fragment>
  );
}

export default App;
