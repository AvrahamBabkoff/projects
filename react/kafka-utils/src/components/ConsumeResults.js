import React, { Fragment } from 'react';
import '../App.css';

const ConsumeResults = (props) => {
  return (
      <div className="resultDiv" id="consumerResult">
        <table className="topics topicCounter" id="topicsCounterTable">
          <thead>
            <tr>
              <th id="topicCounterTitle">Topic Name</th>
              <th id="topicCounterDesc"></th>
            </tr>
          </thead>
          <tbody id="topicsCounter"></tbody>
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
