import {
  Box,
  Button,
  Container,
  Stack,
  styled,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getTransactions } from "../api/transactionsApi";

const HomeBox = styled(Box)({
  display: "flex"
});
const Banner = styled(Box)({
  height: "40%",
  boxShadow: "inset -4px -2px 10px rgba(255,223,0,0.5)"
});

const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px",
  backgroundColor: "rgb(97, 218, 251)",
  color: "#000",
  borderRadius: "10px",
  minHeight: "3rem"
});

function Home() {
  const navigate = useNavigate();

  const { data: transactions, isLoading: loadingTransactions } = useQuery(
    ["getTransactions"],
    getTransactions
  );

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
              "radial-gradient(rgba(0,96,116,1) 0%, rgba(39,43,52,1) 100%)"
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "400",
              color: "white",
              textShadow: "1px 0px 20px grey"
            }}
          >
            ZFin
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
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
      <Box sx={{ width: "1000px", margin: "auto", marginTop: "2rem" }}>
        <Typography
          sx={{
            color: "white",
            fontWeight: 600,
            textAlign: "center",
            margin: "10px",
            fontSize: "1.2rem"
          }}
        >
          Recent Transactions
        </Typography>
        <StyledContainer sx={{ background: "none", color: "#fff" }}>
          <Typography>From Customer</Typography>
          <Typography>To Customer</Typography>
          <Typography sx={{ marginRight: "1rem" }}>
            Transaction Amount{" "}
          </Typography>
          <Typography sx={{ marginRight: "1.5rem" }}>
            Time Of Transaction
          </Typography>
        </StyledContainer>
        <Container
          className="scrollList"
          sx={{ maxHeight: "10rem", overflowY: "scroll" }}
        >
          {loadingTransactions
            ? "Loading..."
            : transactions.data.transactions.map((transaction) => {
                return (
                  <StyledContainer key={transaction._id}>
                    <Typography>{transaction.fromCustomer}</Typography>
                    <Typography>{transaction.toCustomer}</Typography>
                    <Typography>₹ {transaction.amount}</Typography>
                    <Typography>
                      {transaction.timeOfTransaction.slice(3, 24)}
                    </Typography>
                  </StyledContainer>
                );
              })}
        </Container>
      </Box>
    </Box>
  );
}

const customersButtonStyle = {
  margin: "20px",
  color: "black",
  fontWeight: 600,
  backgroundColor: "rgb(97, 218, 251)",
  "&:hover": {
    backgroundColor: "rgb(97, 218, 251)"
  }
};
export default Home;
