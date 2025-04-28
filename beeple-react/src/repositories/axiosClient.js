import axios from "axios";
import config from "../config";

const backEndClient = axios.create({
    baseURL: config.backEndBaseUri,
});


export default backEndClient;