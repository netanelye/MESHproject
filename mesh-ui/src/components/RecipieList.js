import { Container, Grid } from '@material-ui/core'
import React from 'react'
import Recipe from './Recipe'


const RecipieList = (props) => {
    return (
        <Container>

        <Grid container spacing={3}>
            {props.recipes.map((recipe) => 
            {
                return <Grid md={4} item alignItems="stretch">
                    <Recipe recipe={recipe}/>
                </Grid>

            })}
        </Grid>

        
        </Container>
    )
}

export default RecipieList;
