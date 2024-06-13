import { useQuery, useQueryClient } from "react-query";
import { getAllBetsAPI } from "../../rest/api";
import { useEffect } from "react";
import { timeFormat } from "../util/date-util";
import { formatToTwoDecimals } from "../util/number-util";
import './AllBets.css';

//Napravio sam funkciju notifyIncomingBets jer realno gde mi prikazujemo 'ALL BETS' koliko ih ima je ovde samo uzmemo length polje,pa je ovo kao event koji salje u paren kompoenentu
//te bets .Da ne koristim 2 poziva iako imam na beku pozvi da mi vrati broj betova,ovo je isto samo length.Da ne bi isli 2 ista poziva na svakih 0.5s lakse je jeadn i da se event salje
//u parent komponentu

export const AllBets = ({notifyIncomingBets}) => {
  const queryClient = useQueryClient();

  let size = 10;
  let page = 0;

  const { data } = useQuery({ 
    queryKey: ["allBets"],
    queryFn:() => getAllBetsAPI(page, size),
    refetchInterval:500

  
  });
  const getRowClassName = (multiplier) => {
    return multiplier !== 0 ? 'row-highlight' : 'row-normal';
  };
  useEffect(()=>{
      queryClient.invalidateQueries({queryKey:['allBets']})
  },[])

  useEffect(()=>{
    if(data)
    notifyIncomingBets(data.data)
  },[data])

  return (
    <tbody  style={{width:'100%',overflowY: 'auto' }}>
      {data?.data?.map((x) => (
        <tr key={x.id} className={getRowClassName(x.multiplier)}>
          <td align="center">{timeFormat(x.time)}</td>
          <td align="center">{x.amount}</td>
          <td align="center">{x.multiplier}</td>
          <td align="center">{formatToTwoDecimals(x.amount*x.multiplier)}</td>
          <td align="center">{ x.multiplier !==0?formatToTwoDecimals((x.amount*x.multiplier)-x.amount)  : 0.0}</td>
        </tr>
      ))}
    </tbody>
  );
};
