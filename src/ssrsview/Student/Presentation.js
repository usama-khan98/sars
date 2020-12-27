import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Progress ,Input} from 'reactstrap';
import axios from 'axios';
import nodataImage from '../../assets/img/nodata.png';


export default class Presentation extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      presentationList:[]
    };
  }

  componentWillMount(){
    
    var id=localStorage.getItem('user_id');

      axios.post('/api/student/presentations',{id:id})
      .then(res=>{
        console.log(res.data.presentationList);
        this.setState({
          presentationList:res.data.presentationList
        })
      })
      .catch(err=>{
        console.log(err);
      })
  }

  render() {
    const presentationListItem = this.state.presentationList.map((presentation,index) => 
      <tr scope="row" key={index}>
      <td>{presentation.synopsis.title}</td>
      <td>{presentation.student.fname+" "+presentation.student.lname}</td>
      <td>{presentation.student.regNumber}</td> 
      <td>{new Date(presentation.date).toLocaleString().substring(0,10)}</td>
      <td>{
      (presentation.timeSlot==="1")?
      "9:00Am - 9:30AM":
      (presentation.timeSlot==="2")?
      "10:00Am - 10:30AM":
      (presentation.timeSlot==="3")?
      "11:00Am - 11:30AM":
      (presentation.timeSlot==="4")?
      "12:00Pm - 12:30PM":
      (presentation.timeSlot==="5")?
      "2:00Pm - 2:30PM":
      (presentation.timeSlot==="6")?
      "3:00Pm - 3:30PM":"4:00Pm - 4:30PM"
      }</td>
      <td>{presentation.venu}</td>
      <td>{presentation.participent1}<br></br>{presentation.participent2}<br></br>{presentation.participent3}</td>
      </tr>
)
    return (
        <div>
          <Card style={{width:'92%',marginLeft:"1%",marginTop:'2%',}}>
          <CardHeader style={{textAlign:'center',backgroundColor:'#647280'}}>
          <h3>Presentation</h3>
          </CardHeader>
          <CardBody>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Assignment Title</th>
                <th scope="col">Student Name</th>
                <th scope="col">Student Reg#</th>
                <th scope="col">Date</th>
                <th scope="col">Time Slot</th>
                <th scope="col">Room No#</th>
                <th scope="col">Participants</th>
              </tr>
            </thead>
            <tbody>
            {(presentationListItem.length!==0)?
               presentationListItem :
               <tr>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td><img src={nodataImage}></img></td>
                 <td></td>
                 <td></td>
                 <td></td>
               </tr>
               }
            </tbody>
          </table>
          </CardBody>
        </Card>
        </div>
    );
  }
}
