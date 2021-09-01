import React from 'react';
import { render } from 'react-dom';
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';


const MeshButton = props => {
  return (
    <MuiThemeProvider>
          <Button color="#735AA2" size="large" secondary  variant="contained" buttonStyle={{ borderRadius: 50 }} style={{borderRadius:50}}>חפש מתכון</Button>
  </MuiThemeProvider>
  );
};

export default MeshButton





































































// import { ReactComponent as btn } from "../assets/MeshButton.svg";
// import React, { useState, useEffect } from 'react'
// import { makeStyles } from "@material-ui/core";
// import { Typography } from "@material-ui/core";
// import { SvgIcon } from "@material-ui/core";

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   label: {
//     position: 'absolute',
//     color: 'white',
//   },
// }));


// const MeshButton = props => {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <SvgIcon
//         component={btn}
//         style={{ width: 200, height: 100 }}
//         viewBox="0 0 200 100"
//       />
//       <Typography className={classes.label}>{props.label}</Typography>
//     </div>
//   );
// };

// export default MeshButton
// // // ...

// // <ButtonBase focusRipple>
// //   <CustomSvgButton label="Submit" />
// // </ButtonBase>
