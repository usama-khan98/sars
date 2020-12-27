import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Progress } from 'reactstrap';
import axios from 'axios';
import nodataImage from '../../assets/img/nodata.png';

export default class ReviewTask extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      reviewTask:[]
    };
  }

  componentWillMount(){
      axios.get('/api/admin/getReviewTasks')
      .then(res=>{
        console.log(res.data.list);
        this.setState({
          reviewTask:res.data.list
        })
      })
      .catch(err=>{
        console.log(err);
      })
  }

  render() {
    const tasklistItem = this.state.reviewTask.map((task,index) => 
      <tr scope="row" key={index}>
      <td>{task.synopsis.title}</td>
      <td>{task.reviewer.fname+" "+task.reviewer.lname}</td>
      <td>{new Date(task.assignedDate).toLocaleString()}</td>
      <td>{new Date(task.deadline).toLocaleString()}</td>
      <td ><span className="badge badge-success">{task.status}</span></td>
      </tr>
)

    return (
        <div>
          <Card style={{width:'92%',marginLeft:"1%",marginTop:'2%',}}>
          <CardHeader style={{textAlign:'center',backgroundColor:'#378686'}}>
          <h3>Review Task</h3>
          </CardHeader>
          <CardBody>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Assignment Title</th>
                <th scope="col">Reviewer </th>
                <th scope="col">Assigned date</th>
                <th scope="col">Deadline</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {(tasklistItem.length!==0)?
               tasklistItem :
               <tr>
                 <td></td>
                 <td></td>
                 <td><img src={nodataImage}></img></td>
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
