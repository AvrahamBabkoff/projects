import swal from 'sweetalert';

const ResponseType = {
  RESULT: 'result',
  JSON: 'json',
  BLOB: 'blob',
  TEXT: 'text',
};


const postApi = async (responseType, uri, data, action, parameters) => {
  let retVal;
  const params = parameters ? '?' + new URLSearchParams(parameters) : '';
  try {
    const response = await fetch(
      uri + params,
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
      switch (responseType) {
        case ResponseType.RESULT:
          retVal = true;
          break;
        case ResponseType.JSON:
          retVal = await response.json();
          break;
        case ResponseType.BLOB:
          retVal = await response.blob();
          break;
        case ResponseType.TEXT:
          retVal = await response.text();
          break;
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
      'kafka-utils/kafka//topics?' + params
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
  return await postApi(
    ResponseType.RESULT,
    'kafka-utils/kafka/topics/invalidate',
    data,
    'invalidate topic'
  );
};

const createTopic = async (data) => {
  return await postApi(ResponseType.RESULT, 'kafka-utils/kafka/topics', data, 'create topic');
};

const produce = async (data) => {
  return await postApi(ResponseType.RESULT, 'kafka-utils/kafka/produce', data, 'produce message');
};

// currently we send control data as query params, need to make it part of the body
const produceFile = async (parameters, data, multiLine) => {
  const uri = multiLine ? 'multiLineFile/produce' : 'file/produce';
  return await postApi(
    ResponseType.RESULT,
    'kafka-utils/kafka/' + uri,
    data,
    'produce file',
    parameters
  );
};

const consume = async (data, asFile) => {
  const uri = asFile ? 'consume/file' : 'consume';
  const resType = asFile ? ResponseType.BLOB : ResponseType.JSON;
  return await postApi(
    resType,
    'kafka-utils/kafka/' + uri,
    data,
    'consume from topic ' + data.topicName
  );
};

const consumeMultiple = async (data) => {
  return await postApi(
    ResponseType.JSON,
    'kafka-utils/kafka/consume/multiple',
    data,
    'consume from multiple topics ' + data.topicsNames.toString()
  );
};

const produceToEs = async (data) => {
  return await postApi(
    ResponseType.TEXT,
    'kafka-utils/kafka/topics/es',
    data,
    'produce topic ' + data.topicName.toString() + ' to es'
  );
};

const diffTopics = async (data, asFile) => {
  const uri = asFile ? 'diff-topic/file' : 'diff-topic';
  const resType = asFile ? ResponseType.BLOB : ResponseType.JSON;
  return await postApi(
    resType,
    'kafka-utils/kafka/' + uri,
    data,
    'compare topics ' + data.topicNameIn + ' and ' + data.topicNameOut
  );
};


const topicOffsets = async (data) => {
  return await postApi(
    ResponseType.JSON,
    'kafka-utils/kafka/topics/offset',
    data,
    'topic offsets for ' + data.topicName
  );
};

const joltTransform = async (data) => {
  return await postApi(
    ResponseType.JSON,
    'jolt-utils/jolt/transform',
    data,
    'jolt transform'
  );
};


const Api = {
  fetchTopics,
  invalidateTopic,
  createTopic,
  produce,
  produceFile,
  consume,
  consumeMultiple,
  produceToEs,
  diffTopics,
  topicOffsets,
  joltTransform
};

export default Api;
