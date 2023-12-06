import Axios from "axios";
const axios = Axios.create({
  baseURL: "https://megamanapi-deploy-render.onrender.com",
});

export default axios;
