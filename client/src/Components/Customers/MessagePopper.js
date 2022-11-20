import { Popover, Box, Typography } from "@mui/material";

const MessagePopper = ({ message, anchorEl, openModal, setOpenModal }) => {
  return (
    <Popover
      open={openModal}
      anchorEl={anchorEl}
      onClose={() => setOpenModal(false)}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 180, left: 780 }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <Box
        sx={{
          width: "20vw",
          height: "2.5rem",
          boxShadow: 24,
          backgroundImage:
            "linear-gradient( 135deg, #3B2667 10%, #BC78EC 100%)",
          display: "flex",
          color: "white",
          fontWeight: "bolder",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography>{message}</Typography>
      </Box>
    </Popover>
  );
};

export default MessagePopper;
