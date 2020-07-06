import axios from 'axios';
import { BASE_URL } from './urls';


class Server{
    constructor(){

    }

    post(url,body){
        const axios = this.createAxios();
        return axios.post(url,body);
    }

    createAxios(){
        const config = {
            baseURL:BASE_URL,
        }

        return axios.create(config);
    }
}

export default new Server();
