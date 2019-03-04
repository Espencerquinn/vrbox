import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AppHeader from '../AppHeader/AppHeader'
import Low from '../Checkout/Low'
import Medium from '../Checkout/Medium'
import Large from '../Checkout/Large'
import Pano from '../Pricing/3dpano.png'
import Box from '../Pricing/expertbox.png'
import Small from '../Pricing/smallCamera.png'

// import 3dpano from '/3dpano'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

const tiers = [
  {
    title: 'Starter Kit',
    subheader: 'Do it yourself',
    price: '10',
    description: [
      'Download the App', 
      'Unlimited Uploads', 
      'Email Support', 
      'Image Consulting'],
    buttonText: 'Dowload the app',
    buttonVariant: 'outlined',
    checkout: <Low/>,
    img: <img src={Pano} height="150px"width="100%;" alt= "Logo"  className="logo"/>
  },
  {
    title: 'Pro Rental',
    subheader: 'Most popular',
    price: '100',
    description: [
      'High',
      'Perfet for DIY',
      'Help center access',
      'Phone Support',
    ],
    buttonText: 'Rent Camera Today',
    buttonVariant: 'contained',
    checkout: <Medium/>,
    img: <img src={Small} height="150px"width=";" alt= "Logo"  className="logo"/>


  },
  {
    title: 'Hire a Pro',
    subheader: 'Highest Quality',
    price: '1000',
    description: [
      '3 Day turn around',
      'Professional Photographer',
      '24 hour image processing',
      'Priority Phone support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
    checkout: <Large/>,
    img: <img src={Box} height="150px"width="100%;" alt= "Logo"  className="logo"/>

  },
];


function Pricing(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppHeader/>
      <main className={classes.layout}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Options for any budget
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" component="p">
            Take pictures yourself, 
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" component="p">
            rent a camera,
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" component="p">
            or hire a Pro
          </Typography>
        </div>
        {/* End hero unit */}
        <Grid container spacing={40} alignItems="flex-end">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                       {tier.img}
                       <br></br>
                      ${tier.price}
                    </Typography>
                    
                    <Typography variant="h6" color="textSecondary">
                      
                    </Typography>
                  </div>
                  {tier.description.map(line => (
                    <Typography variant="subtitle1" align="center" key={line}>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
                    {tier.checkout}
                    
                <CardActions className={classes.cardActions}
                 >
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
      {/* Footer */}
      
    </React.Fragment>
  );
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pricing);