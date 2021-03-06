import Axios from "axios";
const API_BASE_URL = "https://vacinas-servidor.herokuapp.com/atv1";
let token = localStorage.getItem("token");
const api = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

export default api;
