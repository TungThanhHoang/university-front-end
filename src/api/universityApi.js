import axios from 'axios';
import { API_URL } from '../constants'
const getUniversity = async () => {
     try {
       return axios.get(`${API_URL}/university`)
        .then( res =>  res.data )
     } catch (error) {
         console.log(error);
     }
}


export default getUniversity;