import React from 'react';
import logo from '../Header/logo.png'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import './AppHeader.scss';



  const styles = {
    MuiAppBar: {
      background: 'black',
    },
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    button: {
      justfiyContent: 'center',
      // textDecoration: 'none',
      // marginLeft: 0,
      // width: '100%',
      //   [theme.breakpoints.up('sm')]: {
      // marginLeft: theme.spacing.unit,
      // width: 'auto',
    },
  };

  
  function AppHeader(props) {
    const { classes, logoutFn } = props;
 

  return (
    <div className="App"> 
      <div className={classes.root}>
        <AppBar  position="static" style={{ background: 'black'}} >
          <Toolbar className='home-header'>
            <Link to ='/' > <img src={logo} height="40px"width="auto;" alt= "Logo"  className="logo"/> </Link>
            <div className='buttons'>
              {/* <Link to ='/' style={{ textDecoration: 'none', color:'white' }}> <Button className='login'  color="inherit" > HomePage </Button> </Link> */}
              <Link to ='/private' style={{ textDecoration: 'none', color:'white' }}> <Button className='login'  color="inherit" > Dashboard </Button> </Link>
              <Link to ='/registration' 
              style={{ textDecoration: 'none', color:'white' }} 
              onClick={ e => logoutFn()}
              > <Button className='register' color="inherit"> Logout </Button> </Link>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div className='video'>
      
      </div>
  </div>
    );
  }


AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppHeader);


