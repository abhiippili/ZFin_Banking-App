import {
  AppBar,
  Badge,
  Box,
  Popover,
  styled,
  Toolbar,
  Typography
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";

const LinkNav = styled(NavLink)({
  padding: "20px 20px",
  textDecoration: "none",
  color: "inherit"
});
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
});

const Logo = styled(Typography)({
  color: "#61dafb",
  cursor: "pointer"
});

const activeStyle = {
  borderBottom: "2px solid #ffd700",
  borderRadius: "2px",
  color: "#ffd700"
};
function Navbar() {
  const [notifications, setNotifications] = useState(2);
  const [openNotifications, setOpenNotifications] = useState(false);

  const navigate = useNavigate();

  const handleOpenNotifications = () => {
    setOpenNotifications(true);
  };
  const handleCloseNotifications = () => {
    setOpenNotifications(false);
    setNotifications(null);
  };

  return (
    <AppBar position="sticky" sx={{ minHeight: "64px" }}>
      <StyledToolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Logo variant="h6" onClick={() => navigate("/")}>
            ZFin
          </Logo>
          <LinkNav
            sx={{ marginLeft: "15px" }}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/"
          >
            HOME
          </LinkNav>
          <LinkNav
            to="/about"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            ABOUT
          </LinkNav>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <LinkNav
            to="/customers"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            CUSTOMERS
          </LinkNav>
          <LinkNav
            to="/profile"
            sx={{ padding: "15.6px 20px" }}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <AccountCircleIcon sx={{ cursor: "pointer" }} />
          </LinkNav>

          <Box>
            <Badge
              badgeContent={notifications}
              color="secondary"
              sx={{ marginLeft: "15px", cursor: "pointer" }}
              onClick={handleOpenNotifications}
            >
              <NotificationsIcon color="#fff" />
            </Badge>
            {notifications ? (
              <Popover
                open={openNotifications}
                onClose={handleCloseNotifications}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                sx={{ marginTop: "55px" }}
              >
                <Typography
                  component="div"
                  sx={{ backgroundColor: "gold", padding: "10px" }}
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nihil doloremque magnam tempore doloribus at voluptates labore
                  quae aperiam consequuntur commodi.
                </Typography>
              </Popover>
            ) : null}
          </Box>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}

export default Navbar;
