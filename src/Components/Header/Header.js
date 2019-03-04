import React from 'react';
import logo from '../Header/logo.png'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import './Header.scss';



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

  
  function ButtonAppBar(props) {
    const { classes } = props;


    
  return (
    <div className="App"> 
      <div className={classes.root}>
        <AppBar title={<img  alt='logo' src="https://unsplash.it/40/40"/>} position="static" style={{ background: 'black'}} >
          <Toolbar className='home-header'>
            <Link to ='/' > <img src={logo} height="40px"width="auto;" alt= "Logo" className="logo"/> </Link>
            <div className='buttons'>
              <Link to ='/login' style={{ textDecoration: 'none', color:'white' }}> <Button className='login'  color="inherit" > Login </Button> </Link>
              <Link to ='/registration' style={{ textDecoration: 'none', color:'white' }} > <Button className='register' color="inherit"> Register </Button> </Link>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div className='video'>
      
      </div>
  </div>
    );
  }


ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);


