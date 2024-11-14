import axios from "axios";
// import { baseURL } from "../constants/Constants ";

const instance=axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
})
export default instance