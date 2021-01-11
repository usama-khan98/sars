import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  CardHeader,
  Form,
  Input,
  Label,
  FormGroup,
  Row,
} from "reactstrap";
class RegisterSynopsis extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      regNo:'',
      supervisor:'',
      cosupervisor:'',
      title:'',
      field:'',
      student:{},
      synopsis:{},
      faculty:[]
    };
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){

    const data={
      title:this.state.title,
      studentId:this.state.student._id,
      supervisorId:this.state.supervisor,
      // co_supervisorID:this.state.cosupervisor,
      researchField:this.state.field
    }

    console.log(data)

    axios.post('/api/synopsis/register',data)
    .then(res=>{
      console.log(res);
      alert(res.data.message);
      axios.post('/api/admin/Notify',
      {
        userId:'5e26ca6014e0a32fa3834fcd',
        subject: "Student with Reg# "+this.state.regNo+" Register Assignment having title"+this.state.title,
        status:"unreaded"
      })
      .then(result=>{
        axios.post('/api/admin/Notify',
      {
        userId:this.state.supervisor,
        subject: "Student with Reg# "+this.state.regNo+" Register Assignment having title"+this.state.title,
        status:"unreaded"
      })
      .then(result=>{
        axios.post('/api/admin/Notify',
      {
        userId:this.state.cosupervisor,
        subject: "Student with Reg# "+this.state.regNo+" Register Assignment having title \""+this.state.title+"\"",
        status:"unreaded"
      })
      .then(result=>{
        this.props.history.replace("/StudentPortal/fileSynopsis");
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
      })
      
     
    })
    .catch(err=>{
      console.log(err);
    })

  }
  componentWillMount(){
    
    var id=localStorage.getItem('user_id');

      axios.post('/api/student/getById',{sid:id})
      .then(res=>{
        console.log(res.data.student);
        this.setState({
          student:res.data.student,
          regNo:res.data.student.regNumber,
          synopsis:res.data.student.Synopsis[0]
        })
      })
      .catch(err=>{
        console.log(err);
      })

      axios.get('/api/faculty/getAllSupervisor')
      .then(res=>{
        console.log(res);
        this.setState({
          faculty:res.data.list,
          supervisor:res.data.list[0]._id,
        })
      })
      .catch(err=>{
        console.log(err);
      })
  }

  render() {
    const mystyle = {
      // backgroundColor: "DodgerBlue",
      padding: "10px",
      marginBottom: "10px",
      marginTop: "5px",
    };
    return (
      <div>
        <Card style={{ width: "92%", marginLeft: "1%", marginTop: "3%" }}>
          <CardHeader
            style={{ textAlign: "center", backgroundColor: "#647280" }}
          >
            <h3>Assignment Registration</h3>
          </CardHeader>
          <CardBody>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form  className="form-horizontal">
                        <FormGroup row>
                          <Col md="5">
                            <Label htmlFor="text-input">Registration Number</Label>
                          </Col>
                          <Col xs="12" md="6">
                            <Input type="text" value={this.state.regNo} id="regNo" name="regNo" placeholder="Please enter registration number" disabled onChange={this.onChange}/>
                          </Col>
                        </FormGroup>
                        <br></br>
                        <br></br>
                        <FormGroup row>
                          <Col md="5">
                            <Label htmlFor="text-input">Teacher</Label>
                          </Col>
                          <Col xs="12" md="6" size="lg">
                            <Input type="select" value={(this.state.synopsis)?this.state.synopsis.supervisor:this.state.supervisor} 
                            name="supervisor" id="supervisor" bsSize="lg" 
                            onChange={this.onChange} disabled={(this.state.synopsis)?true:false}>
                            {this.state.faculty.map((faculty,index)=>
                              <option key={index} value={faculty._id}>{((faculty.fname)?faculty.fname:'')+" "+((faculty.lname)?faculty.lname:'')}</option>
                            )}
                            </Input>
                          </Col>
                        </FormGroup>
                        <br></br>
                        <br></br>
                        {/* <FormGroup row>
                          <Col md="5">
                            <Label htmlFor="text-input">Teacher 2</Label>
                          </Col>
                          <Col xs="12" md="6" size="lg">
                            <Input type="select" value={(this.state.synopsis)?this.state.synopsis.co_supervisor:this.state.cosupervisor} 
                            name="cosupervisor" id="cosupervisor" bsSize="lg" 
                            onChange={this.onChange} disabled={(this.state.synopsis)?true:false}>
                            {this.state.faculty.map((faculty,index)=>
                              <option key={index} value={faculty._id}>{((faculty.fname)?faculty.fname:'')+" "+((faculty.lname)?faculty.lname:'')}</option>
                            )}
                            </Input>
                          </Col>
                        </FormGroup> */}
                        <br></br>
                        <br></br>
                        <FormGroup row>
                          <Col md="5">
                            <Label htmlFor="text-input">Assignment Title</Label>
                          </Col>
                          <Col xs="12" md="6">
                            <Input type="text" value={(this.state.synopsis)?this.state.synopsis.title:this.state.title} 
                            id="title" name="title" placeholder="Please enter Assignment Title"
                            onChange={this.onChange} disabled={(this.state.synopsis)?true:false}/>
                          </Col>
                        </FormGroup>
                        <br></br>
                        <br></br>
                        <FormGroup row>
                          <Col md="5">
                            <Label htmlFor="text-input">Research Area</Label>
                          </Col>
                          <Col xs="12" md="6">

                            <Input type="select" value={(this.state.synopsis)?this.state.synopsis.researchField:this.state.field} 
                            name="field" id="field" bsSize="lg" 
                            onChange={this.onChange} disabled={(this.state.synopsis)?true:false}>
                              <option value="Communication Networks">Communication Networks</option>
                              <option value="Computer Graphics">Computer Graphics</option>
                              <option value="Robotics">Robotics</option>
                              <option value="Machine Learning">Machine Learning</option>
                              <option value="Simulation and modeling">Simulation and modeling</option>
                              <option value="Data Warehouse Modeling">Data Warehouse Modeling</option>
                              <option value="Human-Computer Interaction">Human-Computer Interaction</option>
                              <option value="Data Mining">Data Mining</option>
                              <option value="Image processing">Image processing</option>
                              <option value="Formal methods">Formal methods</option>
                              <option value="Artificial Intelligence">Artificial Intelligence</option>
                            </Input>

                          </Col>
                        </FormGroup>
                        <br></br>
                        <br></br>
                        <FormGroup row>
                          <Col xs="12" md="11">
                          <Button color="ghost-success" style={{float:'right'}} 
                          onClick={this.onSubmit} disabled={(this.state.synopsis)?true:false}>
                              Register Assignment
                            </Button>
                          </Col>
                          <Col md="1">
                          </Col>
                        </FormGroup>
                      </Form>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default RegisterSynopsis;
