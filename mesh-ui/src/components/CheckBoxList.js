import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    //  maxWidth: 240,
    backgroundColor: "#E8D5F4",
    borderRadius: 50
  },
}));

export default function CheckboxList(props) {
  console.log(props.checked);
  const classes = useStyles();

  const labels = props.labels ? props.labels : [];
  const [checked, setChecked] = React.useState(
    props.checked ? props.checked : []
  );

  useEffect(() => {
    setChecked(props.checked ? props.checked : []);
  }, [props.checked]);

  //When selecting a box
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    props.handle(newChecked);
    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {labels.map((value) => {
        const labelId = value;

        return (
          <ListItem
            key={value}
            role={undefined}
            dense
            button
            onClick={handleToggle(value)}
          >
           
            <ListItemText style={{display:'flex', justifyContent:'center'}} id={labelId} primary={value} />
            <ListItemIcon style={{display:'flex', justifyContent:'center'}} >
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemSecondaryAction alignItemsFlexStart>
              <IconButton edge="end" aria-label="comments">
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
