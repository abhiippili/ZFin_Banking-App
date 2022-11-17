import { Box, Button, Stack, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeBox = styled(Box)({
  display: "flex"
});
const Banner = styled(Box)({
  height: "55%",
  boxShadow: "inset -4px -2px 10px rgba(255,223,0,0.5)"
});

function Home() {
  const navigate = useNavigate();

  return (
    <Box className="mainComponent">
      <Banner>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            background: "rgb(0,96,116)",
            background:
              "linear-gradient(90deg, rgba(0,96,116,1) 0%, rgba(39,43,52,1) 100%)"
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "400",
              color: "white",
              textShadow: "1px 0px 20px grey"
            }}
          >
            ZFin
          </Typography>
          <Typography variant="h5" sx={{ color: "white" }}>
            The Ezy Fin Application
          </Typography>
          <Button
            sx={customersButtonStyle}
            variant="contained"
            onClick={() => navigate("/customers")}
          >
            View Customers
          </Button>
        </Stack>
      </Banner>
    </Box>
  );
}

const customersButtonStyle = {
  margin: "20px",
  color: "black",
  fontWeight: 600,
  background: "rgb(234,192,0)",
  backgroundColor: "#21D4FD",
  backgroundImage: "linear-gradient(10deg, #21D4FD 0%, #B721FF 100%)",
  "&:hover": {
    transform: "scale(1.01)"
  }
};
export default Home;
