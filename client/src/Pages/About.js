import { Box, Typography, Popover } from "@mui/material";
import React, { useState } from "react";

function About() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    return (
      <Popover
        open={true}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    );
  };
  return (
    <Box className="mainComponent">
      <button onClick={handleClick}>Toggle</button>
    </Box>
  );
}

export default About;
