import axios from "axios"

const api = axios.create({

  baseURL: 'https://piai-back.vercel.app/',
  //baseURL: 'http://localhost:4000/',
   timeout: 60000,
});



export default api;