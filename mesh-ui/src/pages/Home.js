import { Container, Divider, Grid } from '@material-ui/core'
import React from 'react'
import SearchBar from '../components/SearchBar'
import FreeSearchBar from '../components/FreeSearchBar'
import { useStyles } from '../styles/styles'

const Home = () => {
    const classes = useStyles();

    const getData = () => {


    }

    return (
       <Container  maxWidth="md">

            <Grid container spacing={3} direction='column' justifyContent='center' alignItems='center' className={classes.pageGrid}>


                <Grid item>
                   <FreeSearchBar></FreeSearchBar>
                </Grid>
                
                <Grid item>
                    <SearchBar></SearchBar>
                </Grid>
                
                <Grid item>
                    {/* <SearchBar></SearchBar> */}
                    MESH SEARCH BUTTON
                </Grid>

                <Grid item>
                    {/* <SearchBar></SearchBar> */}
                    
                </Grid>


                <Grid item justifyContent='flex-end'>
                    search results
                </Grid>
            
            </Grid>

        </Container>
    )
}

export default Home
