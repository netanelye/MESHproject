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
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MeshLogo from '../assets/mesh.jpeg'
import { useStyles } from '../styles/styles';
import { Link } from 'react-router-dom';


const Recipe = (props) => {
const localRecipe = props.recipe;
  console.log(localRecipe)
  console.log(localRecipe.recipeId)

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card className={classes.recipeRoot}>
      <CardHeader
        title={localRecipe.name}
        subheader=""
      />
      <CardMedia align='center'
        className={classes.recipeMedia}
        
        title="Paella dish"
      >
        <img src={localRecipe.imageLink}/>
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={()=>window.open(localRecipe.link)}>
          <ShareIcon >
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
        {/* /* <Typography paragraph>Method:</Typography>
          {localRecipe.steps.map( (step, index) => { 
              if (index < 4) {

               return <Typography paragraph>
              {step}
            </Typography>
          } else if ( index == 4 ) 
          return <Typography paragraph>
          ...
        </Typography>
        else return null;
          })}


           */}
           <Typography> {localRecipe.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Recipe;
