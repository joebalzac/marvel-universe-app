import axios from "axios";

const apiKey = "26715120c25a3d3ee06ceeb986a5aba7";

const apiClient = axios.create({
  baseUrl: "/api",
  params: {
    apiKey,
  },
});

export default apiClient;
