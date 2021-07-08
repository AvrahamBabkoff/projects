import React, { useRef } from 'react';
import '../App.css';

const Navbar = (props) => {
  const bootstrapHost = useRef('kafka-kafka-brokers');
  const bootstrapPort = useRef('9092');

  const onSelectForm = (evt) => {
    props.onSelect(evt.target.id);
    // console.log(evt.target.id);
  };

  const onGetTopicsHandler = () => {
    // console.log(bootstrapHost.current.value);
    // console.log(bootstrapPort.current.value);
    props.onFetchTopics(
      bootstrapHost.current.value,
      bootstrapPort.current.value
    );
  };

  return (
    <div className="navbar">
      <div hidden={!props.initialized}>
        <div className="dropdown">
          <button className="dropbtn">
            Consumer
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <button id="consume" className="option" onClick={onSelectForm}>
              Consume
            </button>
            <button
              id="consume_multiple"
              className="option"
              onClick={onSelectForm}
            >
              Consume Multiple
            </button>
            <button id="diff_topics" className="option" onClick={onSelectForm}>
              dif topic
            </button>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            Producer
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <button id="produce" className="option" onClick={onSelectForm}>
              Produce
            </button>
            <button id="produce_file" className="option" onClick={onSelectForm}>
              Produce File
            </button>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            Topics
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <button id="create_topic" className="option" onClick={onSelectForm}>
              Create Topic
            </button>
            <button
              id="invalidate_topic"
              className="option"
              onClick={onSelectForm}
            >
              Invalidate Topic
            </button>
            <button
              id="offset_topics"
              className="option"
              onClick={onSelectForm}
            >
              Get offset Per groupIds
            </button>
            <button id="topic_to_es" className="option" onClick={onSelectForm}>
              Produce topic to ES
            </button>
          </div>
        </div>
      </div>

      <div className="boot">
        <label>host</label>
        <input
          id="bootstrap-host"
          type="text"
          ref={bootstrapHost}
          defaultValue="kafka-kafka-brokers"
        />
        <label>port</label>
        <input
          id="bootstrap-port"
          type="number"
          ref={bootstrapPort}
          defaultValue="9092"
          maxLength="5"
          minLength="4"
        />
        <button onClick={onGetTopicsHandler}> fetch topics</button>
      </div>
    </div>
  );
};

export default Navbar;
