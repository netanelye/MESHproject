import { Grid } from '@material-ui/core'
import React from 'react'
import CheckboxList from '../components/CheckBoxList'
import { useStyles } from '../styles/styles'

const Personal = (props) => {

    console.log(props.categories)
    const classes = useStyles();

    return (
        
        <Grid container spacing={6} justifyContent='center' alignItems='center' className={classes.pageGrid}>

            <Grid item md={6} alignContent='center'>
            <CheckboxList handle={props.handleNewCategories} checked={props.categories} labels={["a","b","c","d"]}/>
            </Grid>

            <Grid item md={6} alignContent='center'>
            <CheckboxList handle={props.handleNewPreference} checked={props.preference} labels={["3","2","3","4"]}/>
            </Grid>

        </Grid>
        
    )
}

export default Personal
