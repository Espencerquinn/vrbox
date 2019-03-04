import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Album from '../../Components/Album/Album'
import AppHeader from '../../Components/AppHeader/AppHeader'
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Footer from '../../Components/Footer/Footer'



import './Dashboard.css';

function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
    card: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
  });
  
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            propertyList:[],
            open: false,
            id: '{user.id}',
            disabled: true,
            message: {
              to: '',
              body: ''
            },
            submitting: false,
            error: false,
            user: {}
        }
        this.deleteProperty = this.deleteProperty.bind(this)
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
      this.getUsers()
    }
  
    getUsers(){
      console.log("hit")
      axios.get('/api/private/getUser')
          .then((res) => {
            console.log("SESSION", res.data.user)
              this.setState({user: res.data.user})
          })
          axios.get('/api/properties')
            .then((res) => {
                this.setState({
                    propertyList: res.data
                })
            })

            .catch(err => console.log("error:"+ err))
          
    
        }

    handleChange(prop, val) {
        this.setState({
            [prop]:val
        })
    }

    onHandleChange(event) {
      const name = event.target.getAttribute('name');
      this.setState({
        message: { ...this.state.message, [name]: event.target.value }
      });
    }

    logout = () => {
      axios.post('/auth/logout')
      .then(res => {
          // this.props.updateUser({});
          this.props.history.push('/');
      })
      .catch(err => {
          console.log(err)
      })
  }
 
    handleOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    deleteProperty(id){
        axios.delete(`/api/properties/${id}`)
        .then((res) => {
            this.setState({
                houseList: res.data
            })
        })
    }

    onSubmit(event) {
      console.log('submit')
      event.preventDefault();
      this.setState({ submitting: true });
      fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.message)
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.setState({
              error: false,
              submitting: false,
              message: {
                to: '',
                body: ''
              }
            });
          } else {
            this.setState({
              error: true,
              submitting: false
            });
          }
        });
    }


    render() {
    console.log('showmethemoney',this.state)
    const {propertyList, user }= this.state
    const { classes } = this.props
        return (
            <div>
            <AppHeader
            logoutFn={this.logout}
            />
            <Album
            deletePropertyFn={this.deleteProperty}
            propertyList={propertyList}
            userFirstName={user.firstname}
            openModal={this.handleOpen}
            />
            <Footer/>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
            >
              <div style={getModalStyle()} className={classes.paper}>
                <Typography variant="h6" id="modal-title" gutterBottom>
                  Send a VR link to a client
                </Typography>
                <Grid container spacing={24}
                justify="center"
                alignItems="center">
                <Grid item xs={12}
                
                >
                <TextField
                id="outlined-textarea"
                label="Phone Number"
                placeholder="+1(000) 000-000"
                type="tel"
                name="to"
                value={this.state.message.to}
                onChange={(e)=>this.onHandleChange(e)}
                />
                
                <TextField
                id="outlined-textarea"
                label="Message"
                placeholder="Placeholder"
                multiline
                className={classes.textField}
                margin="normal"
                variant="outlined"
                name="body"
                value={this.state.message.body}
                onChange={(e)=>this.onHandleChange(e)}
                
                />
                </Grid>
                </Grid>
                <Button  
                onClick={(e)=>this.onSubmit(e)}>Send</Button>
                </div>
              </Modal>
              
            </div> 
        )  
    
        
    
    }
}
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };


  
  export default withStyles(styles)(Dashboard);
  