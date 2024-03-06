import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function Resetpassword() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    resetToken: "",
    newPassword: "",
    confirmpass: "",
  });

  const sendRequest = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/users/resetpassword",
        {
          email: input.email,
          resetToken: input.resetToken,
          newPassword: input.newPassword,
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

    if (input.newPassword !== input.confirmpass) {
      alert("Passwords do not macth");
      return;
    }
    if (
      input.email === "" ||
      input.resetToken === "" ||
      input.newPassword === "" ||
      input.comfirmpass === ""
    ) {
      alert("please fill all the fields");
      return;
    }

    await sendRequest().then((data) => {
      if (data === "Password reset successfully") {
        alert("updated new password");
        navigate("/auth");
      }
    });
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
            Set up new password
          </Typography>
          <TextField
            value={input.email}
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            color="primary"
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <TextField
            value={input.resetToken}
            label="reset-Code"
            type="text"
            variant="outlined"
            margin="normal"
            color="primary"
            onChange={(e) => setInput({ ...input, resetToken: e.target.value })}
          />
          <TextField
            value={input.newPassword}
            label="New Password"
            type="password"
            variant="outlined"
            margin="normal"
            color="primary"
            onChange={(e) =>
              setInput({ ...input, newPassword: e.target.value })
            }
          />
          <TextField
            value={input.confirmpass}
            label="New Password"
            type="password"
            variant="outlined"
            margin="normal"
            color="primary"
            onChange={(e) =>
              setInput({ ...input, confirmpass: e.target.value })
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
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}