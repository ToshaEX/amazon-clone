import axios from "axios";

const instance = axios.create({
  //THE API (cloud function) URL
  baseURL: //"https://us-central1-challenge-dc070.cloudfunctions.net/api",
  "http://localhost:5001/challenge-dc070/us-central1/api", //the api(Cloud Function) url
});

export default instance;
//http://localhost:5001/challenge-dc070/us-central1/api
