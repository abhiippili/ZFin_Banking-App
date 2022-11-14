import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Box, Button, Modal, styled, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { getCustomer } from "./../../api/customersApi";

const TopButton = styled(Button)({
  color: "#fff",
  margin: "20px 20px",
  // backgroundColor: "#4158D0",
  // backgroundImage:
  //   "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
  backgroundColor: "#0093E9",
  backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#4158D0",
  backgroundImage:
    "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4
};

const AccountBalance = () => {
  const [openBalance, setOpenBalance] = useState(false);
  const { data, isLoading } = useQuery(["queryOwner", openBalance], () =>
    getCustomer(996419)
  );

  return (
    <Box>
      <TopButton
        variant="contained"
        startIcon={<AccountBalanceWalletIcon />}
        onClick={() => setOpenBalance(true)}
      >
        Account Balance
      </TopButton>
      <Modal open={openBalance} onClose={() => setOpenBalance(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">
            Remaining Balance :{" "}
            {isLoading ? "Loading..." : data.data.customers[0].balance}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default AccountBalance;
