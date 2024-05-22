import { useQuery, useQueryClient } from "react-query";
import { getMyBetsAPI } from "../../rest/api";
import { timeFormat } from "../util/date-util";
import { formatToTwoDecimals } from "../util/number-util";
import { useEffect } from "react";
import "./MyBets.css";
export const MyBets = () => {
  const queryClient = useQueryClient();
  let size = 10;
  let page = 0;

  const { data } = useQuery(["myBets"], () => getMyBetsAPI(page, size));
  const getRowClassName = (multiplier) => {
    return multiplier !== 0 ? "row-highlight" : "row-normal";
  };
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["myBets"] });
  }, []);

  return (
    <tbody style={{ width: "100%" ,overflowY: 'auto' }}>
      {data?.data?.map((x) => (
        <tr key={x.id} className={getRowClassName(x.multiplier)}>
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
