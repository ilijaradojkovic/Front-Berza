import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import { timeFormat } from "../util/date-util";
import { formatToTwoDecimals } from "../util/number-util";
import "./AllBets.css";
import { getAllBetsAPI } from "../../communication/rest";
import { Box } from "@mantine/core";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

export const AllBets = ({ notifyIncomingBets,casinoConfiguration }) => {
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
    <Box style={{ width: "100%",height:'100%' }}>
    {data?.data?.data?.bets.map((x, index) => (
      <Box
        key={index}
        style={{
          padding: "5px 15px",
          marginTop: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          borderRadius: "15px",
        }}
        className={getRowClassName(x.multiplier)}
      >
        <Box style={{ flex: 1, display: "flex", justifyContent: "start" }}>
          {timeFormat(x.time,casinoConfiguration)}
        </Box>
        <Box style={{ flex: 1, display: "flex", justifyContent: "start" }}>
          {x.amount.toFixed(2)}
        </Box>

        <Box style={{ flex: 1, display: "flex", justifyContent: "start" }}>
          <Box
            sx={(theme) => ({
              padding: "0px 10px",
              backgroundColor: theme.colors.blue800[0],
              borderRadius: "15px",
              color: theme.colors.rose[0],
              fontWeight: "bold",
            })}
          >
            {x.multiplier.toFixed(2)}x
          </Box>
        </Box>
        <Box style={{ flex: 1, display: "flex", justifyContent: "end" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
              gap: "5px",
            }}
          >
            <span>{x.cashOut.toFixed(2)}</span>
            <GppGoodOutlinedIcon
              sx={(theme) => ({ color: theme.colors.green[0] })}
            />
            <ChatBubbleOutlineIcon />
          </Box>
        </Box>
      </Box>
    ))}
  </Box>
  );
};
