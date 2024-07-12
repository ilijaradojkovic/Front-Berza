import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import "./MyBets.css";
import { getMyBetsAPI } from "../../communication/rest";
import { timeFormat } from "../util/date-util";
import { formatToTwoDecimals } from "../util/number-util";
import { Box } from "@mantine/core";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
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
  useEffect(() => {
    console.log();
  }, [data]);

  return (
    <Box style={{ width: "100%" }}>
      {data?.data?.data?.myBets.map((x, index) => (
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
            {timeFormat(x.time)}
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
              <span>{formatToTwoDecimals(x.amount * x.multiplier)}</span>
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
