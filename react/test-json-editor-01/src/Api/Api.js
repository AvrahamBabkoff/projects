import swal from 'sweetalert';

const ResponseType = {
  RESULT: 'result',
  JSON: 'json',
  BLOB: 'blob',
  TEXT: 'text',
};

// const postApi = async (uri, data, action, parameters) => {
//   let retVal = false;
//   const params = parameters ? '?' + new URLSearchParams(parameters) : '';
//   try {
//     const response = await fetch(
//       'http://localhost:9876/kafka/' + uri + params,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       }
//     );
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     } else {
//       retVal = true;
//     }
//   } catch (e) {
//     await swal('Failed to ' + action, e.message, 'error');
//   }
//   return retVal;

// };

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





const joltTransform = async (data) => {
  return await postApi(
    ResponseType.JSON,
    'jolt-utils/jolt/transform',
    data,
    'jolt transform'
  );
};





const Api = {
  joltTransform  
};

export default Api;
