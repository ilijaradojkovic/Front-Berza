import { Box, Switch } from "@mantine/core";

export const ToggleMenuElement = ({ icon, title, isToggle, onChange }) => {
  return (
    <Box
      style={{
        display: "flex",
        padding: "1rem",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#574C66",
      }}
    >
      <Box style={{ display: "flex", gap: "10px" }}>
        {icon}
        <p>{title}</p>
      </Box>
      <Switch 
      color="indigo" 
      styles={{
           thumb: {
            backgroundColor: isToggle ? 'white':'#4C6EF5'
          },
      }}
      checked={isToggle}
       onChange={onChange} />
    </Box>
  );
};
