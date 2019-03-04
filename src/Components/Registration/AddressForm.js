import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux'
import {setAttribute} from '../../ducks/reducer'



class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
    }
  }

  render () {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="fname"
              // onChange={ e => handleChangeFn('firstname', e.target.value)}
              onBlur={(e) => this.props.setAttribute({firstname: e.target.value})}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastname"
              label="Last name"
              fullWidth
              autoComplete="lname"
              // onChange={ e => handleChangeFn('lastName', e.target.value)}
              onBlur={(e) => this.props.setAttribute({lastname: e.target.value})}

            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="Username"
              name="Username"
              label="Username"
              fullWidth
              autoComplete="Username"
              // onChange={ e => handleChangeFn('Username', e.target.value)}
              onBlur={(e) => this.props.setAttribute({username: e.target.value})}

            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Email"
              name="Email"
              label="Email"
              fullWidth
              autoComplete="Phone Number"
              // onChange={ e => handleChangeFn('Email', e.target.value)}
              onBlur={(e) => this.props.setAttribute({email: e.target.value})}

            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Phone Number"
              name="Phone Number"
              label="Phone Number"
              fullWidth
              autoComplete="Phone Number"
              // onChange={ e => handleChangeFn('Phone Number', e.target.value)}
              onBlur={(e) => this.props.setAttribute({phonenumber: e.target.value})}

            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

let mapDispatchToProps = {
  setAttribute 
}

export default connect (null, mapDispatchToProps)(AddressForm);

