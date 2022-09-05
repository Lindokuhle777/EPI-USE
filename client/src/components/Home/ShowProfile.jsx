import React from "react";
import { DialogContent, Typography } from "@mui/material";
import Gravatar from "react-gravatar";

//Used to show the profile
// If the employee hasn't uploaded an image, we use Gravatar
function ShowProfile({currProfile,manager}) {
  const handleManager = (event)=>{
    event.preventDefault();
    document.getElementById(manager?.empNum).click();
  }

  

  document.getElementById("manBtn")?.addEventListener("mouseover", ()=>{
    document.getElementById("manBtn").style.cssText = "text-decoration: underline;"
  })
  document.getElementById("manBtn")?.addEventListener("mouseout", ()=>{
    document.getElementById("manBtn").style.cssText = "text-decoration:'';"
  })

  return (
    <DialogContent style={{ backgroundColor: "rgba(0,0,0,0.06)" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: 0,
        }}
      >
        {currProfile?.imageUrl == null && (
          <Gravatar
            email={currProfile?.email}
            size={150}
            style={{
              borderRadius: "50%",
              margin: "auto auto",
              display: "block",
            }}
          />
        )}
        {currProfile?.imageUrl !== null && (
          <img
            style={{ width: 150, height: 150, borderRadius: "50%",margin:"auto auto",display:"block" }}
            src={currProfile?.imageUrl}
          />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "15px",
          }}
        >
          <Typography variant="h5">
            {currProfile?.firstName + " " + currProfile?.lastName}
          </Typography>

          <Typography  variant="h6">
            {"Birth Date: " + new Date(currProfile?.DOB).toLocaleDateString()}
          </Typography>

          <Typography variant="subtitle1">{currProfile?.position}</Typography>

          <Typography variant="subtitle1">{currProfile?.email}</Typography>
          <Typography variant="subtitle1">
            {"R " + currProfile?.salary}
          </Typography>
          {manager && (
            <Typography variant="subtitle1">
              Managed by <Typography style={{cursor:"pointer"}} id="manBtn" variant="button" onClick={handleManager}>{manager?.first_name + " " + manager?.last_name}</Typography>
              
            </Typography>
          )}
        </div>
      </div>
    </DialogContent>
  );
}

export default ShowProfile;
