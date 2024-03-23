import { AxiosInstance } from 'axios';
import axios from 'axios';
import {baseURL} from "../constants";

const moviesService: AxiosInstance = axios.create({
    baseURL: baseURL,
});

export { moviesService };
