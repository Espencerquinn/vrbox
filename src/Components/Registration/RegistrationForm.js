import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import blacklogo from './blacklogo.png'
import Profile from './Profile';
import {connect} from 'react-redux';
import axios from 'axios';



// import Review from './Review';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Personal Info', 'Profile Picture', ];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm
      // setAttributeFn= {(key, value)=>{setAttribute(key,value)}}
      />;
    case 1:
      return <Profile />;
    default:
      throw new Error('Unknown step');
  }
}

class RegistrationForm extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };


  handlePost = async() => {
    console.log('were here')
   const res = await axios.post('/auth/register', this.props.userObj)
  console.log(res)
  }

  handleNextSubmit = () => {
    if (this.state.activeStep === 0){
      this.handleNext()
    }
    else {
      this.handlePost()
    }
  }

  

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange= (prop, val) => {
    this.setState({
        [prop]:val
    })
}

  setAttribute= (key, value) => {
    console.log(key, value)
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        
        <main className={classes.layout}>
          <Paper className={classes.paper}>
          <img src={blacklogo} height="40px"width="auto;" alt= "Logo" className="logo"/>
            <Typography component="h1" variant="h5" align="center">
              Registration
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Congrats! You have successfully created an account with VR Box. You will receive an email and text message confirming your registration. 
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNextSubmit}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    userObj: state
  }
}

const RegistrationFormConnect = connect (mapStateToProps)(RegistrationForm);

RegistrationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegistrationFormConnect);