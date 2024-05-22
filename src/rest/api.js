import axios from "axios"

export const getHistoryOfGames=(page,size)=>{
 
    return axios.get(`http://localhost:8000/api/games/history?page=${page}&size=${size}`)

}

export const getAllBetsAPI=(page,size)=>{
    return axios.get('http://localhost:8000/api/bets/current',{
        params: {
            size: size,
            page: page
          }
    })
}
export const getMyBetsAPI=(page,size)=>{
    return  axios.get('http://localhost:8000/api/bets/my-bets',{
        params: {
            size: size,
            page: page
          }
    })
}

export const getBetsTopWins=(page,size,type)=>{
    const betHighestType=type==0?'BY_MULTIPLIER':'BY_AMOUNT'
    return  axios.get('http://localhost:8000/api/bets/highest',{
        params: {
            size: size,
            page: page,
            type:betHighestType

          }
    })
}