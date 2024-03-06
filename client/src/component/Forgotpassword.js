import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
  });

  const sendRequest = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/users/forgotpassword",
        {
          email: input.email,
        }
      );
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await sendRequest();
    if (data) {
      alert(data.message);
      navigate("/auth/resetpassword");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          maxWidth={400}
          margin="auto"
          marginTop={10}
          padding={3}
          boxShadow={3}
          borderRadius={10}
          bgcolor="#f5f5f5"
        >
          <Typography variant="h4" marginBottom={3} color="#333">
            Enter Your Email here
          </Typography>
          <TextField
            value={input.email}
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            color="primary"
            onChange={(e) =>
              setInput({ ...input, email: e.target.value })
            }
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginBottom: 1,
              borderRadius: 5,
              bgcolor: "#1976d2",
              color: "#fff",
            }}
          >
            Send reset code
          </Button>
          <Button
            component={Link}
            to="/auth"
            variant="text"
            color="primary"
            sx={{ marginBottom: 1 }}
          >
            Back to Login
          </Button>
        </Box>
      </form>
    </div>
  );
}