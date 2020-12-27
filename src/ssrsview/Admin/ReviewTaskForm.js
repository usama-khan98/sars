import React, { Component } from 'react';
import axios from 'axios';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,Label,
    Row,
    } from 'reactstrap';
class ReviewTaskForm extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.toggleFade = this.toggleFade.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          collapse: true,
          fadeIn: true,
          timeout: 300,
          synopsis:[],
          supervisor:[],
          faculty:[],
          reviewer1:'',
          reviewer2:'',
          reviewer3:'',
          deadline:''
        };

      
      }
    
      toggle() {
        this.setState({ collapse: !this.state.collapse });
      }
    
      toggleFade() {
        this.setState((prevState) => { return { fadeIn: !prevState }});
      }
      
      onChange(e){
        
        this.setState({[e.target.name]: e.target.value});
      }

      onSubmit(e){

        e.preventDefault();
        let Synid = this.props.match.params.synosisid;
        const data={

          synopsisId:Synid,
          reviewer1Id:this.state.reviewer1,
          reviewer2Id:this.state.reviewer2,
          reviewer3Id:this.state.reviewer3,
          deadline:this.state.deadline
        }

        console.log(data);

        axios.post('/api/admin/assignForReview',data)
        .then(res=>{
          console.log(res);
          axios.post('/api/admin/Notify',
          {
            userId: this.state.synopsis.student._id,
            subject: "Your Synopsis has been sent to Reviewers for Review.",
            status:"unreaded"
          })
          .then(result=>{
            axios.post('/api/admin/Notify',
            {
              userId:this.state.reviewer1,
              subject: "A review task assigned to you by Admin",
              status:"unreaded"
            })
            .then(result=>{
              axios.post('/api/admin/Notify',
              {
                userId: this.state.reviewer2,
                subject: "A review task assigned to you by Admin",
                status:"unreaded"
              })
              .then(result=>{
                axios.post('/api/admin/Notify',
                {
                  userId: this.state.reviewer3,
                  subject: "A review task assigned to you by Admin",
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
            })
            .catch(err=>{
              console.log(err);
            })
          })
          .catch(err=>{
            console.log(err);
          })

          alert(res.data.message);
        })
        .catch(err=>{
          console.log(err);
        });

      }
      


      componentWillMount(){
        let Synid = this.props.match.params.synosisid;

        axios.post('/api/synopsis/getbyId',{id:Synid})
        .then(res=>{
          console.log(res.data);
          this.setState({synopsis:res.data.data})
          this.setState({supervisor:res.data.data.supervisor});
        })
        .catch(err=>{
          console.log(err);
        })

        axios.get('/api/faculty/getAllReviewer')
        .then(res=>{
          console.log(res);
          this.setState({faculty:res.data.list});
          this.setState({
            reviewer1:(res.data.list.length>=1)?res.data.list[0]._id:'',
            reviewer2:(res.data.list.length>=2)?res.data.list[1]._id:'',
            reviewer3:(res.data.list.length>=3)?res.data.list[2]._id:''
          })
        })
        .catch(err=>{
          console.log(err);
        })

      }
    
  render() {
    const revierOptions = this.state.faculty.map((faculty,index)=> 
      <option key={index} value={faculty._id}>{faculty.fname+" "+faculty.lname}</option>
    );
    return (
        <div>
          <Card style={{width:'70%',marginLeft:"15%",marginTop:'2%',}}>
              <CardHeader>
                <h4>Assign Assignment for Review</h4>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label>Assignment Title</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">{this.state.synopsis.title}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Research Field</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">{(this.state.synopsis.researchField)?this.state.synopsis.researchField:'No'}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Supervisor</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">{this.state.supervisor.fname+" "+this.state.supervisor.lname}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="6">
                      <Label>Plese Select 3 Reviewer</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" md="12" size="lg">
                      <Input type="select" value={this.state.reviewer1} name="reviewer1" id="reviewer1" bsSize="lg" onChange={this.onChange}>
                        {revierOptions}
                      </Input>
                    </Col>
                  </FormGroup><FormGroup row>
                    <Col xs="12" md="12" size="lg">
                      <Input type="select" value={this.state.reviewer2} name="reviewer2" id="reviewer2" bsSize="lg" onChange={this.onChange}>
                       {revierOptions}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" md="12" size="lg">
                      <Input type="select" value={this.state.reviewer3} name="reviewer3" id="reviewer3" bsSize="lg" onChange={this.onChange}>
                        {revierOptions}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">DeadLine </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="deadline" name="deadline" placeholder="date" onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <div style={{float:'right'}}>
                <Button color="ghost-success" style={{float:'right'}} onClick={this.onSubmit}>
                    <i className="icon-check"></i>&nbsp;Add Task
                </Button>
                </div>
              </CardFooter>
            </Card>  
        </div>
    );
  }
}
export default ReviewTaskForm;