import { makeStyles } from "@material-ui/core"
import { TheatersOutlined } from "@material-ui/icons";

export const useStyles = makeStyles( (theme) => ({

    navigationHeader: {
        width: '80%',
        // display: 'flex',
        align: 'center'
    },

// Recipe 

recipeRoot: {
    maxWidth: 700,
    backgroundColor: "#E8D5F4",
  },
  receipeMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  recipeExpand: {
    transform: 'rotate(0deg)',
    marginRight: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  recipeExpandOpen: {
    transform: 'rotate(180deg)',
  },


//Pages
    appRoot: {
       display: 'flex',
    },
    pageGrid: {
        height: '100%',
        minHeight:'100vh',
        background: "#F3E9F9"
    },

// Home Page:

    gridDivider: {
        width: '100%',
    },
    homeRoot: {
        background: "#F3E9F9"
    },



//App Bar
    appBar: {
        backgroundColor:'#735AA2',
        // [theme.breakpoints.up('sm')] : {
        //     display: 'none'
        // }
    },
    appBarSpacer: {
        // [theme.breakpoints.down('xs')]: {
        //     ...theme.mixins.toolbar,
        // }
        // toolbar: theme.mixin.toolbar,
    },
    appBarDivAligner : {
        flex : 1
    },
    
// Navigation Drawer 
    navigationDrawer: {
        width: 240,
        border: 'none',
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
        //position: 'relative',
        height: '100vh',
        background: 'red'
    },
    navigationDrawerCollapse: {
        width: theme.spacing(9),
    },


//Navigation Logo  
    navigationLogo: {
        width: '80%',
    },
    navigationLogoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: theme.spacing(6),
    },  

// Navigation Tool Bar
    navigationToolBar: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: theme.spacing(1),
        ...theme.mixins.toolbar
    },
    navigationToolBarCollapse: {
        justifyContent: 'center',
        paddingRight: 0,
    },
   
// Navigation List
    navigationList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    navigationSpacer: {
        flex: 1
    },

// Menu Items
    menuItem: {
        width: '80%',
        borderRadius: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    menuItemActive: {
        width: '100%',
        backgroundColor: "#EBEBEC"
    },
}));