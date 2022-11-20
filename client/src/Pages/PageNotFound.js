import { Box, Typography, Container } from "@mui/material";
import React from "react";

function PageNotFound() {
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
        <Typography variant="h5">404 Page Not Found</Typography>
      </Container>
    </Box>
  );
}

export default PageNotFound;
