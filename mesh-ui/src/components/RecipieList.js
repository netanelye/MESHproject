


import { Container, Grid } from '@material-ui/core'
import React from 'react'
import Recipe from './Recipe'


const RecipieList = (props) => {

    console.log(props.recipes)
    return (
        <Container>

        <Grid container spacing={3}>

            {props.recipes.map((recipe) => 
            {
                return <Grid md={6} item>
                    <Recipe recipe={recipe}/>
                </Grid>
            })}


            {/* <Grid md={6} item>
                <Recipe/>
            </Grid>
            <Grid md={6} item>
                <Recipe/>
            </Grid>
            <Grid md={6} item>
                <Recipe/>
            </Grid>
            <Grid md={6} item>
                <Recipe/>
            </Grid>
            <Grid md={6} item>
                <Recipe/>
            </Grid> */}
        </Grid>
        </Container>
    )
}

export default RecipieList;
