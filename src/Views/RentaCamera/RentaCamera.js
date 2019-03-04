import React, { Component } from 'react';
import Pricing from '../../Components/Pricing/Pricing'
import axios from 'axios';
import './RentaCamera.scss';
import Footer from '../../Components/Footer/Footer'

class RentaCamera extends Component {

  chargeUser(){
    console.log('hit register')
    axios.post('/api/payment')
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }


  render() {
       
    return (
           <div className="Body">
                <Pricing
                chargeUserFn={this.chargeUser}
                />
                <Footer/>
           </div>
             
           
    );
  }
}

export default RentaCamera;
