import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './containers/SSRSHome/Home';
import AboutUs from './containers/SSRSHome/about';
import Terms from './containers/SSRSHome/termsconditions';
import AdminLogin from './ssrsview/Admin/Login';
import FacultyLogin from './ssrsview/Faculty/Login'; 
import StudentLogin from './ssrsview/Student/Login';
import StudentResigtration from './ssrsview/Student/Registration';
import AdminDashboard from './ssrsview/Admin/Admindashboard';
import FacultyPortal from './ssrsview/Faculty/FacultyPortal';
import StudentPortal from './ssrsview/Student/StudentPortal';

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/" name="Home" component={Home}/>
            <Route exact path="/about" name="Home" component={AboutUs}/>
            <Route exact path="/terms" name="Home" component={Terms}/>
            <Route  path="/student/login" name="Student Login" component={StudentLogin} />
            <Route  path="/student/registrtion" name="Student registration" component={StudentResigtration} />
            <Route  path="/faculty/login" name="Faculty Login" component={FacultyLogin} />
            <Route  path="/admin/login" name="Admin Login" component={AdminLogin} />
            <Route  path="/AdminDashboard" name="Admin Dashboard" component={AdminDashboard}/>
            <Route  path="/FacultyPortal" name="Faculty Portal" component={FacultyPortal}/>
            <Route  path="/StudentPortal" name="Student Portal" component={StudentPortal}/>
          </Switch>
      </Router>    
           
    );
  }
}

export default App;