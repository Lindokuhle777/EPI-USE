import React, { useState, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
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

const drawerWidth = window.innerWidth * 0.32;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
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
];

function SearchDrawer({ open, handleDrawerClose }) {
  const { employees } = useContext(MainContext);
  const theme = useTheme();
  const [value, setValue] = useState(options[0]);
  const [output, setOutput] = useState([]);
  const [empty,setEmpty] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
    document.getElementById("searchBox").value = "";
    setOutput([])
  };

  const onChange = (event) => {
    setEmpty(false);
    const curr = event.target.value.toLowerCase();
    setOutput([]);
    if(curr === "") return;
    

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
        <Typography variant="h4" style={{ marginRight: "20%" }}>
          Search
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon fontSize="large" />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <FormControl>
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
            gridTemplateColumns: "auto auto",
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
      <TextField
      id="searchBox"
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder={"Search by " + value}
        size="small"
        style={{ margin: "10px 15px" }}
      />

      <List style={{ height: "70vh", overflow: "auto" }}>
        {(empty===true && output.length===0) && <Typography variant="h4">No results</Typography>}
        
        {output.map((item) => (
          <ListItem
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
