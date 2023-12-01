export async function handler(event, context) {
  const apiUrl = "http://157.230.107.88:8001/crypto-run";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
}
