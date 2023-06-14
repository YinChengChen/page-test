import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import PublicIcon from "@mui/icons-material/Public";
import { NavLink as Link } from "react-router-dom";
import "./NavBar.scss";
import { blue } from "@mui/material/colors";
export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <PublicIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          ></PublicIcon>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{
                my: 2,
                color: "white",
                display: "block",
                "&:hover": { backgroundColor: blue[600] },
              }}
            >
              <Link to="/" className="link-text">
                Home
              </Link>
            </Button>
            {/* <Button sx={{ my: 2, color: 'white', display: 'block', '&:hover': { backgroundColor: blue[600]}}}>
                    <Link to='/Second' className='link-text'>Second</Link>
                </Button> */}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
