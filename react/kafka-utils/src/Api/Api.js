import swal from 'sweetalert';

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
  return await postApi('topics/invalidate', data, 'invalidate topic');
};

const createTopic = async (data) => {
  return await postApi('topics', data, 'create topic');
};

const produce = async (data) => {
  return await postApi('produce', data, 'produce message');
};

// currently we send control data as query params, need to make it part of the body
const produceFile = async (parameters, data, multiLine) => {
  const uri = (multiLine ? 'multiLineFile/produce' : 'file/produce');
  return await postApi(uri, data, 'produce file', parameters);
};

const Api = {
  fetchTopics,
  invalidateTopic,
  createTopic,
  produce,
  produceFile
};

export default Api;
