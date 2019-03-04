import React, { Component } from 'react';
import Header from '../../Components/Header/Header'
import VideoBackground from '../../Components/Video Background/VideoBackground'
import HowItWorks from '../../Components/How it works/howitworks'
import SellMore from '../../Components/SellMore/SellMore'
import Footer from '../../Components/Footer/Footer'
// import routes from '../../routes'
// import './App.css';

class HomePage extends Component {
  render() {
       
    return ( 
          <div className="Homepage">
            <Header/>
            <VideoBackground/>
            <HowItWorks/>
            <SellMore/>
            <Footer/>
          </div>    
    );
  }
}

export default HomePage;
