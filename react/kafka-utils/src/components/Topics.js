import React, { Fragment } from 'react';
import '../App.css';

const Topics = (props) => {
  return (
    <React.Fragment>
      <input
        type="text"
        className="topicNameSearch topicsData"
        id="topicNameSearch"
        onkeyup="filterTable(this,'topics')"
        placeholder="Search for topics.."
      />
      <table className="topics topicsData">
        <thead>
          <tr>
            <th>Topic Name</th>
            <th>Topic Num Partitions</th>
          </tr>
        </thead>
        <tbody id="topics"></tbody>
      </table>
    </React.Fragment>
  );
};

export default Topics;
