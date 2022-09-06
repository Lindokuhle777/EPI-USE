import {
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import Gravatar from "react-gravatar";


//Used to display all the children on the currProfile
//Returns a DialogContent
function ShowChildren({ childrenArr }) {


  const handleClick = (empNum) => {
    document.getElementById("closeBtn").click();
    setTimeout(() => {
      document.getElementById(empNum).click();
    }, 1000);
  };

  return (
    <>
      <DialogTitle
        style={{
          textAlign: "center",
          fontSize: "30px",
          backgroundColor: "rgba(0,0,0,0.06)",
        }}
      >
        Children
      </DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          backgroundColor: "rgba(0,0,0,0.06)",
        }}
      >
        <List >
          {childrenArr.length === 0 && <Typography variant="h5" fullWidth onWrap >On children</Typography>}
          {childrenArr.map((child) => (
            <ListItem
              key={child.empNum}
              onClick={(event) => {
                event.preventDefault();
                handleClick(child.empNum);
              }}
              style={{
                backgroundColor: "white",
                margin: "5px 0",
                borderRadius: "10px",
              }}
            >
              <ListItemIcon>
                {child.imageUrl === null && (
                  <Gravatar
                    size={40}
                    email={child.email}
                    style={{ borderRadius: "50%" }}
                  />
                )}
                {child.imageUrl !== null && (
                  <Avatar sx={{ width: 40, height: 40 }} src={child.imageUrl} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={child.firstName + " " + child.lastName}
                secondary={child.position}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </>
  );
}

export default ShowChildren;
