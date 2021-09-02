import { makeStyles } from "@material-ui/core"
import { TheatersOutlined } from "@material-ui/icons";
import { fontFamily } from "@material-ui/system";
import Image from "../assets/white2.jpg";
import ButtomImage from  "../assets/btn.jpg";
import MeshButton from "../components/MeshButton";
export const useStyles = makeStyles( (theme) => ({

    recipeImage: {
        width:'100%'
    },

    meshButton: {
        width: '300px',
        height: '100px',
        background: '#5F8FE8',
        backgroundImage: `url(${ButtomImage})`,
    },

    background: {
        // minHeight: '100vh',
        // backgroundImage: `url(${Image})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        // backgroundAttachment:'fixed',
        backgroundColor:" #f0f5f5"
      },

navigationHeader: {
    width: '80%',
    // display: 'flex',
    align: 'center'
    },

// Recipe 

recipeRoot: {
    maxWidth: 700,
    // maxHeight:450,
    backgroundColor: "#E8D5F4",
    borderRadius: 50,
  },
  receipeMedia: {
    height: 0,
    paddingTop: '75%', // 16:9
    borderRadius: 50,

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
        background: "#f0ede9",
        backgroundColor: 'rgba(188, 150, 233, 0.05)',
    },

// Home Page:

    gridDivider: {
        width: '100%',
    },
    homeRoot: {
        background: "#f0ede9"
    },



//App Bar
    appBar: {
        backgroundColor:'#735AA2',
    },
    appBarSpacer: {
    },
    appBarDivAligner : {
        flex : 1
    },
    
// Navigation Drawer 
    navigationDrawer: {
        marginTop:'0%',
        width: 240,
        border: 'none',
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
        //position: 'relative',
        height: '100vh',
        background: '#A16BE1'
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