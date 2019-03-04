import React, { Component } from 'react';
import Header from '../../Components/Header/Header'
import VideoBackground from '../../Components/Video Background/VideoBackground'
import HowItWorks from '../../Components/How it works/howitworks'
import SellMore from '../../Components/SellMore/SellMore'
import Footer from '../../Components/Footer/Footer'
import Ipad from '../../Components/iPad/Ipad'
// import routes from '../../routes'
// import './HomePage.scss';

class HomePage extends Component {
  render() {
       
    return ( 
          <div className="Homepage">
            <Header className="part1"/>
            <VideoBackground className="part2"/>
            <HowItWorks className="part3"/>
            <Ipad className="part4"/>
            <SellMore className="part5"/>
            <Footer className="part6"/>
          </div>    
    );
  }
}

export default HomePage;
