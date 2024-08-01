import { BreakfastDiningOutlined } from "@mui/icons-material"
import axios from "axios"

const SAFE_ROUTES = ['/users/user/auth',]; // Add more safe routes as needed
const BASE_URL = import.meta.env.VITE_BASE_URL_REST +'/api';

const axiosWithInterceptor = axios.create({
    baseURL: BASE_URL, // Replace with your API base URL
});

axiosWithInterceptor.interceptors.request.use(
    (config) => {
        // Check if the URL contains any of the safe routes
        if (SAFE_ROUTES.some(route => config.url.includes(route))) {
            console.log('safe foute ' + config.url)
            return config;
        }
        
        // Get the token from localStorage
        const token = localStorage.getItem('accessToken');
        
        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    
        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);

//======================================================ROUTES======================================================//
export const getHistoryOfGames=(page,size)=>{
    return axiosWithInterceptor.get(`${BASE_URL}/games/history?page=${page}&size=${size}`)
}

export const getAllBetsAPI=(page,size)=>{
    return axiosWithInterceptor.get(`${BASE_URL}/bets/live`,{
        params: {
            size: size,
            page: page
          }
    })
}
export const getMyBetsAPI=(page,size)=>{

    return  axiosWithInterceptor.get(`${BASE_URL}/bets/my-bets`,{
        params: {
            size: size,
            page: page
          }
    })
}

export const getMozzartToken=(submitToken)=>{
    return axiosWithInterceptor.post(`${BASE_URL}/users/user/auth`,submitToken)
}


export const getBetsTopWins=(page,size,topWinsType,groupByType)=>{
    const betHighestType=topWinsType==0?'BY_MULTIPLIER':'BY_AMOUNT'
    let betGroupByType=0;
    switch(groupByType){
        case 0: betGroupByType='DAY'; break;
        case 1: betGroupByType='MONTH'; break;
        case 2: betGroupByType='YEAR'; break;

    }


    return  axiosWithInterceptor.get(`${BASE_URL}/bets/highest`,{
        params: {
            size: size,
            page: page,
            type:betHighestType,
            group_by:betGroupByType,
            

          }
    })
}

export const getUser = () => {
    return axiosWithInterceptor.get(`${BASE_URL}/users/user`);
}
export const getCasinoConfiguration = () => {
    return axiosWithInterceptor.get(`${BASE_URL}/config/casino/constants`);
}

export const getUserData = () => {
    return axiosWithInterceptor.get(`${BASE_URL}/users/user/balance`);
}

export const fetchUser=()=>{
    return axiosWithInterceptor.get(`${BASE_URL}/bets/count/currentGame`)
}

//prebacili na socket
// export const getMessages=()=>{
//     return axios.get(`${BASE_URL}/api/chat`)
// }

export const sendMessage=(message)=>{
    return axiosWithInterceptor.post(`${BASE_URL}/chat/send`,message)
}

export const updateUserPreferences=(userPreferences)=>{
    return axiosWithInterceptor.put(`${BASE_URL}/users/user/update/preferences`,userPreferences)
}
export const updateUserBalance=()=>{
    return axiosWithInterceptor.put(`${BASE_URL}/users/user/update/balance`,null)
}


