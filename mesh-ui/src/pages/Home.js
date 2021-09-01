import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect, Fragment } from "react";
import SearchBar from "../components/SearchBar";
import FreeSearchBar from "../components/FreeSearchBar";
import { useStyles } from "../styles/styles";
import MeshButton from "../components/MeshButton";
import Recipe from "../components/Recipe";
import RecipeList from "../components/RecipieList";
import RecipieList from "../components/RecipieList";
import axios from "axios";
import SubtitleWhiteText from "../components/SubtitleWhiteText";
import {
  MuiThemeProvider,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const Home = (props) => {
  console.log(props.categories);
  const classes = useStyles();

  const [isFreeOrNot, setIsFreeOrNot] = useState(false);

  const [items, setItems] = useState([]);

  const [categories, setCategories] = useState();

  const [freeSearchValue, setFreeSearchValue] = useState();

  const [recipes, setRecipes] = useState([]);

  const onClickHandler = async (e) => {
    const data = {
      ingredients: items,
      categories: props.categories,
    };

    axios.post("/api/getRecipes", data).then((res) => {
      console.log("on clickHandler = " + res.data);
      setRecipes(res.data);
    });
  };

  const headingFont = createMuiTheme({
    typography: {
      fontFamily: ["Varela Round"].join(","),
    },
  });

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Rubik',
      ].join(','),
    },});

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      className={classes.pageGrid}
    >
      <Grid md={12} align="center" item>
        <ThemeProvider theme={theme}>
          <Typography component="div">
            <Box  fontWeight='fontWeightMedium'  m={4} fontSize={36} letterSpacing={3}>
              רעבים?
            </Box>
            <Box  m={1} fontSize={24} letterSpacing={1}>
              ספרו לנו אילו מצרכים יש לכם בבית ותשאירו לנו לעשות את העבודה!
            </Box>
            <Box  m={1} fontSize={24} letterSpacing={1}>
              מֶש מוצא עבורך את המתכון המתאים מתוך מאות מתכונים מרחבי הרשת
            </Box>
          </Typography>
        </ThemeProvider>
      </Grid>

        <Grid md={12} lg={12} alignContent="center" item>
          <SearchBar setItems={setItems} header={"בחר רכיבים"}></SearchBar>
        </Grid>

      <Grid align="center" md={12} item>
        {/* <button
          className={classes.meshButton}
          onClick={onClickHandler}
        ></button> */}

        <MuiThemeProvider>
          <Button
            onClick={onClickHandler}
            color="#735AA2"
            size="large"
            secondary
            variant="contained"
            buttonStyle={{ borderRadius: 50 }}
            style={{ borderRadius: 50 }}
            fontFamily='Rubik'
          >
            חפש מתכון
          </Button>
        </MuiThemeProvider>
      </Grid>

      <Grid className={classes.gridDivider} item>
        <Divider variant="fullWidth" light />
      </Grid>

      <Grid flex>
        <Container>
          <RecipieList recipes={recipes}></RecipieList>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Home;

