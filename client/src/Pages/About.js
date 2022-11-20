import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

function About() {
  return (
    <Box className="mainComponent">
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <Stack direction="column">
          <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
            <img src="logo.png" alt="" width={300} />
          </Box>
          <Typography variant="h5">
            This project is developed for TSF GRIP Program
          </Typography>

          <Typography
            sx={{ marginTop: "1rem", color: "#61dafb", marginLeft: "10rem" }}
          >
            Developed by Abhishek Ippili
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default About;
