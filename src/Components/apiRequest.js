import axios from "axios";

const apiRequest = async (method, url, data = null) => {
  try {
    const config = {
      method: method,
      url: url,
    };
    if (method !== "GET" && data) {
      config.data = data;
    }
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Api Request Error!", error);
    throw error;
  }
};
export default apiRequest;
