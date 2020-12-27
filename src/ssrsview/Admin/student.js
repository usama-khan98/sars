import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { connect } from 'react-redux';
import {Link } from 'react-router-dom';
import {getStudent} from '../../redux/Admin/AdminAction';
import nodataImage from '../../assets/img/nodata.png';
import axios from 'axios';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };

    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(sid){
    return function(){
      axios.post('/api/student/ChangeStatus',{id:sid,status:"Deleted"})
      .then(res=>{
        if(res.data.message){
          alert("Student Deleted Success..!!!");
        }
        window.location.reload(false);
      })
      .catch(err=>{
        console.log(err);
      })
    }  
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  componentWillMount(){
    this.props.getStudent();
  }

  render() {
    const studentlistItem = this.props.studentList.filter(std=> std.status!=="Deleted").map((student_list,index) => 
                 <tr scope="row" key={index}>
                 <td>{student_list.regNumber}</td>
                 <td>{student_list.fname+" "+student_list.lname}</td>
                 <td>{(student_list.Synopsis[0])?student_list.Synopsis[0].title:''}</td>
                 <td ><span className={(student_list.Synopsis[0])?student_list.Synopsis[0].status==="Registring"?
                 "badge badge-warning":student_list.Synopsis[0].status==="Submitted"?
                 "badge badge-warning":student_list.Synopsis[0].status==="UnderReview"?
                 "badge badge-secondary":student_list.Synopsis[0].status==="Revised"?
                 "badge badge-primary":student_list.Synopsis[0].status==="Presented"?
                 "badge badge-info":student_list.Synopsis[0].status==="Approved"?"badge badge-success":"badge badge-light":"badge badge-danger"}>{(student_list.Synopsis[0])?student_list.Synopsis[0].status:'Not Submitted'}</span></td>
                 <td ><span className="badge badge-success">{student_list.status}</span></td>
                 <td>
                  <Link to={'/AdminDashboard/studentShow/'+student_list._id}>
                      <button type="button" onClick={this.toggleSuccess} className="btn btn-outline-primary" style={{marginRight:'10px'}}>
                        <i className="icon-eye"></i>
                      </button>
                  </Link>
                  <button type="button" className="btn btn-outline-danger" onClick={this.handleDelete(student_list._id)}>
                    <i className="icon-trash"></i>
                  </button>
                 </td> 
                 </tr>
    )
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
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Reg#</th>
                <th scope="col">Name</th>
                <th scope="col">Assignment Title</th>
                <th scope="col">Assignment Status</th>
                <th scope="col">Student Status</th>
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
    studentList: state.student.list,
  }
}

const actionCreators = {
  getStudent: getStudent,
}

export default connect(mapStateToProps,actionCreators)(Student);