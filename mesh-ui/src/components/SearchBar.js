/* eslint-disable no-use-before-define */
import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useState, useEffect } from "react";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: 500,
//     "& > * + *": {
//       marginTop: theme.spacing(3),
//       borderRadius: 25,
//     },
//   },
// }));

const useStyles = makeStyles(theme => ({
  inputRoot: {
    // color: "purple",
    fontFamily: "Roboto Mono",
    borderRadius: 50,
    backgroundColor: ("#f2f2f2", 0.05),
    "& .MuiOutlinedInput-notchedOutline": {
      borderWidth: '2px',
      borderColor: "#735AA2"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderWidth: "2px",
      borderColor: "#735AA2"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: "2px",
      borderColor: "#735AA2"
    },
    "& .MuiChip-root" : {
      backgroundColor: "#F3E9F9"
    }

  }
}));

const textStyles = makeStyles({
  formControlRoot: {
    fontFamily: "Roboto Mono",
    width: "50vw",
    color: "#ffffff",
    borderRadius: "7px",
    position: "relative",
    "& label.Mui-focused": {
      color: "blue"
    },
  },
  inputLabelRoot: {
    color: "#ffffff",
    fontFamily: "Roboto Mono",
    "&.focused": {
      color: "#ffffff"
    }
  },
});

export default function Tags(props) {
  const classes = useStyles();
  const textClasses = textStyles();

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios.defaults.baseURL = "https://mshisr-back.herokuapp.com/"
    axios.get("https://mshisr-back.herokuapp.com/api/getIngredientList").then((res) => {
      console.log(res);
      setIngredients(res.data);
    });
  }, ingredients != null);

  const handleChange = (event, value) => {
    props.setItems(value);
    console.log(value);
  };

  return (
    <MuiThemeProvider>
    <Autocomplete
     disableClearable
     forcePopupIcon={false}
      multiple
      id="tags-outlined"
      options={ingredients.map((ing) => ({ title: ing }))}
      getOptionLabel={(option) => option.title}
      // defaultValue={[{ title: ingredients[0]}]}
      filterSelectedOptions
      onChange={handleChange}
      classes={classes}
      renderInput={(params) => {
        return (
            <TextField
              {...params}
              variant="outlined"
              label=""
              placeholder="בחר רכיבים"
            />
            );
          }}
          />
          </MuiThemeProvider>
  );
}

