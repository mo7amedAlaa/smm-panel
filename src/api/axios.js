import axios from "axios";

const API = axios.create({
  baseURL: "https://mandovd.com/api/v2/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
