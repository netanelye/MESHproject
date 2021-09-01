import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MeshLogo from "../assets/mesh.jpeg";
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';
import MenuItem from './MenuItem';


const drawerWidth = 240;

export default function PersistentDrawerRight() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.mainToolbar}>
          <MenuIcon />
          <IconButton
            color="#451F76"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          ></IconButton>
          <Typography variant="h5" noWrap className={classes.title}>
          מֶש - מְבַשְּׁלִים עִם מָה שֶׁיֵּשׁ </Typography>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.navigationLogoContainer}>
          <img className={classes.navigationLogo} src={MeshLogo} />
        </div>

        <Divider />
        <List className={classes.navigationList}>
          <React.Fragment>
            <MenuItem
              lable={open ? "ראשי" : ""}
              icon={<HomeTwoToneIcon />}
              path="/"
              
            />
          </React.Fragment>

          <React.Fragment>
            <MenuItem
              lable={open ? "העדפות" : ""}
              icon={<FaceTwoToneIcon />}
              path="/personal"
              
            />
          </React.Fragment>

          <React.Fragment>
            <MenuItem
              lable={open ? "המומלצים" : ""}
              icon={<StarTwoToneIcon />}
              path="/favorites"
              
            />
          </React.Fragment>

          <React.Fragment>
            <MenuItem
              lable={open ? "קצת עלינו" : ""}
              icon={<StarTwoToneIcon />}
              path="/about"
              
            />
          </React.Fragment>
        </List>
      </Drawer>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  //Navigation Logo
  navigationLogo: {
    width: "80%",
  },
  navigationLogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(6),
  },
  mainToolbar : {
    backgroundColor: '#A074C4'
},

}));
