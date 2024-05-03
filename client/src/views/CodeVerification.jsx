import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Card, IconButton, Snackbar, Stack } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants";
import { SUCCESS_ROUTE } from "../routes/constants";
import { VerifiedContext } from "../context/VerificationContext";

const CodeVerification = () => {
  // states
  const [otp, setOtp] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("");
  const [isNumeric, setIsNumeric] = useState(true);

  const { isVerified, setIsVerified } = useContext(VerifiedContext);

  // hooks
  const navigate = useNavigate();

  // event handlers
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // submit event handler

  const handleVerifyOtp = async () => {
    try {
      if (!otp) {
        throw new Error("Otp cannot be empty.");
      }
      const response = await axios.post(`${baseUrl}/verify`, {
        code: otp,
      });
      setIsVerified(true);
      setOpen(true);
      setSnackbarMsg(response.data.message);
      setSnackbarColor("green");
      // setTimeout(() => navigate(SUCCESS_ROUTE, { replace: true }), 1000);
    } catch (err) {
      setOpen(true);
      setSnackbarMsg(err.response.data.message);
      setSnackbarColor("red");
    }
  };

  const handleInputChange = (value) => {
    if (!isNaN(value) && value !== "") {
      setIsNumeric(true);
    } else {
      setIsNumeric(false);
    }
    setOtp(value);
  };
  return (  
    <Box>
      <Card
        sx={{
          bgcolor: "#f4f4f4",
          maxWidth: "500px",
          p: 2,
          margin: "40px auto",
        }}
      >
        <Stack spacing={2} alignItems={"center"}>
          <h3>Verification code:</h3>

          <Stack spacing={2} alignItems="center">
            <OtpInput
              value={otp}
              onChange={handleInputChange}
              numInputs={6}
              type="number"
              renderInput={(props) => <input {...props} />}
              containerStyle={{ justifyContent: "space-between" }}
              inputStyle={{
                width: "100%",
                margin: "8px",
                padding: "10px",
                border: `1px solid ${isNumeric ? "#eee" : "red"}`,
                borderRadius: 4,
                ":hover": {
                  borderColor: "#eee",
                },
              }}
              focusStyle={{
                outline: "none",
                border: `2px solid #eee`,
              }}
            />
            <Button
              disableElevation
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleVerifyOtp}
              disabled={!otp || otp.length < 6|| !isNumeric}
            >
              Submit
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              ContentProps={{
                sx: {
                  background: snackbarColor,
                },
              }}
              message={snackbarMsg}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              action={
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            />
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default CodeVerification;
