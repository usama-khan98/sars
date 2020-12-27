import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter ,Input,Button, Col,
  Form,
  FormGroup,
  Label,
  Row,} from 'reactstrap';
import { connect } from 'react-redux';
import {getSynopsisToPresent} from '../../redux/Admin/AdminAction';
import axios from 'axios';
import nodataImage from '../../assets/img/nodata.png';


 class Presentation extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      synopsis:[],
      date:'',
      participent1:'',
      participent2:'',
      participent3:'',
      room:''
    };
    this.onChange=this.onChange.bind(this);
    this.onSelect=this.onSelect.bind(this);
    this.schhedule=this.schhedule.bind(this);
    
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSelect(e){
    console.log(this.props.synopsisSel);
    this.props.synopsisSel[e.target.value]= !this.props.synopsisSel[e.target.value];
    console.log(this.props.synopsisSel);
  }

  schhedule(e){

    let synopsisListData=[]
    var i=0;
    this.props.synopsisSel.map((value,index)=>{
        if(value){
          synopsisListData[i]=this.props.synopsistList[index]._id
          i++
        }
    })

    const data={
      date:this.state.date,
      participent1:this.state.participent1,
      participent2:this.state.participent2,
      participent3:this.state.participent3,
      room:this.state.room,
      synopsisList:synopsisListData
    }

    console.log(data);

    axios.post('/api/admin/schedulePresentation',data)
    .then(res=>{
      console.log(res);
     
      this.props.synopsisSel.map((value,index)=>{
        if(value){
          const snop=this.props.synopsistList[index];
          console.log(snop);
          axios.post('/api/admin/Notify',
          {
            userId:snop.student._id,
            subject: "Your Synopsis has been schedule for presentation",
            status:"unreaded"
          })
          .then(result=>{
            axios.post('/api/admin/Notify',
            {
              userId:snop.supervisor._id,
              subject: "Synopsis \""+snop.title+"\" has been schedule for presentation",
              status:"unreaded"
            })
            .then(result=>{
              this.props.history.replace('/AdminDashboard');
            })
            .catch(err=>{
              console.log(err);
            })
          })
          .catch(err=>{
            console.log(err);
          })
        }
    })
    alert(res.data.message);
    })
    .catch(err=>{
      console.log(err);
    })

  }

  componentWillMount(){
     this.props.synopsis();
  }


  render() {

    this.props.synopsistList.map((synopsis,index)=>{
      this.props.synopsisSel[index]=false;
    })

    console.log(this.props.synopsisSel);

    const synopsisItem = this.props.synopsistList.map((synopsis,index) => 
      <tr scope="row" key={index}>
      <td>{synopsis.title}</td>
      <td>{synopsis.student.regNumber}</td>
      <td>{synopsis.student.fname+" "+synopsis.student.lname}</td>
      <td>{synopsis.supervisor.fname+" "+synopsis.supervisor.lname}</td>
      <td ><span className="badge badge-success">{synopsis.status}</span></td>
      <td style={{textAlign:'center'}}>
        <Input type="checkbox" id={synopsis.student._id} name={synopsis.supervisor._id} value={index} onChange={this.onSelect} />
      </td>
      </tr>
)

    return (
        <div>
          <Card style={{width:'92%',marginLeft:"1%",marginTop:'2%',}}>
          <CardHeader style={{textAlign:'center',backgroundColor:'#647280'}}>
          <h3>Presentation</h3>
          </CardHeader>
          <CardBody>
          <Form  className="form-horizontal" style={{width:'70%',marginLeft:'10%'}}>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="date-input">Presentation Date </Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="date" id="date" name="date" placeholder="date" onChange={this.onChange}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="email-input">Participent email</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="text" value={this.state.participent1} id="participent1" name="participent1" placeholder="Please enter Last name" onChange={this.onChange}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="email-input">Participent email</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="text" value={this.state.participent2} id="participent2" name="participent2" placeholder="Please enter Last name" onChange={this.onChange}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="email-input">Participent email</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="text" value={this.state.participent3} id="participent3" name="participent3" placeholder="Please enter Last name" onChange={this.onChange}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="email-input">Presentation Room</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="text" value={this.state.room} id="room" name="room" placeholder="Please enter Last name" onChange={this.onChange}/>
            </Col>
          </FormGroup>
          </Form>
          <br></br>
          <p style={{color:'red'}}>Note: Please Select the Synopses for Schedule</p>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Assignment Title</th>
                <th scope="col">Student Reg</th>
                <th scope="col">Student Name</th>
                <th scope="col">Supervisor</th>
                <th scope="col">Assignment Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {(synopsisItem.length!==0)?
               synopsisItem :
               <tr>
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
          <CardFooter>
            <div style={{float:'right'}}>
              <Button color="ghost-success" style={{float:'right'}} onClick={this.schhedule}>
                <i className="icon-check"></i>&nbsp;Schedule Presentation
              </Button>
            </div>
          </CardFooter>
        </Card>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    synopsistList: state.presentation.synopsisList,
    synopsisSel:state.presentation.synopsisSelected
  }
}

const actionCreators = {
  synopsis: getSynopsisToPresent,
}


export default connect(mapStateToProps,actionCreators)(Presentation);