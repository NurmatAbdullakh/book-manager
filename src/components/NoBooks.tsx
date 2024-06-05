import { Typography, Box } from "@mui/material";

const Message = ({ message, icon }: { message: string; icon: JSX.Element }) => {
  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        {icon}
        <Typography variant="h6">{message}</Typography>
      </Box>
    </div>
  );
};

export default Message;
