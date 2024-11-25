async function fetchApiData() {
  try {
    let response = await fetch(process.env.API_URL);
    if (!response.ok) {
      throw new Error(`error status: ${response.status}`);
    }
    data = await response.json();
    data.timestamp = Math.floor(Date.now() / 1000);
  } catch (error) {
    console.error("Fetch failed:", error.message);
    data = undefined;
  }
  return data
}
module.exports = {
    fetchApiData
}