import Axios from "axios";
const axios = Axios.create({
  baseURL: "https://megamanapi-deploy-render.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
