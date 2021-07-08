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
  const [hideForm, setHideForm] = useState(false);

  const [showConsumerResults, setShowConsumerResults] = useState(false);
  const [topicsList, setTopicsList] = useState([]);
  const [bootstrapServer, setBootstrapServer] = useState('');
  const [consumerResults, setConsumerResults] = useState({});
  const onSelectFormHandler = (selectedForm) => {
    setHideForm(false);
    setShowConsumerResults(false);
    setActiveForm(selectedForm);
  };

  const fetchTopics = async (btstrpsrv) => {
    let res = false;
    const dt = await Api.fetchTopics(btstrpsrv);
    if (dt) {
      res = true;
      setTopicsList(dt);
    }
    return res;
  };

  const fetchTopicsHandler = async (bootstrapHost, bootstrapPort) => {
    const btstrpsrv = `${bootstrapHost}:${bootstrapPort}`;
    setBootstrapServer('');
    const res = await fetchTopics(btstrpsrv);
    if (res) {
      setBootstrapServer(btstrpsrv);
    }
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

  const consumeHandler = async (data) => {
    // console.log(data);
    data.bootStrapServer = bootstrapServer;
    const asFile = data.asFile;
    delete data.asFile;
    setSpinnerText('Consuming topic ' + data.topicName);
    setProcessing(true);
    const dt = await Api.consume(data, asFile);
    // console.log(dt);
    if (asFile) {
      const url = window.URL.createObjectURL(new Blob([dt]));
      const link = document.createElement('a');
      link.href = url;
      const filename = 'consume_' + data.topicName + '.json';
      link.setAttribute('download', filename);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    } else {
      dt.topicValueHeader = 'Number Of Messages';
      dt.topicsAggs = {};
      dt.topicsAggs[data.topicName] = dt.numOfMassages;
      setConsumerResults(dt);
    }
    // setActiveForm('');
    setHideForm(true);
    setProcessing(false);
    setShowConsumerResults(true);
  };

  const ConsumeMultipleHandler = async (data) => {
    data.bootStrapServer = bootstrapServer;
    setSpinnerText('Consuming multiple topic ' + data.topicsNames.toString());
    setProcessing(true);
    const dt = await Api.consumeMultiple(data);
    const aggs = {};
    const messages = [];
    const res = {};

    console.log('topics names', data.topicsNames);
    for (let i = 0; i < data.topicsNames.length; ++i) {
      console.log(data.topicsNames[i]);
      aggs[data.topicsNames[i]] = false;
    }
    console.log('aggs 1', aggs);
    dt.forEach((elem) => {
      console.log('elem', elem);
      messages.push(elem.massage);
      aggs[elem.topicName] = true;
    });
    res.topicValueHeader = 'Was message found';
    res.topicsAggs = aggs;
    res.massages = messages;
    setConsumerResults(res);
    setHideForm(true);
    setProcessing(false);
    setShowConsumerResults(true);
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

  const produceToESHandler = async (data) => {
    data.bootStrapServer = bootstrapServer;
    setSpinnerText('Producing topic to es');
    setProcessing(true);
    const res = await Api.produceToEs(data);
    if (res && res.length > 0) {
      swal('Produce to es succeeded', 'New index: ' + res, 'success');
    }
    setProcessing(false);
  };

  const diffTopicsHandler = async (data) => {
    data.bootStrapServer = bootstrapServer;
    const asFile = data.asFile;
    delete data.asFile;
    setSpinnerText(
      'Creating diff between ' + data.topicNameIn + ' and ' + data.topicNameOut
    );
    setProcessing(true);
    const dt = await Api.diffTopics(data, asFile);

    if (dt) {
      // console.log(dt);
      if (asFile) {
        const url = window.URL.createObjectURL(new Blob([dt]));
        const link = document.createElement('a');
        link.href = url;
        const filename =
          'dif_' + data.topicNameIn + '_' + data.topicNameOut + '.json';
        link.setAttribute('download', filename);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      } else {
        const res = {};
        res.topicValueHeader = 'Number Of Messages';
        res.topicsAggs = {};
        res.topicsAggs[data.topicNameIn] = dt.numOfMassagesIn;
        res.topicsAggs[data.topicNameOut] = dt.numOfMassagesOut;
        res.massages = dt.diffList;

        setConsumerResults(res);
        setHideForm(true);
        setProcessing(false);
        setShowConsumerResults(true);
      }
    } else {
      setProcessing(false);
    }
    // setActiveForm('');
  };

  return (
    <Fragment>
      <Navbar
        onSelect={onSelectFormHandler}
        onFetchTopics={fetchTopicsHandler}
        initialized={bootstrapServer && bootstrapServer.length > 0}
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
      {showConsumerResults && <ConsumeResults results={consumerResults} />}
      <datalist className="topicList" id="topicList">
        {topicsList.map((topic) => {
          return <option key={topic.topicName} value={topic.topicName} />;
        })}
      </datalist>
      {activeForm === 'consume' && (
        <ConsumeForm
          onConsume={consumeHandler}
          processing={processing || hideForm}
        />
      )}
      {activeForm === 'consume_multiple' && (
        <ConsumeMultipleForm
          topics={topicsList}
          onConsumeMultiple={ConsumeMultipleHandler}
          processing={processing || hideForm}
        />
      )}
      {activeForm === 'diff_topics' && (
        <DiffTopicsForm
          onDiffTopics={diffTopicsHandler}
          processing={processing || hideForm}
        />
      )}
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
      {activeForm === 'topic_to_es' && (
        <TopicToESForm
          onProduceToEs={produceToESHandler}
          processing={processing}
        />
      )}
      <div className="version">
        <label className="versionLabel">Version 1.0.17</label>
      </div>
    </Fragment>
  );
}

export default App;
