import { useQuery } from "react-query";
import { timeFormat } from "../util/date-util";
import { formatToTwoDecimals } from "../util/number-util";
import { useEffect } from "react";
import { getBetsTopWins } from "../../communication/rest";

export const TopWins = ({ topWinsType, groupByType, currentUser }) => {
  let size = 10;
  let page = 0;

  const { data, refetch } = useQuery(["topBets"], () =>
    getBetsTopWins(page, size, topWinsType, groupByType)
  );

  useEffect(() => {
    refetch();
  }, [topWinsType, groupByType]);

  return (
    <tbody style={{}}>

      {data?.data?.map((x) => (
        <tr key={x.betId}>
          <td align="center">{timeFormat(x.time)}</td>
          <td align="center">{x.amount}</td>
          <td align="center">{x.multiplier}</td>
          <td align="center">{formatToTwoDecimals(x.amount * x.multiplier)}</td>
          <td align="center">
            {x.multiplier !== 0
              ? formatToTwoDecimals(x.amount * x.multiplier - x.amount)
              : 0.0}
          </td>
        </tr>
      ))}
    </tbody>
  );
};
