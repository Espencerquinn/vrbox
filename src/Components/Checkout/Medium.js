import React, { Component } from 'react';
// import './App.css';
import StripeCheckout from 'react-stripe-checkout';
// import stripe from './stripeKey';
import axios from 'axios';
const {PUBLIC_KEY} = process.env

class Medium extends Component {
  onToken = (token) => {
    token.card = void 0;
    console.log('token', token);
    axios.post('/api/payment', { token, amount: 10000 } ).then(response => {
      alert('we are in business')
    });
  }

  render() {
    return (
      <div className="App">
        
        <StripeCheckout
          label="RENT"
          button_text= "test"
          data-label="test"
          token={this.onToken}
          stripeKey= {PUBLIC_KEY}
          amount={10000}
        />
      </div>
    );
  }
}

export default Medium;