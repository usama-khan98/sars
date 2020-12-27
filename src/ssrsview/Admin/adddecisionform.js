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
class AddDecisionForm extends Component {
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
          decision1:'0',
          decision2:'0',
          decision3:'0',
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
        var final=0;
        var finaldecision="Approved";
        if(this.state.decision1==='1'){
            final++;
        }
        if(this.state.decision2==='1'){
            final++;
        }
        if(this.state.decision3==='1'){
            final++;
        }

        if(final<2){
            finaldecision="Rejected";
        }
        
        let Synid = this.props.match.params.synosisid;
        const data={

          synopsisId:Synid,
          decision:finaldecision,
        }

        console.log(data);

        axios.post('/api/admin/addfinaldecision',data)
        .then(res=>{
          console.log(res);
          alert(res.data.message);
          axios.post('/api/admin/Notify',
          {
            userId: this.state.synopsis.student._id,
            subject: "Admin add the final decision of Synopsis \""+this.state.synopsis.title+"\" and decision is "+finaldecision,
            status:"unreaded"
          })
          .then(result=>{
            axios.post('/api/admin/Notify',
            {
              userId: this.state.synopsis.supervisor._id,
              subject: "Admin add the final decision of Synopsis \""+this.state.synopsis.title+"\" and decision is "+finaldecision,
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
      }
    
  render() {
    
    return (
        <div>
          <Card style={{width:'70%',marginLeft:"15%",marginTop:'2%',}}>
              <CardHeader>
                <h4>Final Decision Form</h4>
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
                      <Label>Teacher</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">{this.state.supervisor.fname+" "+this.state.supervisor.lname}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="6">
                      <Label>Plese select decisions</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>1st Evaluator Decision</Label>
                    </Col>
                    <Col xs="6" md="3" size="lg">
                      <Input value={this.state.decision1} type="select" name="decision1" id="decision1" bsSize="lg" onChange={this.onChange}>
                          <option value="1">Accepted</option>
                          <option value="0">Rejected</option>
                      </Input>
                    </Col>
                  </FormGroup><FormGroup row>
                    <Col md="3">
                      <Label>2nd Evaluator Decision</Label>
                    </Col>
                    <Col xs="6" md="3" size="lg">
                      <Input value={this.state.decision2} type="select" name="decision2" id="decision2" bsSize="lg" onChange={this.onChange}>
                          <option value="1">Accepted</option>
                          <option value="0">Rejected</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col md="3">
                      <Label>3rd Evaluator Decision</Label>
                    </Col>
                    <Col xs="6" md="3" size="lg">
                      <Input value={this.state.decision3} type="select" name="decision3" id="decision3" bsSize="lg" onChange={this.onChange}>
                          <option value="1">Accepted</option>
                          <option value="0">Rejected</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <div style={{float:'right'}}>
                <Button color="ghost-success" style={{float:'right'}} onClick={this.onSubmit}>
                    <i className="icon-check"></i>&nbsp;Add Decision
                </Button>
                </div>
              </CardFooter>
            </Card>  
        </div>
    );
  }
}
export default AddDecisionForm;