import axios from "axios"
//use axios and make instance and call whenever needed
const API=axios.create({
    baseURL:'http://localhost:3000/',
    headers:{
        'Content-Type': 'application/json', 
        'Accept':'application/json',  
    }
})


//use this api if the token is needed
const APIAuthenticated = axios.create({
    baseURL : 'http://localhost:3000/',
    headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `${localStorage.getItem('token')}`  
    }
})


export {API, APIAuthenticated}