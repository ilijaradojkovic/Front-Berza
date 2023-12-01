import axios from "axios";

exports.handler = async function(event, context) {
  const { path, queryStringParameters } = event;
  const queryString = new URLSearchParams(queryStringParameters).toString();
  const apiUrl = "http://157.230.107.88:8001/crypto-run";

  try {
    const response = await axios.get(apiUrl);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error calling the API:', error);
    return { 
      statusCode: 500, 
      body: `Server error: ${error.message}` 
    };
  }
};
