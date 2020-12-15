import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import image1 from '../../assets/img/brand/logodub.jpeg';
import image2 from '../../assets/img/adminpanel.jpg';
import image3 from '../../assets/img/facultypanel.jpg';
import image4 from '../../assets/img/studentpanel.jpg';

// const propTypes = {
//   children: PropTypes.node,
// };

// const defaultProps = {};

class SSRSHome extends Component {
  render() {

    // eslint-disable-next-line
    // const { children, ...attributes } = this.props;

    return (
        <body className="app " >
          <div>
            <header className="app-header navbar">
            <Header/>
            </header>
            <div className="app-body " >
              <main className="main" style={{backgroundImage: `url(${image1})`,height:"872px"}}>
                <div style={{height:"872px",backgroundColor:"#12202f",opacity:"0.9"}}>
                  <div className="row" style={{marginLeft:"35%"}}> 
                    <h1 style={{color:"white",marginTop:"16%",marginBottom:"3%"}}>Smart Assignment Review System</h1>
                    <h3></h3>
                  </div>
                  <div className="row" style={{width:"100%",padding:"0px 10%"}}>
                    <div style={{width:"30%"}}>
                      <div className="card" >
                        <img className="card-img-top" height="200px" src={image4} alt="Card image cap"/>
                        <div className="card-body">
                          <h5 className="card-title">Student Portal</h5>
                          <p className="card-text">Quick sample text to create the card title and make up the body of the card's content.</p>
                          <Link to="/student/login" className="btn btn-success">
                          Login
                          </Link>
                          <Link to="/student/registrtion" className="btn btn-primary" style={{marginLeft:'10px'}}>
                            Register Now!
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div style={{width:"30%",marginLeft:"5%"}}>
                    <div className="card" >
                        <img className="card-img-top" height="200px" src={image3} alt="Card image cap"/>
                        <div className="card-body">
                          <h5 className="card-title">Faculty Poratl</h5>
                          <p className="card-text">Quick sample text to create the card title and make up the body of the card's content.</p>
                          <Link to="/faculty/login" className="btn btn-success">
                          Login
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div style={{width:"30%",marginLeft:"5%"}}>
                    <div className="card" >
                        <img className="card-img-top" height="200px" src={image2} alt="Card image cap"/>
                        <div className="card-body">
                          <h5 className="card-title">Admin Dashboard</h5>
                          <p className="card-text">Quick sample text to create the card title and make up the body of the card's content.</p>
                          <Link to="/admin/login" className="btn btn-success">
                          Login
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              </main>
            </div>
            <footer className="app-footer">
            <Footer/>
            </footer>
          </div>
      </body>
    );
  }
}

// SSRSHome.propTypes = propTypes;
// SSRSHome.defaultProps = defaultProps;

export default SSRSHome;


{/* <div className="row">
              <div className="col-md-5">
                <img src={image1} width="100%" height="845px" alt="Responsive image"/>
              </div>
              <div className="col-md-7">
              <div style={{marginLeft:"2%"}}>
                <h4>Smart Synopsis Review System</h4>
                <p>
                        Description Here..
                </p>
               </div>
              </div>
          </div> */}
