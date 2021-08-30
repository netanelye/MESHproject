import React from 'react'
import { Drawer, Typography, List, IconButton, useTheme, useMediaQuery, AppBar, Toolbar } from '@material-ui/core';
import { useStyles } from '../styles/styles';
import MenuItem from './MenuItem';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';
import MeshLogo from '../assets/mesh.jpeg'
import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import clsx from 'clsx'

const Navigation = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    const toggleNavigation = () => {
        setOpen(!open);
    };

    const closeNavigation = () => {
        if (matches) {
            setOpen(false);
        }
    };

    return (
        <div>

            <AppBar className={classes.appBar}>
                <Toolbar>
                    <div className={classes.appBarDivAligner} ></div>
                    <IconButton onClick={toggleNavigation} edge='end' color='inherit' aria-label='Menu' marginRight={theme.spacing(2)}>
                        <MenuTwoToneIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar> 

           <Drawer variant={matches ? 'temporary' : 'permanent'} anchor="right" open={open} 
                classes={{ paper: clsx(classes.navigationDrawer, !open&&classes.navigationDrawerCollapse)}}>

               
                 <div className={clsx(classes.navigationToolbar, !open && classes.navigationToolbarCollapse)}>
                    <IconButton onClick={toggleNavigation}>
                        { open ? <ChevronRightTwoToneIcon/> : <MenuOpenRoundedIcon/>}
                    </IconButton>
                </div>
                
                <div className={classes.navigationLogoContainer}>
                    <img className={classes.navigationLogo} src={ MeshLogo }/>
                </div>
               
               <List className={classes.navigationList}>
                    <React.Fragment>
                        <MenuItem lable={open ? "ראשי" : "" } icon={<HomeTwoToneIcon />} path="/" onClick={closeNavigation}/>
                    </React.Fragment>

                    <React.Fragment>
                        <MenuItem lable={open ? "העדפות" : "" } icon={<FaceTwoToneIcon/>} path="/personal"  onClick={closeNavigation}/>
                     </React.Fragment>

                     <React.Fragment>
                        <MenuItem lable={open ? "המומלצים" : "" } icon={<StarTwoToneIcon/>} path="/favorites"  onClick={closeNavigation}/>
                     </React.Fragment>
               </List>

            </Drawer>

        </div>
    )
}

export default Navigation
