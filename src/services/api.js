import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_URL || "http://localhost:5000"}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
