import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://vidly-10b0b.firebaseio.com/',
});

export default instance;
