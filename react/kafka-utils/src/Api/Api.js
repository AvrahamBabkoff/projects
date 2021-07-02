import swal from 'sweetalert';

const ResponseType = {
	RESULT: "result",
	JSON: "json",
	BLOB: "blob"
};

const postApi = async (uri, data, action, parameters) => {
  let retVal = false;
  const params = parameters ? '?' + new URLSearchParams(parameters) : '';
  try {
    const response = await fetch(
      'http://localhost:9876/kafka/' + uri + params,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      retVal = true;
    }
  } catch (e) {
    await swal('Failed to ' + action, e.message, 'error');
  }
  return retVal;

};

const postApiEx = async (responseType, uri, data, action, parameters) => {
  let retVal;
  const params = parameters ? '?' + new URLSearchParams(parameters) : '';
  try {
    const response = await fetch(
      'http://localhost:9876/kafka/' + uri + params,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      switch(responseType) {
        case ResponseType.RESULT:
          retVal = true;
          break;
        case ResponseType.JSON:
          retVal = await response.json();
          break;
        case ResponseType.BLOB:
          retVal = await response.blob();
      }
    }
  } catch (e) {
    await swal('Failed to ' + action, e.message, 'error');
  }
  return retVal;

};


const fetchTopics = async (btstrpsrv) => {
  let dt;
  try {
    const params = new URLSearchParams({
      bootstrapServer: btstrpsrv,
    });
    const response = await fetch(
      'http://localhost:9876/kafka/topics?' + params
    );
    if (!response.ok) {
      throw new Error(response.statusText + '. Check host and port');
    } else {
      dt = await response.json();
    }
  } catch (e) {
    await swal('Failed to get topics', e.message, 'error');
  }
  return dt;
};

const invalidateTopic = async (data) => {
  return await postApiEx(ResponseType.RESULT, 'topics/invalidate', data, 'invalidate topic');
};

const createTopic = async (data) => {
  return await postApiEx(ResponseType.RESULT, 'topics', data, 'create topic');
};

const produce = async (data) => {
  return await postApiEx(ResponseType.RESULT, 'produce', data, 'produce message');
};

// currently we send control data as query params, need to make it part of the body
const produceFile = async (parameters, data, multiLine) => {
  const uri = (multiLine ? 'multiLineFile/produce' : 'file/produce');
  return await postApiEx(ResponseType.RESULT, uri, data, 'produce file', parameters);
};

const consume = async (data, asFile) => {
  const uri = (asFile ? 'consume/file' : 'consume');
  const resType = (asFile ? ResponseType.BLOB : ResponseType.JSON);
  return await postApiEx(resType, uri, data, 'consume from topic ' + data.topicName);
};

const Api = {
  fetchTopics,
  invalidateTopic,
  createTopic,
  produce,
  produceFile,
  consume
};

export default Api;
