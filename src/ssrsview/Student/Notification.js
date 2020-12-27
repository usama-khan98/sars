import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader,Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import axios from 'axios';

export default class Notification extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      notifications:[],
      primary: false,
      modelBody:''
    };
    this.togglePrimary = this.togglePrimary.bind(this);
  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
    window.location.reload(false);
  }

  showModel(id){
    return function(){
      alert(id);
      this.setState({
        primary: !this.state.primary,
      })
    }
  }

  componentWillMount(){
    var id=localStorage.getItem('user_id');
    axios.post('/api/admin/GetAllNotify',{userId:id})
    .then(res=>{
      var countarray = res.data.list;
      console.log(countarray);
      this.setState({
        notifications:countarray
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  render() {
    return (
        <div>
            <Modal isOpen={this.state.primary} toggle={this.togglePrimary} className={'modal-primary ' + this.props.className}>
              <ModalHeader toggle={this.togglePrimary}>Notification</ModalHeader>
                <ModalBody>
                    {this.state.modelBody}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.togglePrimary}>Cancel</Button>
                </ModalFooter>
              </Modal>
          <Card style={{width:'92%',marginLeft:"1%",marginTop:'2%',}}>
          <CardHeader style={{textAlign:'center',backgroundColor:'#c7ac95'}}>
          <h3>Notification</h3>
          </CardHeader>
          <CardBody>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col" style={{width:'20%'}}>Date</th>
                <th scope="col" style={{width:'70%'}}>Subject</th>
                <th scope="col" style={{width:'10%'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.notifications.map((notification,index)=>
              <tr key={index}>
              <td scope="row" style={{fontWeight:(notification.status==="unreaded"?"bold":"normal")}}>{notification.date.substring(0, 10)}</td>
              <td style={{fontWeight:(notification.status==="unreaded"?"bold":"normal")}}>{notification.subject}</td>
              <td>
                <button type="button" className="btn btn-outline-primary" 
                onClick={()=>{this.setState({primary: !this.state.primary,modelBody:notification.subject})
                if(notification.status==="unreaded"){
                  axios.post('/api/admin/NotificationStatusChange',{notifyId:notification._id})
                  .then(res=>{
                    console.log(res.data.message);
                  })
                  .catch(err=>{
                    console.log(err);
                  })
                }
              }}
                style={{marginRight:'10px'}}>
                  <i className="icon-eye"></i>
                </button>
                <button type="button" className="btn btn-outline-danger" >
                  <i className="icon-trash"></i>
                </button>
              </td>
             </tr>
            )}
            </tbody>
          </table>
          </CardBody>
        </Card>
        </div>
    );
  }
}
