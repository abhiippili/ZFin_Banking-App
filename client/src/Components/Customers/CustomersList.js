import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  styled,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { getCustomer } from "../../api/customersApi";

const StyledContainer = styled(Box)({
  marginBottom: "10px",
  minHeight: "3rem",
  display: "flex",
  // justifyContent: "space-around",
  alignItems: "center",
  borderRadius: "10px",
  backgroundColor: "#4158D0",
  backgroundImage:
    "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
  cursor: "pointer"
});

const DetailsBox = styled(Box)({
  display: "flex",
  flex: 1,
  justifyContent: "center"
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
  p: 4,
  border: "none"
};

const ModalText = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "10px"
});

const CustomersList = ({ customersData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [customer, setCustomer] = useState(null);
  const queryState = Boolean(customer);
  const [amount, setAmount] = useState("");

  const { data, isLoading } = useQuery(
    ["queryCustomer", customer],
    () => getCustomer(customer),
    {
      enabled: queryState
    }
  );

  return (
    <Box sx={{ margin: "0rem 2rem" }}>
      <StyledContainer sx={{ background: "none" }}>
        <DetailsBox>
          <Typography>Account Number</Typography>
        </DetailsBox>
        <DetailsBox>
          <Typography>Account Holder</Typography>
        </DetailsBox>
        <DetailsBox>
          <Typography>Balance</Typography>
        </DetailsBox>
      </StyledContainer>
      {customersData.customers.map((customer) => {
        return (
          <Box key={customer.accountNumber.toString()}>
            <StyledContainer
              boxShadow={3}
              onClick={() => {
                setCustomer(customer.accountNumber);
                return setOpenModal(true);
              }}
            >
              <DetailsBox>
                <Typography>{customer.accountNumber}</Typography>
              </DetailsBox>
              <DetailsBox>
                <Typography>{customer.name}</Typography>
              </DetailsBox>
              <DetailsBox>
                <Typography>₹ {customer.balance}</Typography>
              </DetailsBox>
            </StyledContainer>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
              {isLoading ? (
                <Box sx={modalStyle}>Loading...</Box>
              ) : (
                <Box sx={modalStyle}>
                  <ModalText sx={{ display: "flex", alignItems: "center" }}>
                    <h4>
                      <pre>Account Number : </pre>
                    </h4>
                    {queryState
                      ? data.data.customers[0].accountNumber
                      : undefined}
                  </ModalText>
                  <ModalText sx={{ display: "flex", alignItems: "center" }}>
                    <h4>
                      <pre>Account Holder : </pre>
                    </h4>
                    {queryState ? data.data.customers[0].name : undefined}
                  </ModalText>
                  <ModalText sx={{ display: "flex", alignItems: "center" }}>
                    <h4>
                      <pre>Balance : </pre>
                    </h4>
                    {queryState ? data.data.customers[0].balance : undefined}
                  </ModalText>
                  <FormControl sx={{ marginTop: "20px", width: "100%" }}>
                    <InputLabel>Amount</InputLabel>
                    <OutlinedInput
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">₹</InputAdornment>
                      }
                      label="Amount"
                    />
                  </FormControl>
                  <Button
                    variant="outlined"
                    sx={{
                      marginTop: "20px",
                      marginLeft: "25%",
                      color: "#000",
                      width: "50%"
                    }}
                  >
                    Send Money
                  </Button>
                </Box>
              )}
            </Modal>
          </Box>
        );
      })}
    </Box>
  );
};

export default CustomersList;
