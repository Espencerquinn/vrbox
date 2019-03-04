import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextIcon from '@material-ui/icons/Textsms';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'
import Particles from 'react-particles-js';

import './album.scss';






const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    // backgroundColor: theme.palette.background.paper,
    margin: '0 auto',
    display: "inline-block"
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

const particleOpt = {
                        particles: {
                          number: {
                            value: 70,
                            desnsity: {
                              enable: true,
                              value_aea: 100
                            }
                          }
                        }
                    }





function album(props) {
  const { classes } = props;
  const {propertyList, userFirstName, openModal} = props;
  console.log("Find",propertyList)

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className="background">
        <Particles className="particles"
                    params={particleOpt}
                    />
                    </div>
        <div className={classes.heroUnit}>
         
          <div className={classes.heroContent}>
          
            <Typography className="headertext" component="h1" variant="h2" align="center" color="white" gutterBottom>
              Hello {userFirstName}
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Ready to sell your next property? Share a walkthough with a client with a just a few simple clicks.   
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                <Link to ='/private/rentacamera' style={{ textDecoration: 'none', color:'white' }}><Button variant="contained" color="primary">
                    Rent a Camera
                  </Button></Link>
                </Grid>
                <Grid item>
                <Link to ='/private/addproperty' style={{ textDecoration: 'none', color:'white' }}><Button variant="outlined" color="primary">
                    Add a Property
                  </Button></Link>
                </Grid>
                <Grid item>
                <Link to ='/private/updateuser' style={{ textDecoration: 'none', color:'white' }}><Button variant="outlined" color="primary">
                    Update Profile
                  </Button></Link>
                </Grid>
              </Grid>
              
            
          </div>
        </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40}>
            {propertyList.map((card, i) => (
              <Grid item key={i} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  {/* <CardMedia
                    className={classes.cardMedia}
                    title="Image title"
                  /> */}
                  <img className="propertiesimg" alt='logo' src={card.img}></img>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                      {card.price}
                    </Typography>
                    <Typography>
                      {card.address}
                    </Typography>
                    <Typography>
                      {card.city}, {card.state} {card.zip}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    
                    <IconButton aria-label="Share"
                    onClick={openModal}
                    >
                      <TextIcon/>
                    </IconButton>
                    <IconButton aria-label="Share">
                      <EmailIcon/>
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </main>
      {/* Footer */}
      
      {/* End footer */}
    </React.Fragment>
  );
}

album.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(album);