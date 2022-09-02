import React, { useState, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { Avatar, TextField } from "@mui/material";
import { MainContext } from "../../MainContext";
import Gravatar from "react-gravatar";

/*
  Search Function
  * Used to search for an employee using a certain criteria e.g position and last name
  * The employee number can also be used but not using a substring on thaemployee number 
*/

const drawerWidth = window.innerWidth * 0.3;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: "rgba(0,0,0,0.06)",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const options = [
  "Email",
  "First Name",
  "Last Name",
  "Position",
  "Employee Number",
]; //Search option

function SearchDrawer({ open, handleDrawerClose }) {
  const { employees } = useContext(MainContext);
  const theme = useTheme();
  const [value, setValue] = useState(options[0]);
  const [output, setOutput] = useState([]);
  const [empty, setEmpty] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
    document.getElementById("searchBox").value = "";
    setOutput([]);
  };

  const onChange = (event) => {
    setEmpty(false);
    const curr = event.target.value.toLowerCase();
    setOutput([]);
    if (curr === "") return;

    if (value === "Email") {
      employees.map((employee) => {
        if (employee.email.toLowerCase().includes(curr)) {
          setOutput((output) => [...output, employee]);
        }
      });
    } else if (value === "First Name") {
      employees.map((employee) => {
        if (employee.first_name.toLowerCase().includes(curr)) {
          setOutput((output) => [...output, employee]);
        }
      });
    } else if (value === "Last Name") {
      employees.map((employee) => {
        if (employee.last_name.toLowerCase().includes(curr)) {
          setOutput((output) => [...output, employee]);
        }
      });
    } else if (value === "Position") {
      employees.map((employee) => {
        if (employee.position.toLowerCase().includes(curr)) {
          setOutput((output) => [...output, employee]);
        }
      });
    } else if (value === "Employee Number") {
      employees.map((employee) => {
        if (employee.empNum === curr) {
          setOutput((output) => [...output, employee]);
        }
      });
    }
    setEmpty(true);
  };

  const handleListBtn = (curr) => {
    document.getElementById(curr).click();
  };

  return (
    <Drawer
      sx={{
        textAlign: "center",
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <div
          style={{ textAlign: "center", flexDirection: "row", display: "flex" }}
        >
          <Typography
            variant="h4"
            style={{ position: "absolute", right: 0, left: 0 }}
          >
            Search
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon fontSize="large" />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
      </DrawerHeader>

      <FormControl style={{ backgroundColor: "rgba(0,0,0,0.06)" }}>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Select Field
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
          style={{
            padding: "0 20px",
            display: "grid",
            gridTemplateColumns: "50% 50%",
          }}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <div
        style={{ padding: "10px 15px", backgroundColor: "rgba(0,0,0,0.06)" }}
      >
        {" "}
        <TextField
          id="searchBox"
          onChange={onChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder={"Search by " + value}
          size="small"
        />
      </div>

      <List
        style={{
          height: "70vh",
          overflow: "auto",
          backgroundColor: "rgba(0,0,0,0.06)",
          padding: "0 5px",
        }}
      >
        {empty === true && output.length === 0 && (
          <Typography variant="h4">No results</Typography>
        )}

        {output.map((item) => (
          <ListItem
            style={{
              margin: "5px 0",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
            key={item.email}
            button
            onClick={(event) => {
              event.preventDefault();
              handleListBtn(item.empNum);
            }}
          >
            <ListItemIcon>
              <Avatar>
                <Gravatar email={item.email} />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={item.first_name + " " + item.last_name}
              secondary={item.position}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SearchDrawer;
