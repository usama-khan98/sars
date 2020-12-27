import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Progress,Input } from 'reactstrap';
import {Link } from 'react-router-dom';
import axios from 'axios';
import nodataImage from '../../assets/img/nodata.png';

export default class SynopsisDecisions extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      synopses:[]
    };
  }

  componentWillMount(){
      axios.get('/api/admin/synopsisToDecision')
      .then(res=>{
        console.log(res.data);
        this.setState({
          synopses:res.data.synopsislist
        })
      })
      .catch(err=>{
        console.log(err);
      })
  }
  
  
  render() {

    const synopsislistItem = this.state.synopses.map((synopsis,index) => 
      <tr scope="row" key={index}>
      <td>{synopsis.title}</td>
      <td>{(synopsis.student?synopsis.student.fname:'')+" "+(synopsis.student?synopsis.student.lname:'')}</td>
      <td>{synopsis.supervisor.fname+" "+synopsis.supervisor.lname}</td>
      <td ><span className="badge badge-success">{synopsis.status}</span></td>
      <td>
        <Link to={'/AdminDashboard/decisionsform/'+synopsis._id}>
          <button type="button" class="btn btn-outline-primary" style={{marginRight:'10px'}}>
            <i class="icon-check"></i> &nbsp; Take decision
          </button>
        </Link>
      </td>
      </tr>
)

    return (
        <div>
          <Card style={{width:'92%',marginLeft:"1%",marginTop:'2%',}}>
          <CardHeader style={{textAlign:'center',backgroundColor:'#868a46'}}>
          <h3>Assignment Decisions</h3>
          </CardHeader>
          <CardBody>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Assignment Title</th>
                <th scope="col">Student</th>
                <th scope="col">Supervisor</th>
                <th scope="col">Assignment Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {(synopsislistItem.length!==0)?
               synopsislistItem :
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
