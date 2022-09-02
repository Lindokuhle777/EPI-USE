import React, { useContext } from "react";
import {
  Paper,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@mui/material";
import Gravatar from "react-gravatar";
import { HomeContext } from "./HomeContext";

const paperStyle = {
  display: "inline-block",
  cursor: "pointer",
};

// Graph Node
// If the used hasn't uploaded an image, we use gravatar

function TreeCard({ node }) {
  const { handleClickOpenProfile } = useContext(HomeContext);
  const handleClick = (event) => {
    event.preventDefault();
    handleClickOpenProfile(node);
  };
  return (
    <Paper
      elevation={10}
      style={paperStyle}
      id={node.empNum}
      onClick={handleClick}
    >
      <ListItem>
        <ListItemIcon>
          {node.imageUrl !== null &&(<Avatar src={node.imageUrl}/>)}
          {node.imageUrl === null &&<Avatar><Gravatar email={node.email} style={{ margin: "3px" }} /></Avatar>}
          
        </ListItemIcon>
        
        <ListItemText
          primary={node.firstName + " " + node.lastName}
          secondary={node.position}
        />
      </ListItem>
    </Paper>
  );
}

export default TreeCard;
