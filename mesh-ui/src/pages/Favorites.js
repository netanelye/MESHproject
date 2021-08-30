import { Grid } from "@material-ui/core";
import React from "react";
import CheckboxList from "../components/CheckBoxList";
import { useStyles } from "../styles/styles";
import { Box, Button, Container, Divider, Typography } from "@material-ui/core";
import axios from "axios";
import SubtitleWhiteText from "../components/SubtitleWhiteText";
import {
  MuiThemeProvider,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Favorite } from "@material-ui/icons";
import RecipeList from "../components/RecipieList";
import RecipieList from "../components/RecipieList";

const Favorites = (props) => {
  console.log(props.categories);
  const classes = useStyles();

  const headingFont = createMuiTheme({
    typography: {
      fontFamily: ["Varela Round"].join(","),
    },
  });

  const theme = createMuiTheme({
    typography: {
      fontFamily: ["Rubik"].join(","),
    },
  });

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className={classes.pageGrid}
    >
      <Grid md={12} alignItems="flex-top" item>
        <ThemeProvider theme={theme}>
          <Typography component="div">
            <Box
              fontWeight="fontWeightMedium"
              m={1}
              fontSize={46}
              letterSpacing={3}
            >
              המומלצים שלנו
            </Box>
          </Typography>
        </ThemeProvider>
        <Divider variant="fullWidth" light />
      </Grid>
     {/* <Grid md={12}>
     <Grid flex>
        <Container>
          <RecipieList recipes={props.favorites}></RecipieList>
        </Container>
      </Grid>
     </Grid> */}

    </Grid>
  );
};

export default Favorites;
