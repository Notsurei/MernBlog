import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../store";
import { Link } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  // const [value, setValue] = useState(0);

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    if(storedLoggedIn === 'false'){
      dispatch(authAction.logout());
    }else{
      dispatch(authAction.login());
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    dispatch(authAction.login());
  }

  return (
    <AppBar
      position="static"
      sx={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(11,31,112,1) 22%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h5">KVBlog</Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={2}>
            {/* <Tabs value={value} onChange={handleChange}> */}
            <Tabs>
              <Tab
                component={Link}
                to="/blogs"
                sx={{ color: "white" }}
                label="All Blogs"
              />
              <Tab
                component={Link}
                to="/myblogs"
                sx={{ color: "white" }}
                label="My Blogs"
              />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              sx={{
                margin: 1,
                borderRadius: 10,
                backgroundColor: "#4caf50",
                ":hover": { backgroundColor: "#8bc34a" },
              }}
            >
              Login/Sign-up
            </Button>
          )}
          {isLoggedIn && (
            <Button
              onClick={handleLogout}
              component={Link}
              to="/auth"
              variant="contained"
              sx={{
                margin: 1,
                borderRadius: 10,
                backgroundColor: "#ff1744",
                ":hover": { backgroundColor: "black" },
              }}
            >
              Log out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}