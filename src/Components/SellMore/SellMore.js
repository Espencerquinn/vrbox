import React, { Component } from 'react'
import demo from './demo.mp4'
import './sellmore.scss';



export default class SellMore extends Component {
  render() {
    return (
      <div className="sellmore-container">
          
          
          

         <video
            className='video2Tag' 
            id="background-video"
             
            onPause loop muted
            type="video/mp4"
            width="100%" height="100%"
            >
          
            <source src={demo} type='video/mp4'/>
            
            </video>
      </div>
    )
  }
}
