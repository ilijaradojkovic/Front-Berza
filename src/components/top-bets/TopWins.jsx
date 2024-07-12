import { useQuery } from "react-query";
import { timeFormat } from "../util/date-util";
import { formatToTwoDecimals } from "../util/number-util";
import { useEffect } from "react";
import { getBetsTopWins } from "../../communication/rest";
import { Box } from "@mantine/core";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

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

  <Box style={{ width: "100%" }}>
    {data?.data?.map((x, index) => (
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
