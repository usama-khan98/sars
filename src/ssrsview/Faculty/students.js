import React, { Component } from 'react';
import underconstruct from '../../assets/img/underconstruction.jpg'
class Student extends Component {
   
  render() {
    
    return (
        <div>
            <img src={underconstruct}/>
        </div>
    );
  }
}
export default Student;