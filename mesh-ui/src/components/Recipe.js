import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MeshLogo from '../assets/mesh.jpeg'
import { useStyles } from '../styles/styles';
import { Link } from 'react-router-dom';
import {
  MuiThemeProvider,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";



const Recipe = (props) => {
const localRecipe = props.recipe;
  console.log(localRecipe)
  console.log(localRecipe.recipeId)

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

 const match = {
   matchP: props.recipe.matchPrecentage
 }
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Rubik',
      ].join(','),
    },});


  return (
    <MuiThemeProvider theme={theme}>
    <Card className={classes.recipeRoot}>
      <CardHeader
        titleTypographyProps={{variant:'h5'}}
        title={localRecipe.name}
        />
      <CardMedia align='center'
        className={classes.recipeMedia}
        title=""
        >
        <img className={classes.recipeImage} src={localRecipe.imageLink}/>
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {localRecipe.matchPrecentage}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share" onClick={()=>window.open(localRecipe.link)}>
          <ShareIcon>
          </ShareIcon>

        </IconButton>
        <IconButton
          className={clsx(classes.recipeExpand, {
            [classes.recipeExpandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

           <Typography>
             <Box>
              {localRecipe.description}
             </Box>
             </Typography>
        </CardContent>
      </Collapse>
    </Card>
  </MuiThemeProvider>
  );
}

export default Recipe;
