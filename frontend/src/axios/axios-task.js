/*
    This is global settings of axios-task
    Handle with care as one setting change can broke the entire running app.

*/

import axios from 'axios'

const instance = axios.create({
    baseURL : 'http://127.0.0.1:8080',
    // baseURL : 'http://34.201.145.105:8080',
    withCredentials:true,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
})

export const setHeader = () => {
    const auth_token = localStorage.getItem('token')
    axios.defaults.headers.common['token'] = auth_token;
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
}



export default instance
