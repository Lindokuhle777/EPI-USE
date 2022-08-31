import React, { useEffect, useState, useContext } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import CustomTreeNode from "./CustomTreeNode";
import { MainContext } from "../../MainContext";
import Employee from "./Employee";
import Profile from "./Profile";
import {HomeContext} from "./HomeContext";

function Home() {
  const [root, setRoot] = useState(null);
  const { employees } = useContext(MainContext);
  
  //Profile dialog related funtions and variables
  const [open, setOpen] = useState(false);
  const [currProfile,setCurrProfile] = useState(null);
  const handleClickOpen = (node) => {
    setCurrProfile(node);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  useEffect(() => {

    for(let i=0;i<employees.length;i++) {
      const curr = employees[i];
      if(curr.position === "CEO"){
        setRoot(employees[i]);
        break;
      }
    }
   
    
  }, []);

  return (
    <div style={{width:"100%"}}>
      <HomeContext.Provider value={{handleClickOpen,handleClose,currProfile}}>
      <Tree>
        {root && (
          <CustomTreeNode
            node={new Employee(root)}
          />
        )}
      </Tree>
      <Profile open={open} handleClose={handleClose} currProfile={currProfile} setCurrProfile={setCurrProfile}/>
      </HomeContext.Provider>
      
    </div>
  );
}



export default Home;
