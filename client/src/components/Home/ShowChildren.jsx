import { Typography, DialogContent, Stack } from "@mui/material";
import React, { useEffect } from "react";
import TreeCard from "./TreeCard";

//Used to display all the children on the currProfile
//Returns a DialogContent
function ShowChildren({ childrenArr }) {
  //childrenArr in a list of Employee objects

  return (
    <DialogContent
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Children
      </Typography>
      <Stack
        spacing={2}
        style={{ height: "40vh", overflow: "auto", padding: "0 5px" }}
      >
        {childrenArr.map((child) => (
          <TreeCard node={child} />
        ))}
      </Stack>
    </DialogContent>
  );
}

export default ShowChildren;
