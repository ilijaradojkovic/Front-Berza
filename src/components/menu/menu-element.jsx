import { Box, Switch } from "@mantine/core"

export const MenuElement=({icon,title,onClick})=>{
        return   <Box
          style={{
            display: "flex",
            padding: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor:'#574C66',
            cursor:"pointer"
          }}
          onClick={onClick}
        >
          <Box style={{ display: "flex", gap: "10px" }}>
            {icon}
            <p>{title}</p>
          </Box>
        </Box>
     
}