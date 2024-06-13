import { useQuery } from "react-query";
import { getBetsTopWins } from "../../rest/api";
import { timeFormat } from "../util/date-util";
import { formatToTwoDecimals } from "../util/number-util";
import { useEffect } from "react";

export const TopWins=({topWinsType,groupByType,currentUser})=>{

    let size = 10;
    let page = 0;
  
    const { data,refetch } = useQuery(["topBets"], () =>  getBetsTopWins(page, size,topWinsType,groupByType,currentUser?.email) );

    useEffect(()=>{
        
            refetch()
    },[topWinsType,groupByType])
 
    return (
        <tbody  style={{width:'100%',overflowY: 'auto' ,height:'10vh'}}>
      {data?.data?.map((x) => (
        <tr key={x.id} >
          <td align="center">{timeFormat(x.time)}</td>
          <td align="center">{x.amount}</td>
          <td align="center">{x.multiplier}</td>
          <td align="center">{formatToTwoDecimals(x.amount*x.multiplier)}</td>
          <td align="center">{ x.multiplier !==0?formatToTwoDecimals((x.amount*x.multiplier)-x.amount)  : 0.0}</td>
        </tr>
      ))}
    </tbody>
    );
}