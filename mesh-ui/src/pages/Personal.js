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

const Personal = (props) => {
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
      <Grid md={12} alignItems="center" item>
        <ThemeProvider theme={theme}>
          <Typography component="div">
            <Box
              fontWeight="fontWeightMedium"
              m={1}
              fontSize={36}
              letterSpacing={3}
            >
              העדפות קולינריות
            </Box>
            <Box m={1} fontSize={24} letterSpacing={1}>
              ספרו לנו את העדפותכם על מנת שנוכל למצוא עבורכם את המתכונים שיתאימו
              לכם בצורה המירבית :)
            </Box>
          </Typography>
        </ThemeProvider>
        <Divider variant="fullWidth" light />
      </Grid>

      <Grid item md={4} >
        <CheckboxList
          handle={props.handleNewCategories}
          checked={props.categories}
          labels={[
            "משהו לבוהוריים",
            "משהו חגיגי",
            "משהו מהיר",
            "משהו לשישי",
            "משהו מושחת",
            "משהו מתוק",
            "משהו בריא",
          ]}
        />
      </Grid>
      <Grid item md={4} >
        <CheckboxList
          handle={props.handleNewCategories}
          checked={props.categories}
          labels={[
            "משהו איטלקי",
            "משהו מרוקאי",
            "משהו אמריקאי",
            "משהו בלקני",
            "משהו אסייאתי",
            "משהו תאילנדי",
            "משהו תימני",
          ]}
        />
      </Grid>
      <Grid item md={4} >
        <CheckboxList
          handle={props.handleNewCategories}
          checked={props.categories}
          labels={[
            "בשרי",
            "חלבי",
            "צמחוני",
            "טבעוני",
            "כשר",
            "ללא גלוטן",
            "ללא לקטוז",
          ]}
        />
      </Grid>

      <Grid item md={12}/>
      <Grid item md={12}/>

    </Grid>
  );
};

export default Personal;
