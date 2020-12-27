import React, { Component } from 'react';
import {Link } from 'react-router-dom';
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
    
    var id=localStorage.getItem('user_id');

      axios.post('/api/faculty/getReviewTasks',{id:id})
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
      <td>{new Date(task.assignedDate).toLocaleString()}</td>
      <td>{new Date(task.deadline).toLocaleString()}</td>
      <td ><span className="badge badge-success">{task.status}</span></td>
      <td>

        <button type="button" class="btn btn-outline-success" style={{marginRight:'10px'}}>
            <a href={"https://fyp-ssrs.herokuapp.com/"+task.synopsis.filepath} target="_blank"><i class="icon-cloud-download"></i></a>
        </button>
        <button type="button" class="btn btn-outline-primary" hidden={(task.status==="Assigned")?false:true} >
            <Link to={'/FacultyPortal/SubmitReviewForm/'+task._id+'/'+task.synopsis._id}><i class="icon-check"></i>&nbsp;Submit</Link>  
        </button>
        </td>
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
                <th scope="col">Assigned date</th>
                <th scope="col">Due date</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
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
