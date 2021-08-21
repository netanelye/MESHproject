import { Button, Container, Divider, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import FreeSearchBar from '../components/FreeSearchBar'
import { useStyles } from '../styles/styles'
import MeshButton from '../components/MeshButton'
import Recipe from '../components/Recipe'
import RecipeList from '../components/RecipieList'
import RecipieList from '../components/RecipieList'

const Home = (props) => {
    console.log(props.categories)
    const classes = useStyles();

   const [isFreeOrNot,setIsFreeOrNot] = useState(false)
    const [items, setItems] = useState();

   const [freeSearchValue, setFreeSearchValue] = useState();
   console.log(freeSearchValue)

   const [recipes,setRecipes] = useState([]);

   const onClickHandler = async (e) =>{
       //e.preventDefault();
       console.log(recipesJson)
       //const newData = await axios.get(/asd,params)

       setRecipes(recipesJson)

   }



    return (

            <Grid container spacing={3}  justifyContent='center' alignItems='center' className={classes.pageGrid}>
                {isFreeOrNot ? <Grid md={12}  align='center' item>
                   <FreeSearchBar setFreeSearchValue={setFreeSearchValue} ></FreeSearchBar>
                </Grid>: <Grid md={12}   alignContent='center' item>
                    <SearchBar setItems={setItems} ></SearchBar>
                </Grid> }
                
                
               
                
                <Grid  align='center' md={12} item>
                    {/* <MeshButton/> */}
                    <Button onClick={onClickHandler}>חפש לי מתכון יא שרמיט</Button>
                </Grid>

                <Grid className={ classes.gridDivider} item>
                    <Divider variant='fullWidth' light/>
                </Grid>

                <Grid flex>
                    <Container>
                        <RecipieList recipes={recipes}></RecipieList>
                    </Container>
                </Grid>

            </Grid>

    )
}

export default Home


const recipesJson = [
    {
        "recipe": {
          "categories": [
            "אוכל טוניסאי", 
            "אוכל טריפוליטאי", 
            "אוכל מרוקאי", 
            "אוכל שילדים אוהבים", 
            "ארוחה בשרית", 
            "ארוחות", 
            "ארוחות ערב", 
            "ארוחות צהריים", 
            "ארוחת שישי בערב", 
            "בשר", 
            "מנות עיקריות", 
            "מתכון מנצח - גרסת הבלוגרים", 
            "מתכוני עוף", 
            "מתכוני עמים ועדות", 
            "מתכונים ללא לקטוז", 
            "תבשילים", 
            "תוכניות בישול ואפייה", 
            "תפוחי אדמה"
          ], 
          "link": "https://foody.co.il/foody_recipe/%d7%9e%d7%a4%d7%a8%d7%95%d7%9d-%d7%a4%d7%a8%d7%95%d7%a1%d7%95%d7%aa-%d7%aa%d7%a4%d7%95%d7%97%d7%99-%d7%90%d7%93%d7%9e%d7%94-%d7%9e%d7%9e%d7%95%d7%9c%d7%90%d7%95%d7%aa-%d7%91%d7%91%d7%a9/", 
          "imageLink": "https://d3o5sihylz93ps.cloudfront.net/app/uploads/2018/10/14184405/%D7%90%D7%95%D7%9B%D7%9C-%D7%98%D7%95%D7%A0%D7%99%D7%A1%D7%90%D7%99-355x236.jpg", 
          "ingredients": [
            "בשר בקר טחון", 
            "בצל", 
            "שום", 
            "פטרוזיליה", 
            "כוסברה", 
            "חזה עוף שלם", 
            "לחם אחיד", 
            "פפריקה מתוקה", 
            "קינמון טחון", 
            "בהרט", 
            "אבקת מרק עוף", 
            "כורכום", 
            "מלח דק", 
            "פלפל שחור טחון", 
            "שמן קנולה", 
            "ביצה", 
            "תפוחי אדמה לאפייה ובישול של הדוד משה", 
            "קמח לבן", 
            "רסק עגבניות", 
            "עגבניות מרוסקות", 
            "פלפל שחור גרוס", 
            "אבקת מרק ירקות", 
            "מים רותחים"
          ], 
          "name": "המפרום של יונית צוקרמן – פרוסות תפוחי אדמה ממולאות בשר ברוטב עגבניות", 
          "recipeId": 159,
          "steps": 
          [
              "שלב ראשון",
              "שלב שני",
              "שלב שלישי",
              "שלב רביעי",
              "..."
          ]
        }
      },{
        "recipe": {
          "categories": [
            "אוכל טוניסאי", 
            "אוכל טריפוליטאי", 
            "אוכל מרוקאי", 
            "אוכל שילדים אוהבים", 
            "ארוחה בשרית", 
            "ארוחות", 
            "ארוחות ערב", 
            "ארוחות צהריים", 
            "ארוחת שישי בערב", 
            "בשר", 
            "מנות עיקריות", 
            "מתכון מנצח - גרסת הבלוגרים", 
            "מתכוני עוף", 
            "מתכוני עמים ועדות", 
            "מתכונים ללא לקטוז", 
            "תבשילים", 
            "תוכניות בישול ואפייה", 
            "תפוחי אדמה"
          ], 
          "link": "https://foody.co.il/foody_recipe/%d7%9e%d7%a4%d7%a8%d7%95%d7%9d-%d7%a4%d7%a8%d7%95%d7%a1%d7%95%d7%aa-%d7%aa%d7%a4%d7%95%d7%97%d7%99-%d7%90%d7%93%d7%9e%d7%94-%d7%9e%d7%9e%d7%95%d7%9c%d7%90%d7%95%d7%aa-%d7%91%d7%91%d7%a9/", 
          "imageLink": "https://d3o5sihylz93ps.cloudfront.net/app/uploads/2018/10/14184405/%D7%90%D7%95%D7%9B%D7%9C-%D7%98%D7%95%D7%A0%D7%99%D7%A1%D7%90%D7%99-355x236.jpg", 
          "ingredients": [
            "בשר בקר טחון", 
            "בצל", 
            "שום", 
            "פטרוזיליה", 
            "כוסברה", 
            "חזה עוף שלם", 
            "לחם אחיד", 
            "פפריקה מתוקה", 
            "קינמון טחון", 
            "בהרט", 
            "אבקת מרק עוף", 
            "כורכום", 
            "מלח דק", 
            "פלפל שחור טחון", 
            "שמן קנולה", 
            "ביצה", 
            "תפוחי אדמה לאפייה ובישול של הדוד משה", 
            "קמח לבן", 
            "רסק עגבניות", 
            "עגבניות מרוסקות", 
            "פלפל שחור גרוס", 
            "אבקת מרק ירקות", 
            "מים רותחים"
          ], 
          "name": "המפרום של יונית צוקרמן – פרוסות תפוחי אדמה ממולאות בשר ברוטב עגבניות", 
          "recipeId": 159,
          "steps": 
          [
              "שלב ראשון",
              "שלב שני",
              "שלב שלישי",
              "שלב רביעי",
              "..."
          ]
        }
      },{
        "recipe": {
          "categories": [
            "אוכל טוניסאי", 
            "אוכל טריפוליטאי", 
            "אוכל מרוקאי", 
            "אוכל שילדים אוהבים", 
            "ארוחה בשרית", 
            "ארוחות", 
            "ארוחות ערב", 
            "ארוחות צהריים", 
            "ארוחת שישי בערב", 
            "בשר", 
            "מנות עיקריות", 
            "מתכון מנצח - גרסת הבלוגרים", 
            "מתכוני עוף", 
            "מתכוני עמים ועדות", 
            "מתכונים ללא לקטוז", 
            "תבשילים", 
            "תוכניות בישול ואפייה", 
            "תפוחי אדמה"
          ], 
          "link": "https://foody.co.il/foody_recipe/%d7%9e%d7%a4%d7%a8%d7%95%d7%9d-%d7%a4%d7%a8%d7%95%d7%a1%d7%95%d7%aa-%d7%aa%d7%a4%d7%95%d7%97%d7%99-%d7%90%d7%93%d7%9e%d7%94-%d7%9e%d7%9e%d7%95%d7%9c%d7%90%d7%95%d7%aa-%d7%91%d7%91%d7%a9/", 
          "imageLink": "https://d3o5sihylz93ps.cloudfront.net/app/uploads/2018/10/14184405/%D7%90%D7%95%D7%9B%D7%9C-%D7%98%D7%95%D7%A0%D7%99%D7%A1%D7%90%D7%99-355x236.jpg", 
          "ingredients": [
            "בשר בקר טחון", 
            "בצל", 
            "שום", 
            "פטרוזיליה", 
            "כוסברה", 
            "חזה עוף שלם", 
            "לחם אחיד", 
            "פפריקה מתוקה", 
            "קינמון טחון", 
            "בהרט", 
            "אבקת מרק עוף", 
            "כורכום", 
            "מלח דק", 
            "פלפל שחור טחון", 
            "שמן קנולה", 
            "ביצה", 
            "תפוחי אדמה לאפייה ובישול של הדוד משה", 
            "קמח לבן", 
            "רסק עגבניות", 
            "עגבניות מרוסקות", 
            "פלפל שחור גרוס", 
            "אבקת מרק ירקות", 
            "מים רותחים"
          ], 
          "name": "המפרום של יונית צוקרמן – פרוסות תפוחי אדמה ממולאות בשר ברוטב עגבניות", 
          "recipeId": 159,
          "steps": 
          [
              "שלב ראשון",
              "שלב שני",
              "שלב שלישי",
              "שלב רביעי",
              "..."
          ]
        }
      },{
        "recipe": {
          "categories": [
            "אוכל טוניסאי", 
            "אוכל טריפוליטאי", 
            "אוכל מרוקאי", 
            "אוכל שילדים אוהבים", 
            "ארוחה בשרית", 
            "ארוחות", 
            "ארוחות ערב", 
            "ארוחות צהריים", 
            "ארוחת שישי בערב", 
            "בשר", 
            "מנות עיקריות", 
            "מתכון מנצח - גרסת הבלוגרים", 
            "מתכוני עוף", 
            "מתכוני עמים ועדות", 
            "מתכונים ללא לקטוז", 
            "תבשילים", 
            "תוכניות בישול ואפייה", 
            "תפוחי אדמה"
          ], 
          "link": "https://foody.co.il/foody_recipe/%d7%9e%d7%a4%d7%a8%d7%95%d7%9d-%d7%a4%d7%a8%d7%95%d7%a1%d7%95%d7%aa-%d7%aa%d7%a4%d7%95%d7%97%d7%99-%d7%90%d7%93%d7%9e%d7%94-%d7%9e%d7%9e%d7%95%d7%9c%d7%90%d7%95%d7%aa-%d7%91%d7%91%d7%a9/", 
          "imageLink": "https://d3o5sihylz93ps.cloudfront.net/app/uploads/2018/10/14184405/%D7%90%D7%95%D7%9B%D7%9C-%D7%98%D7%95%D7%A0%D7%99%D7%A1%D7%90%D7%99-355x236.jpg", 
          "ingredients": [
            "בשר בקר טחון", 
            "בצל", 
            "שום", 
            "פטרוזיליה", 
            "כוסברה", 
            "חזה עוף שלם", 
            "לחם אחיד", 
            "פפריקה מתוקה", 
            "קינמון טחון", 
            "בהרט", 
            "אבקת מרק עוף", 
            "כורכום", 
            "מלח דק", 
            "פלפל שחור טחון", 
            "שמן קנולה", 
            "ביצה", 
            "תפוחי אדמה לאפייה ובישול של הדוד משה", 
            "קמח לבן", 
            "רסק עגבניות", 
            "עגבניות מרוסקות", 
            "פלפל שחור גרוס", 
            "אבקת מרק ירקות", 
            "מים רותחים"
          ], 
          "name": "המפרום של יונית צוקרמן – פרוסות תפוחי אדמה ממולאות בשר ברוטב עגבניות", 
          "recipeId": 159,
          "steps": 
          [
              "שלב ראשון",
              "שלב שני",
              "שלב שלישי",
              "שלב רביעי",
              "שלב רביעי",  "שלב רביעי",  "שלב רביעי",  "שלב רביעי",  "שלב רביעי",
          ]
        }
      },
]