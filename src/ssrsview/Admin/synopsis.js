import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Progress,Modal, ModalBody, ModalFooter, ModalHeader,Button } from 'reactstrap';
import { connect } from 'react-redux';
import {getSynopsis} from '../../redux/Admin/AdminAction';
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

  presented(id){
    return function(){
      console.log(id);
      axios.post('/api/synopsis/ChangeStatus',{id:id,status:"Presented"})
      .then(res=>{
        console.log(res);
        alert(res.data.message);
        window.location.reload();
      })
      .catch(err=>{
        console.log(err);
      });
    }
  }
  
  componentWillMount(){
    this.props.synopsis();
  }


  render() {

    // console.log(this.props.synopsistList.synopsisList)
    const synopsislistItem = this.props.synopsistList.synopsisList.map((synopsis_list,index) => 
                 <tr scope="row" key={index}>
                 <td>{synopsis_list.title}</td>
                 <td>{(synopsis_list.researchField)?synopsis_list.researchField:''}</td>
                 <td>{synopsis_list.supervisor.fname+" "+synopsis_list.supervisor.lname}</td>
                 <td ><span className={(synopsis_list.status)?synopsis_list.status==="Registring"?
                 "badge badge-warning":synopsis_list.status==="Submitted"?
                 "badge badge-warning":synopsis_list.status==="UnderReview"?
                 "badge badge-secondary":synopsis_list.status==="Revised"?
                 "badge badge-primary":synopsis_list.status==="Presented"?
                 "badge badge-info":synopsis_list.status==="Approved"?"badge badge-success":"badge badge-light":"badge badge-danger"}>{synopsis_list.status}</span></td>
                 <td>
                  <div style={{width:'70%',float:'left'}}>
                    <Progress animated color="danger" value={(synopsis_list)?synopsis_list.plagirism:0} showValue className="mb-3" />
                  </div>
                  <div style={{width:'20%',float:'right',marginLeft:'10px'}}>
                   {(synopsis_list)?synopsis_list.plagirism:0}%
                  </div>
                 </td>
                 <td>
                <Link to={'/AdminDashboard/synopsisShow/'+synopsis_list._id}>
                 <button type="button" onClick={this.toggleSuccess} class="btn btn-outline-primary" style={{marginRight:'10px'}}>
                    <i class="icon-eye"></i>
                  </button>
                  </Link>
                  <button type="button" class="btn btn-outline-success" style={{marginRight:'10px'}} hidden={(synopsis_list.filepath)?false:true}>
                  <a href={"https://fyp-ssrs.herokuapp.com/"+synopsis_list.filepath} target="_blank"><i class="icon-cloud-download"></i></a>
                  </button>
                  <button type="button" class="btn btn-outline-secondary" hidden={(synopsis_list.status==="Submitted")?false:true}>
                    <Link to={'/AdminDashboard/addReviewtask/'+synopsis_list._id} ><i class="icon-user-following"></i>&nbsp;Assign for Review</Link> 
                  </button>
                  <button type="button" className="btn btn-outline-success" hidden={(synopsis_list.commenents.length===3 && synopsis_list.status==="Commented")?false:true}>
                    <Link to={'/AdminDashboard/commentsAnalysis/'+synopsis_list._id}><i className="icon-user-following"></i>&nbsp; Analyze Comments</Link>
                  </button>
                  <button type="button" className="btn btn-outline-success" onClick={this.presented(synopsis_list._id)}
                  hidden={(synopsis_list.status==="PresentationSchedule")?false:true}>
                    <i className="icon-user-following"></i>&nbsp; Presented
                  </button>
                 </td> 
                 </tr>
    )

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
                <th scope="col">Research Field</th>
                <th scope="col">Supervisor</th>
                <th scope="col">Status</th>
                <th scope="col">Plagiarism</th>
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
    synopsistList: state.adminsynosis
  }
}

const actionCreators = {
  synopsis: getSynopsis,
}

export default connect(mapStateToProps,actionCreators)(Synopsis);