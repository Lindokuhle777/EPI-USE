import React, { useEffect, useState, useContext } from "react";
import { Tree } from "react-organizational-chart";
import CustomTreeNode from "./CustomTreeNode";
import { MainContext } from "../../MainContext";
import Employee from "./Employee";
import Profile from "./Profile";
import { HomeContext } from "./HomeContext";
import { styled } from '@mui/material/styles';
import HomeAppBar from "./HomeAppBar";
import SearchDrawer from "./SearchDrawer";

const drawerWidth = window.innerWidth *.3;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
}

function Home() {
  const [root, setRoot] = useState(null);
  const { employees } = useContext(MainContext);

 
  const forceUpdate = useForceUpdate();

  
  const [openProfile, setOpenProfile] = useState(false);
  const [currProfile, setCurrProfile] = useState(null);

  const handleClickOpenProfile = (node) => {
    setCurrProfile(node);
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  useEffect(() => {
    for (let i = 0; i < employees.length; i++) {
      const curr = employees[i];
      if (curr.position === "CEO") {
        setRoot(employees[i]);
        break;
      }
    }
  }, []);


  /// no

  
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ width: "100%",display: "flex"}}>
      <HomeContext.Provider
        value={{ handleClickOpenProfile, handleCloseProfile, currProfile }}
      >
        <HomeAppBar open={open} handleDrawerOpen={handleDrawerOpen}/>
        <SearchDrawer open={open} handleDrawerClose={handleDrawerClose}/>
      
      <Main open={open}>
        <DrawerHeader />
        <Tree>{root && <CustomTreeNode node={new Employee(root)} />}</Tree>
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
