import React from 'react';
import '../App.css';

const ConsumeResults = (props) => {

  console.log('in ConsumeResults');
  console.log(props.results);
  return (
      <div className="resultDiv" id="consumerResult">
        <table className="topics topicCounter" id="topicsCounterTable">
          <thead>
            <tr>
              <th id="topicCounterTitle">Topic Name</th>
              <th id="topicCounterDesc">Number Of Messages</th>
            </tr>
          </thead>
          <tbody id="topicsCounter">
            <tr>
              <td>{props.results.topicName}</td>
              <td>{props.results.numOfMassages}</td>
            </tr>
          </tbody>

        </table>
        <div className="flexResults">
          <table className="jsonResult" id="consumerResultTable">
            <thead>
              <tr>
                <th className="first" id="resultHead">
                  This changes see "find" const in functions.js
                </th>
              </tr>
            </thead>
            <tbody id="results"></tbody>
          </table>

          <table className="preview">
            <thead>
              <tr>
                <th>
                  Preview <button onclick="copyMessage()">copy message</button>
                </th>
              </tr>
            </thead>
            <tbody id="previewBody">
              <tr>
                <td id="resultsPreview"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default ConsumeResults;
