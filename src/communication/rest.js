import { BreakfastDiningOutlined } from "@mui/icons-material"
import axios from "axios"

const BASE_URL='http://localhost:8001/api'

export const getHistoryOfGames=(page,size)=>{
 
    return axios.get(`${BASE_URL}/games/history?page=${page}&size=${size}`)

}

export const getAllBetsAPI=(page,size)=>{
    // return axios.get(`${BASE_URL}/bets/live`,{
    //     params: {
    //         size: size,
    //         page: page
    //       }
    // })
}
export const getMyBetsAPI=(page,size)=>{
    const authToken = localStorage.getItem('accessToken');

    return  axios.get(`${BASE_URL}/bets/my-bets`,{
        params: {
            size: size,
            page: page
          },
          headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
}

export const getMozzartToken=(submitToken)=>{
    return axios.post(`${BASE_URL}/users/user/auth`,submitToken)
}


export const getBetsTopWins=(page,size,topWinsType,groupByType,email)=>{
    const betHighestType=topWinsType==0?'BY_MULTIPLIER':'BY_AMOUNT'
    let betGroupByType=0;
    switch(groupByType){
        case 0: betGroupByType='DAY'; break;
        case 1: betGroupByType='MONTH'; break;
        case 2: betGroupByType='YEAR'; break;

    }


    return  axios.get(`${BASE_URL}/bets/highest`,{
        params: {
            size: size,
            page: page,
            type:betHighestType,
            group_by:betGroupByType,
            email:email

          }
    })
}

export const getUser = () => {
    const authToken = localStorage.getItem('accessToken');
    if(!authToken) return
    return axios.get(`${BASE_URL}/users/user`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
}
export const getCasinoConfiguration = () => {
    const authToken = localStorage.getItem('accessToken');
    if(!authToken) return
    return axios.get(`${BASE_URL}/config/casino/constants`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
}

export const getUserData = () => {
    const authToken = localStorage.getItem('accessToken');
    return axios.get(`${BASE_URL}/users/user/balance`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
}

export const fetchUser=()=>{
    return axios.get(`${BASE_URL}/bets/count/currentGame`)
}

//prebacili na socket
// export const getMessages=()=>{
//     return axios.get(`${BASE_URL}/api/chat`)
// }

export const sendMessage=(message)=>{
    return axios.post(`${BASE_URL}/chat/send`,message)
}