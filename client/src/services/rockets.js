import axios from "axios";

// backend on localhost
// const baseURL = 'http://localhost:3001/api/rockets';
const baseUrl = "/api/rockets";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const toExport = { getAll };

export default toExport;
