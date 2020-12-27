import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { connect } from 'react-redux';
import {getStudent} from '../../redux/Faculty/FacultyAction';
import nodataImage from '../../assets/img/nodata.png';
import {Link} from 'react-router-dom';

 class Student extends Component {
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

  componentWillMount(){
    var id=localStorage.getItem('user_id');
   this.props.student(id);

 }
  render() {
    
    console.log(this.props.fsynopsis[0]);
    var studentlistItem=[];
    if(this.props.fsynopsis[0]){
      studentlistItem= this.props.fsynopsis.map((synopsis,index) => 
      <tr scope="row" key={index}>
      <td>{(synopsis.student===null)?'':synopsis.student.regNumber}</td>
      <td>{((synopsis.student===null)?'':synopsis.student.fname)+" "+((synopsis.student===null)?'':synopsis.student.lname)}</td>
      <td>{synopsis.title}</td>
      <td ><span className="badge badge-success">{(synopsis.student===null)?'':synopsis.student.status}</span></td>
      <td>
      <Link to={'/FacultyPortal/ViewStudent/'+(synopsis.student===null)?'':synopsis.student._id}>
        <button type="button" onClick={this.toggleSuccess} className="btn btn-outline-primary" style={{marginRight:'10px'}}>
            <i className="icon-eye"></i>
        </button>
      </Link>
      </td> 
      </tr>
)
    }

    return (
        <div>
          <Modal isOpen={this.state.success} toggle={this.toggleSuccess} className={'modal-success ' + this.props.className}>
            <ModalHeader toggle={this.toggleSuccess}>Modal Student</ModalHeader>
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
          <h3>Student</h3>
          </CardHeader>
          <CardBody>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Reg#</th>
                <th scope="col">Name</th>
                <th scope="col">Assignment Title</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
             {(studentlistItem.length!==0)?
               studentlistItem :
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

export default connect(mapStateToProps,actionCreators)(Student);