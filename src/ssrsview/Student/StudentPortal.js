import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAuth from '../withAuth';
import StudentHome from './StudentPortalHome';
import StudentHeader from './PortalHeader';
import StudentFooter from './PortalFooter';
import StudentSideBar from './PortalSideBar';
import AuthService from '../AuthTest';
import { BrowserRouter as Router, Switch,Route,Redirect } from 'react-router-dom';
import FinalDecision from './Finaldecision';
import Presentation from './Presentation';
import SynopsisStatus from './SynopsisStatus';
import SynopsisUpload from './UploadSynopsis';
import RegisterSynopsis from './RegisterSynopsis';
import Notification from './Notification';
import Profile from './Profile';
import UpdateProfile from './updateProfile';


const propTypes = {
  children: PropTypes.node,
};

const Auth =new AuthService();

const defaultProps = {};

class StudentPortal extends Component {

    componentWillMount(){
        console.log("fsfsfsdfds"+this.props.user.userType);
        localStorage.setItem('user_id', this.props.user.userId);
        if(this.props.user.userType!=='Student'){
          alert("You can not access Faculty Portal");
          Auth.logout();
          this.props.history.replace('/student/login');
        }
        
    }
  
  render() {


    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    console.log(this.props.user);
    

    return (
        <Router>
        <body className="app header-fixed footer-fixed" >
          <div>
            <header className="app-header navbar">
            <StudentHeader/>
            </header>
            <div className="app-body " >
              <StudentSideBar/>
              <main className="main" >
              <Switch>
                <Route  path="/StudentPortal/Home" name="Faculty Portal Home Page" component={StudentHome} />
                <Route  path="/StudentPortal/regSynopsis" name="Faculty Portal Home Page" component={RegisterSynopsis} />
                <Route  path="/StudentPortal/fileSynopsis" name="Faculty Portal Home Page" component={SynopsisUpload} />
                <Route  path="/StudentPortal/statusSynopsis" name="Faculty Portal Home Page" component={SynopsisStatus} />
                <Route  path="/StudentPortal/finalDecisions" name="Faculty Portal Home Page" component={FinalDecision} />
                <Route  path="/StudentPortal/schedulePresentations" name="Faculty Portal Home Page" component={Presentation} />
                <Route  path="/StudentPortal/Notification" name="Faculty Portal Home Page" component={Notification} />
                <Route  path="/StudentPortal/Profile" name="Faculty Portal Home Page" component={Profile} />
                <Route  path="/StudentPortal/UpdateProfile" name="Faculty Portal Home Page" component={UpdateProfile} />
                <Redirect from='/StudentPortal' to='/StudentPortal/Home'/>
              </Switch>
              </main>
            </div>
            <footer className="app-footer">
            <StudentFooter/>
            </footer>
          </div>
      </body>
      </Router>
    );
  }
}

StudentPortal.propTypes = propTypes;
StudentPortal.defaultProps = defaultProps;

export default withAuth(StudentPortal);

