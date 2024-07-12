import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import { timeFormat } from "../util/date-util";
import { formatToTwoDecimals } from "../util/number-util";
import "./AllBets.css";
import { getAllBetsAPI } from "../../communication/rest";
import { Box } from "@mantine/core";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

export const AllBets = ({ notifyIncomingBets }) => {
  const queryClient = useQueryClient();

  let size = 10;
  let page = 0;

  const { data } = useQuery({
    queryKey: ["allBets"],
    queryFn: () => getAllBetsAPI(page, size),
    refetchInterval: 500,
  });

  const getRowClassName = (multiplier) => {
    return multiplier !== 0 ? "row-highlight" : "row-normal";
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["allBets"] });
  }, []);

  useEffect(() => {
    if (data) notifyIncomingBets(data?.data?.data?.bets);
  }, [data]);

  return (
    <tbody style={{ width: "100%", overflowY: "auto" }}>
      {data?.data?.data.bets.map((x, index) => (
        <tr
          key={index}
          style={{
            padding: "5px",
            marginTop:'10px'
          }}
          className={getRowClassName(x.multiplier)}
        >
          <td align="center">{timeFormat(x.time)}</td>
          <td align="center">{x.amount}</td>
          <td align="center">
            <Box
              sx={(theme) => ({
                padding: "0px 5px",
                backgroundColor: theme.colors.blue800[0],
                borderRadius: "15px",
                color: theme.colors.rose[0],
                fontWeight:'bold'
              })}
            >
              {x.multiplier.toFixed(2)}x
            </Box>
          </td>
          <td align="center">
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                justifyContent: "end",
                gap: "5px",
              }}
            >
              <span>{formatToTwoDecimals(x.amount * x.multiplier)}</span>
              <GppGoodOutlinedIcon sx={(theme) => ({ color: theme.colors.green[0] })} />
              <ChatBubbleOutlineIcon />
            </Box>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
