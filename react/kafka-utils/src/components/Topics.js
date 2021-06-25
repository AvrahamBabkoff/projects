import React, { Fragment, useState } from 'react';
import '../App.css';

const Topics = (props) => {
    const [filter, setFilter] = useState('');


    const filterTable = (event) => {
        console.log('in filterTable!!!!');
        setFilter(event.target.value);
    };

  return (
    <React.Fragment>
      <input
        type="text"
        className="topicNameSearch topicsData"
        id="topicNameSearch"
        onKeyUp={filterTable}
        placeholder="Search for topics.."
      />
      <table className="topics topicsData">
        <thead>
          <tr>
            <th>Topic Name</th>
            <th>Topic Num Partitions</th>
          </tr>
        </thead>
        <tbody id="topics">
          {props.topics.filter(topic => {
              return topic.topicName.toUpperCase().indexOf(filter.toUpperCase()) > -1;
          }).map(topic => {
            return (
              <tr key={topic.topicName}>
                <td>{topic.topicName}</td>
                <td>{topic.numOfPartitions}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Topics;
