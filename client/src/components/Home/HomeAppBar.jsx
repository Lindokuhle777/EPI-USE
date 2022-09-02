import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Menu, MenuItem, Toolbar, IconButton } from "@mui/material";
import { MainContext } from "../../MainContext";

const drawerWidth = window.innerWidth * 0.3;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//Main App Bar

function HomeAppBar({ open, handleDrawerOpen }) {
  const { user, logOut } = useContext(MainContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar style={{ backgroundColor: "#000000" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <div>
          <img src="epi2.jpg" style={{ height: "60px", marginRight: "10px" }} />
        </div>
        <Avatar
          onClick={handleClick}
          style={{ position: "absolute", right: "10px" }}
        >
          {user?.displayName[0]}
        </Avatar>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => logOut()}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default HomeAppBar;
