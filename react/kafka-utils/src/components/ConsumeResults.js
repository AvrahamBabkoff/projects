import React, { useState } from 'react';
import swal from 'sweetalert';
import '../App.css';

const ConsumeResults = (props) => {
  const [filter, setFilter] = useState('');

  const [sortOrder, setSortOrder] = useState(1);

  const [previewRow, setPreviewRow] = useState(0);

  const filterTable = (event) => {
    console.log('in filterTable!!!!');
    setFilter(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => -1 * prev);
  };

  const onPreview = (row) => {
    console.log(`clicked row ${row}`);
    setPreviewRow(row);
  };

  const sortMessages = (m1, m2) => {
    const d1 = new Date(m1.message.time.slice(0, -4));
    const d2 = new Date(m2.message.time.slice(0, -4));

    return sortOrder * (d1.getTime() - d2.getTime());
  };

  const copyMessage = () => {
    if (props.results.massages.length > 0) {
      const copyText = JSON.stringify(
        props.results.massages[previewRow].message
      );
      const el = document.createElement('textarea');
      el.value = copyText;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      swal('Massage copied to Clipboard', '', 'info');
    }
  };

  const topicsAggs = [];

  for (const topicName in props.results.topicsAggs) {
    topicsAggs.push(
      <tr key={topicName}>
        <td>{topicName}</td>
        <td>{props.results.topicsAggs[topicName].toString()}</td>
      </tr>
    );
  }

  const messagesToDisplay = props.results.massages
    .map((message, i) => {
      return {
        message,
        formattedmessage: JSON.stringify(message.message),
        key: i,
      };
    })
    .filter((message) => {
      return (
        message.formattedmessage.toUpperCase().indexOf(filter.toUpperCase()) >
        -1
      );
    })
    .sort(sortMessages)
    .map((message) => {
      return (
        <tr key={message.key}>
          <td>{message.message.time}</td>
          <td onClick={onPreview.bind(null, message.key)}>
            {message.formattedmessage}
          </td>
        </tr>
      );
    });

  return (
    <div className="resultDiv" id="consumerResult">
      <table className="topics topicCounter" id="topicsCounterTable">
        <thead>
          <tr>
            <th id="topicCounterTitle">Topic Name</th>
            <th id="topicCounterDesc">{props.results.topicValueHeader}</th>
          </tr>
        </thead>
        <tbody id="topicsCounter">{topicsAggs}</tbody>
      </table>
      <div className="flexResults">
        <table className="jsonResult" id="consumerResultTable">
          <thead>
            <tr>
              <th className="first">
                Time<button onClick={toggleSortOrder}>⇑/⇓</button>
              </th>
              <th className="first">
                Messages
                <input
                  type="text"
                  id="messageFilter"
                  onChange={filterTable}
                  placeholder="Filter messages..."
                ></input>
              </th>
            </tr>
          </thead>
          <tbody id="results">{messagesToDisplay}</tbody>
        </table>

        <table className="preview">
          <thead>
            <tr>
              <th>
                Preview <button onClick={copyMessage}>copy message</button>
              </th>
            </tr>
          </thead>
          <tbody id="previewBody">
            <tr>
              <td id="resultsPreview">
                {props.results.massages.length > 0 &&
                  JSON.stringify(
                    props.results.massages[previewRow].message,
                    undefined,
                    4
                  )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsumeResults;
