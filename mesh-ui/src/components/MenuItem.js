import { Button, Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Home from '@material-ui/icons/Home';
import React from 'react';
import clsx from 'clsx';
import { useStyles } from '../styles/styles';
import { Link } from "react-router-dom";

const MenuItem = ({ lable, icon, path, onClick }) => {
    const classes = useStyles();
    const [active, setActive] = React.useState(true);


    return (
        <ListItem className={ clsx(classes.menuItem, active && classes.menuItemActive) } 
                button component={Link} to={path} onClick={onClick}>
            <ListItemText align='center' primary={lable} primaryTypographyProps= {{variant: "body2"}}/>        

            <ListItemIcon>
               {icon}
            </ListItemIcon>
        </ListItem>
    );
}

export default MenuItem