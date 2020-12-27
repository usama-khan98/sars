import React, { Component } from 'react';
import { Card, CardBody, CardHeader,} from 'reactstrap';
import axios from 'axios';
import nodataImage from '../../assets/img/nodata.png';


export default class Decision extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        synopsis:[]
      };
    }

    componentWillMount(){

      var id=localStorage.getItem('user_id');
        axios.post('/api/faculty/getbyId',{id:id})
        .then(res=>{
          console.log(res.data.data);
          this.setState({
            synopsis:res.data.data
          })
        })
        .catch(err=>{
          console.log(err);
        })
    }
  render() {
    var synopsisList=this.state.synopsis.filter(rtask => rtask.finalDecision);
    console.log(synopsisList)
    const tasklistItem = synopsisList.map((synopsis,index) =>
      <tr scope="row" key={index}>
      <td>{synopsis.title}</td>
      <td>{(synopsis.student)?synopsis.student.regNumber:''}</td>
      <td>{((synopsis.student)?synopsis.student.fname:'')+" "+((synopsis.student)?synopsis.student.lname:'')}</td> 
      {/* <td><span class="badge badge-danger" hidden={(synopsis.finalDecision==="Approved")?true:false}>Rejected</span></td> */}
      <td><span className={(synopsis.finalDecision==="Approved")?"badge badge-success":"badge badge-danger"} hidden={(synopsis.finalDecision==="Approved")?false:true}>{(synopsis.finalDecision==="Approved")?"Approved":"Rejected"}</span></td>
      </tr>
)
    return (
        <div>
          <Card style={{width:'92%',marginLeft:"1%",marginTop:'2%',}}>
          <CardHeader style={{textAlign:'center',backgroundColor:'#868a46'}}>
          <h3>Assignment Decisions</h3>
          </CardHeader>
          <CardBody>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Assignment Title</th>
                <th scope="col">Student Name</th>
                <th scope="col">Student Reg#</th>
                <th scope="col">Decision</th>
              </tr>
            </thead>
            <tbody>
              {(tasklistItem.length!==0)?
               tasklistItem :
               <tr>
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
