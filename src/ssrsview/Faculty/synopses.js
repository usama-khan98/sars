import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Progress,Modal, ModalBody, ModalFooter, ModalHeader,Button } from 'reactstrap';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {getStudent} from '../../redux/Faculty/FacultyAction';
import nodataImage from '../../assets/img/nodata.png';
import axios from 'axios';

class Synopsis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };

    this.toggleSuccess = this.toggleSuccess.bind(this);
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  acknowledgeSynopsis(id,sid){
    return function(){
      axios.post('/api/faculty/acknowledgeSynopsis',{synopsisId:id})
      .then(res=>{
        alert(res.data.message);
        
        axios.post('/api/admin/Notify',
        {
          userId: sid,
          subject: "Your Synopsis has been approved by your supervisor please upload files",
          status:"unreaded"
        })
        .then(result=>{
          window.location.reload();
        })
        .catch(err=>{
          console.log(err);
        })
      })
      .catch(err=>{
        alert(err)
      });
    }
  }

  componentWillMount(){
    var id=localStorage.getItem('user_id');
   this.props.student(id);

 }

  render() {

    console.log(this.props.fsynopsis[0]);
    var synopsislistItem=[];
    if(this.props.fsynopsis[0]){
     synopsislistItem = this.props.fsynopsis.map((synopsis,index) => 
                 <tr scope="row" key={index}>
                 <td>{synopsis.title}</td>
                 <td>{((synopsis.student===null)?'':synopsis.student.fname)+" "+((synopsis.student===null)?'':synopsis.student.lname)}</td>
                 <td>{(synopsis.student===null)?'':synopsis.student.regNumber}</td>
                 <td ><span className="badge badge-success">{synopsis.status}</span></td>
                 <td>
                  <div style={{width:'70%',float:'left'}}>
                    <Progress animated color="danger" value={(synopsis)?synopsis.plagirism:0} showValue className="mb-3" />
                  </div>
                  <div style={{width:'20%',float:'right',marginLeft:'10px'}}>
                   {(synopsis)?synopsis.plagirism:0}%
                  </div>
                 </td>
                 <td>
                 <Link to={'/FacultyPortal/ViewSynopsis/'+synopsis._id}>
                    <button type="button" onClick={this.toggleSuccess} class="btn btn-outline-primary" style={{marginRight:'10px'}}>
                      <i class="icon-eye"></i>
                    </button>
                  </Link>
                  <button type="button" class="btn btn-outline-success" style={{marginRight:'10px'}} hidden={(synopsis.filepath)?false:true}>
                    <a href={"https://fyp-ssrs.herokuapp.com/"+synopsis.filepath} target="_blank"><i class="icon-cloud-download"></i></a>
                  </button>
                  <button type="button" class="btn btn-outline-primary" onClick={this.acknowledgeSynopsis(synopsis._id,(synopsis.student===null)?'':synopsis.student._id)}
                   hidden={(synopsis.status==="Registering")?false:true}>
                    <i class="icon-check"></i>&nbsp;Approve
                  </button>
                 </td> 
                 </tr>
    )
    }
    
    return (
        <div>
          <Modal isOpen={this.state.success} toggle={this.toggleSuccess} className={'modal-success ' + this.props.className}>
            <ModalHeader toggle={this.toggleSuccess}>Modal Synopsis</ModalHeader>
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
          <CardHeader style={{textAlign:'center',backgroundColor:'#8e5b5b'}}>
          <h3>Assignment</h3>
          </CardHeader>
          <CardBody>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Assignment Title</th>
                <th scope="col">Student Name</th>
                <th scope="col">Student Reg#</th>
                <th scope="col">Status</th>
                <th scope="col">Plagirism</th>
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

const mapStateToProps = state => {
  return {
    fsynopsis: state.fstudent.student,
  }
}

const actionCreators = {
 student:getStudent,
}

export default connect(mapStateToProps,actionCreators)(Synopsis);