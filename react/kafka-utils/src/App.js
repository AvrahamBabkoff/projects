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

const slice_size = 100 * 1024;


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
  };

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
    // setActiveForm('');
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
    if (data.produceDefault) {
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

  const getNextChunk = async (reader, file, current_position, slice_size) => {
    let result = new Promise((resolve, reject) => {
      const slc = file.slice(
        current_position,
        current_position + slice_size + 1
      );
      reader.onloadend = (event) => {
        if (event.target.readyState !== FileReader.DONE) {
          return;
        }
        resolve(event.target.result.split(',')[1]);
      };
      reader.readAsDataURL(slc);
    });
    return result;
  };

  const produceFileHandler = async (data) => {
    let res;
    setSpinnerText('Producing file');
    setProcessing(true);
    const fileId = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 7);
    let current_position = 0;
    const reader = new FileReader();
    const parameters = {
      topic: data.topicName,
      hexadecimal: data.hexadecimal,
    };
    if (data.produceDefault) {
      parameters.bootStrapServer = bootstrapServer;
    }
    if (data.sleepMS !== undefined) {
      parameters.sleepInMilliseconds = data.sleepMS;
    }
    while (current_position < data.fileToProduce.size) {
      const chunk = await getNextChunk(
        reader,
        data.fileToProduce,
        current_position,
        slice_size
      );

      const body = {
        doneSending: current_position + slice_size >= data.fileToProduce.size,
        fileUID: fileId,
        fileData: chunk,
      };
      res = await Api.produceFile(parameters, body);
      if (res) {
        current_position += slice_size + 1;
      } else {
        break;
      }
    }
    if (res) {
      swal('File produced', '', 'success');
    }
    setProcessing(false);
  };

  return (
    <Fragment>
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
      {activeForm === 'produce' && (
        <ProduceForm onProduce={produceHandler} processing={processing} />
      )}
      {activeForm === 'produce_file' && (
        <ProduceFromFileForm
          onProduceFile={produceFileHandler}
          processing={processing}
        />
      )}
      {activeForm === 'create_topic' && (
        <CreateTopicForm
          onCreateTopic={createTopicHandler}
          processing={processing}
        />
      )}
      {activeForm === 'invalidate_topic' && (
        <InvalidateTopicForm
          onInvalidate={invalidateTopicHandler}
          processing={processing}
        />
      )}
      {activeForm === 'offset_topics' && <TopicOffsetForm />}
      {activeForm === 'topic_to_es' && <TopicToESForm />}
      <div className="version">
        <label className="versionLabel">Version 1.0.17</label>
      </div>
    </Fragment>
  );
}

export default App;
