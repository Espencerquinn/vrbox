import React, { Component } from 'react';
// import './App.css';
import StripeCheckout from 'react-stripe-checkout';
// import stripe from './stripeKey';
import axios from 'axios';
const {PUBLIC_KEY} = process.env

class Large extends Component {
  onToken = (token) => {
    token.card = void 0;
    console.log('token', token);
    axios.post('/api/payment', { token, amount: 100000 } ).then(response => {
      alert('we are in business')
    });
  }

  render() {
    return (
      <div className="App">
        
        <StripeCheckout
          label="HIRE"
          token={this.onToken}
          stripeKey= {PUBLIC_KEY}
          amount={100000}
        />
      </div>
    );
  }
}

export default Large;