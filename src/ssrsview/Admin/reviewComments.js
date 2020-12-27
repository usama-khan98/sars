import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Progress,Modal, ModalBody, ModalFooter, ModalHeader,Button} from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import nodataImage from '../../assets/img/nodata.png';


export default class ReviewComments extends Component {
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

  


  forwardcomment(synopId,commenentId){
    return function() {

      console.log(synopId)
      console.log(commenentId)
      const data={
        synopsisId:synopId,
        commentId:commenentId
      }
      console.log(data);
      axios.post('/api/admin/forwardComments',data)
      .then(res=>{
        console.log(res);
        alert(res.data.message);
        axios.post('/api/synopsis/getbyId',{id:synopId})
        .then(res=>{
          const synop=res.data.data;
          axios.post('/api/admin/Notify',
          {
            userId:synop.supervisor._id,
            subject: "Synopsis \""+synop.title+"\" has been reviewed and comments forwarded to you.",
            status:"unreaded"
          })
          .then(result=>{
            window.location.reload(false);
          })
          .catch(err=>{
            console.log(err);
          })
        })
        .catch(err=>{
          console.log(err);
        })
      })
      .catch(err=>{
        console.log(err);
        alert(err);
      })
  }
}

  truncate(str) {
    return str.length > 30 ? str.substring(0, 30) + "..." : str;
}


  render() {
   var tasks=this.state.reviewTask.filter(rtask => rtask.commenents.length!==0);
   console.log("tasks");
   console.log(tasks);
    const tasklistItem = tasks.map((task,index) =>
      <tr scope="row" key={index}>
      <td>{new Date(task.commenents[0].submissionDate).toLocaleString()}</td>
      <td>{task.synopsis.title}</td>
      <td>{task.reviewer.fname+" "+task.reviewer.lname}</td> 
      <td>{this.truncate(task.commenents[0].commenents)}</td>
      <td><span class="badge badge-success">Positive</span></td>
      <td>
        <Link to={'/AdminDashboard/commentShow/'+task.commenents[0]._id}>
          <button type="button" class="btn btn-outline-primary" style={{marginRight:'10px'}}>
            <i class="icon-eye"></i>
          </button>
        </Link>
        <button type="button" class="btn btn-outline-success" style={{marginRight:'10px'}} hidden={(task.commenents[0].filepath)?false:true}>
        <a href={"https://fyp-ssrs.herokuapp.com/"+task.commenents[0].filepath} target="_blank"><i class="icon-cloud-download"></i></a>
        </button>
        <button type="button" class="btn btn-outline-secondary"  
        onClick={this.forwardcomment( task.synopsis._id,task.commenents[0]._id)}
        hidden={(task.commenents[0].status==="Forwarded")?true:false}>
            <i class="icon-user-following"></i>&nbsp;Forward Comments
        </button>
      </td>
      </tr>
)
    return (
        <div>
         <Modal isOpen={this.state.success} toggle={this.toggleSuccess} className={'modal-success ' + this.props.className}>
            <ModalHeader toggle={this.toggleSuccess}>Modal Review Comments</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.toggleSuccess}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggleSuccess}>Cancel</Button>
              </ModalFooter>
          </Modal>
          <Card style={{width:'92%',marginLeft:"1%",marginTop:'2%',}}>
          <CardHeader style={{textAlign:'center',backgroundColor:'#789e8e'}}>
          <h3>Review Comments</h3>
          </CardHeader>
          <CardBody>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Submission Date</th>
                <th scope="col">Assignment Title</th>
                <th scope="col">Reviewer</th>
                <th scope="col">Comments</th>
                <th scope="col">Comment Analysis</th>
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
