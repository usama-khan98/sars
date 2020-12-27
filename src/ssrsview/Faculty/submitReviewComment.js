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

class SubmitReviewForm extends Component {
    constructor(props) {
        super(props);
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.state = {
          synopsis:[],
          supervisor:[],
          comment:'',
          commentFile:null
        };

      
      }
    
      onChange(e){
        
        this.setState({[e.target.name]: e.target.value});
      }

      handleImageChange(event) {
        this.setState({
          commentFile:event.target.files[0]
        })
      }

      onSubmit(e){

        e.preventDefault();
        let taskId = this.props.match.params.taskId;
  
        let formData= new FormData();
 
        formData.append('reviewTaskId',taskId);
        formData.append('commenent',this.state.comment);
        formData.append('commentFile',this.state.commentFile);
        
        axios({
          url:'/api/faculty/submitReviewComment',
          method:'POST',
          headers:{
            'Content-Type': 'multipart/form-data'
          },
          data:formData
        })
        .then(res=>{
          console.log(res.data.message);
          axios.post('/api/admin/Notify',
          {
            userId:'5e26ca6014e0a32fa3834fcd',
            subject: "Synopsis "+this.state.synopsis.title+" received one review comments",
            status:"unreaded"
          })
          .then(result=>{
            this.props.history.replace('/FacultyPortal');
          })
          .catch(err=>{
            console.log(err);
          })
          alert(res.data.message);
          
        })
        .catch(err=>{
          console.log(err);
          alert(err);
        })

       
      }
      


      componentWillMount(){
        let Synid = this.props.match.params.synopsisId;

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
                <h4>Submit Review Comment</h4>
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
                      <Label htmlFor="textarea-input">Comment</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" value={this.state.comment} name="comment" id="comment" rows="9"
                             placeholder="Content..." onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="9">
                      <Label style={{color:'red'}}>Note: Please write your Comments or select File</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Comment File</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file"  onChange={this.handleImageChange}/>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <div style={{float:'right'}}>
                <Button color="ghost-success" style={{float:'right'}} onClick={this.onSubmit}>
                    <i className="icon-check"></i>&nbsp;Submit
                </Button>
                </div>
              </CardFooter>
            </Card>  
        </div>
    );
  }
}
export default SubmitReviewForm;