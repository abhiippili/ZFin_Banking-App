import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Box, Button, Modal, styled, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { getCustomer } from "./../../api/customersApi";

const TopButton = styled(Button)({
  color: "#000",
  fontWeight: 600,
  margin: "20px 20px",
  backgroundColor: "rgb(97, 218, 251)",
  "&:hover": {
    backgroundColor: "rgb(97, 218, 251)"
  }
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4
};

const AccountBalance = () => {
  const [openBalance, setOpenBalance] = useState(false);
  const { data: balance, isLoading: loadingBalance } = useQuery(
    ["queryOwner", openBalance],
    () => getCustomer(996419)
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
            {loadingBalance ? "Loading..." : balance.data.customers[0].balance}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default AccountBalance;
