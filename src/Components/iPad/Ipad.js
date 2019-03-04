import React, { Component } from 'react'
import './Ipad.scss';
import iPad from './ipad.mp4'



export default class Ipad extends Component {
  render() {
    return (
      <div className="animation">
          <video
            className='video2Tag' 
            id="background-video"
             
            autoPlay loop muted
            type="video/mp4"
            width="50%" height="50%"
            >
          <source src={iPad} type='video/mp4'/>
          </video>
          <div className="iPad"> 
        </div>
      </div>
    )
  }
}
