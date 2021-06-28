import swal from 'sweetalert';

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
  let retVal = false;
  try {
    const response = await fetch(
      'http://localhost:9876/kafka/topics/invalidate',
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
    await swal('Failed to invalidate topic', e.message, 'error');
  }
  return retVal;
};

const createTopic = async (data) => {
  let retVal = false;
  try {
    const response = await fetch(
      'http://localhost:9876/kafka/topics',
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
    await swal('Failed to create topic', e.message, 'error');
  }
  return retVal;
};

const Api = {
  fetchTopics,
  invalidateTopic,
  createTopic
};

export default Api;
