import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/challenge-dc070/us-central1/api", //the api(Cloud Function) url
});

export default instance;
//http://localhost:5001/challenge-dc070/us-central1/api