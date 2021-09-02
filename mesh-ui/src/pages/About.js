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
import { useEffect, useState } from "react";

const About = (props) => {
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
      className={classes.pageGrid}
    >
       <Grid md={12} alignItems="flex-start" item>
        <ThemeProvider theme={theme}>
          <Typography component="div">
            <Box
              fontWeight="fontWeightMedium"
              m={1}
              fontSize={46}
              letterSpacing={3}
            >
              קצת עלינו
            </Box>
          </Typography>
        </ThemeProvider>
        <Divider variant="fullWidth" light />

        <ThemeProvider theme={theme}>
          <Typography component="div">
            <Box
              fontWeight="fontWeightMedium"
              m={1}
              pt={5}
              fontSize={24}
              letterSpacing={3}

            >
עם התפתחות עולם הבישול הביתי, במיוחד בתקופת הסגרים והמגבלות על מסעדות, ומתוך
שאיפה לגיוון קולינרי, חל גידול משמעותי בחיפוש מתכונים באמצעות האינטרנט.
הנחנו שיציאה מהבית למכולת עלולה להיות לא חופשית כבעבר, ומכאן שאתרי המתכונים
ה"מסורתיים" יאבדו מיעילותם. במילים אחרות, אנשים שהיו נוהגים לרכוש מוצרי מזון על בסיס מתכון
מסוים לא יוכלו לעשות זאת.

               <Box
              fontWeight="fontWeightMedium"
              m={1}
              pt={5}
              fontSize={24}
              letterSpacing={3}

            >
 מטרתנו להקים אפליקציה שתעבוד בכיוון ההפוך - הזנת מצרכים הזמינים בנקודת
זמן נתונה בבית וקבלת רשימת מתכונים המכוונת למצרכים אלה.
          </Box>
          </Box>
             <Box
              fontWeight="fontWeightMedium"
              m={1}
              pt={5}
              fontSize={24}
              letterSpacing={3}

            >
האפליקציה פותחה במסגרת סדנת "יישומי רשת" בהנחיית אמיר קירש
בשנת הלימודים תשפ"א-2021

          </Box>
            <Box
              fontWeight="fontWeightMedium"
              m={1}
              pt={4}
              fontSize={24}
              letterSpacing={3}

            >

נשמח לשמוע מכם:
נתנאל ירושלמי - netanelye@mta.ac.il
           ערן שמואל - netanelye@mta.ac.il
               דור פיזם - netanelye@mta.ac.il
          </Box>
          </Typography>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};

export default About;
