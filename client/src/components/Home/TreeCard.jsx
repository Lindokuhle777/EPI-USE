import React,{useContext} from "react";
import { Paper, Typography } from "@mui/material";
import Gravatar from "react-gravatar";
import {HomeContext} from "./HomeContext";

const paperStyle = {
  display: "inline-block",
  padding: "5px",
  cursor:"pointer"
};

function TreeCard({ node }) {
  const {handleClickOpen} = useContext(HomeContext);
  const handleClick = (event) => {
    event.preventDefault();
    handleClickOpen(node);
  }
  return (
    <Paper elevation={3} style={paperStyle} onClick={handleClick}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Gravatar email={node.email} style={{ margin: "3px" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" noWrap>
            {node.firstName + " " + node.lastName}
          </Typography>
          <Typography variant="subtitle1">{node.position}</Typography>
        </div>
      </div>
    </Paper>
  );
}

export default TreeCard;
