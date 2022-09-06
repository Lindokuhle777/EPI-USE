import React, { useEffect, useState, useContext } from "react";
import { Tree } from "react-organizational-chart";
import CustomTreeNode from "./CustomTreeNode";
import { MainContext } from "../../MainContext";
import Employee from "./Employee";
import Profile from "./Profile";
import { HomeContext } from "./HomeContext";
import { styled } from "@mui/material/styles";
import { Box,CircularProgress } from "@mui/material"
import HomeAppBar from "./HomeAppBar";
import SearchDrawer from "./SearchDrawer";


const drawerWidth = window.innerWidth * 0.3; // Drawer width must be 30% to the screen's width

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
}

function Home() {
  const [root, setRoot] = useState(null);
  const { employees, getData } = useContext(MainContext);
  const [openProfile, setOpenProfile] = useState(false); // Open the profile dialog
  const [currProfile, setCurrProfile] = useState(null); // Employee object of the current profile dialog. The one that is currently open
  const forceUpdate = useForceUpdate(); // Custom hook, to force this component to re render
  const [open, setOpen] = React.useState(false); // Open the SearchDrawer

  const handleClickOpenProfile = (node) => {
    setCurrProfile(node);
    setOpenProfile(true);
  };


  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Make the CEO the root of the graph
    getData();
    forceUpdate();
    for (let i = 0; i < employees.length; i++) {
      const curr = employees[i];
      if (curr.position === "CEO") {
        setRoot(employees[i]);
        break;
      }
    }
  }, [employees]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        height: "100%",
        minHeight: "100vh",
        overFlow: "auto"
      }}
    >
      <HomeContext.Provider
        value={{ handleClickOpenProfile, handleCloseProfile, currProfile }}
      >
        <HomeAppBar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          currProfile={currProfile}
        />
        <SearchDrawer open={open} handleDrawerClose={handleDrawerClose} />

        <Main open={open}>
          <DrawerHeader />
          {/* Not visiblle, Used to add margin Top so that the fixed app bar doesn't hide some components  */}
          
           <Tree
            lineWidth="2px"
            label={
              <div>
                <img
                  src="epi.png"
                  style={{ height: "60px", marginRight: "10px" }}
                />
              </div>
            }
          >
            {employees?.length === 0 && <Box sx={{ display: "block", margin: "auto auto" }}>
            <CircularProgress />
          </Box>}
            {root && <CustomTreeNode node={new Employee(root)} />}
          </Tree>

            <Profile
              open={openProfile}
              handleClose={handleCloseProfile}
              currProfile={currProfile}
              setCurrProfile={setCurrProfile}
              forceUpdate={forceUpdate}
            />

        </Main>
      </HomeContext.Provider>
    </div>
  );
}

export default Home;
