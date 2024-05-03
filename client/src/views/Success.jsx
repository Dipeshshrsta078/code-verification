import React from "react";
import { Box, Card, Stack } from "@mui/material";

const Success = () => {
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
          <h3>Code has been verified successfully!! </h3>
        </Stack>
      </Card>
    </Box>
  );
};

export default Success;
