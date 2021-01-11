import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import AuthService from '../AuthTest';
import {AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from "../../assets/img/brand/logodub.jpeg";
import sygnet from "../../assets/img/brand/logodub.jpeg";
import faculty from '../../assets/img/Faculty.png';
import axios from 'axios';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const Auth =new AuthService();

class FacultyHeader extends Component {
    
  constructor(props){
    super(props);
    this.state={
      facultyprofileImage:'',
      notificationcount:''
    }
    this.logoutHandler= this.logoutHandler.bind(this);
  }

  logoutHandler(){
    
    Auth.logout();
    window.location.reload(false);

  }
   
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    console.log(this.state.facultyprofileImage)

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 40, height: 30, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }} style={{width:'80px'}}
        />
        <h2 style={{marginTop:'10px',color:'#3a3a56'}}><strong>SARS</strong></h2>
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/FacultyPortal/Home" className="nav-link" >Home</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
        <NavLink to="/FacultyPortal/Notification" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">6</Badge></NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={faculty} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem><i className="fa fa-user"></i><Link to='/FacultyPortal/Profile' style={{textDecoration:'none'}}>Profile</Link></DropdownItem>
              <DropdownItem onClick={this.logoutHandler}><i className="fa fa-lock"></i> 
                <Link to="/faculty/login" style={{textDecoration:"none"}}>Logout</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

FacultyHeader.propTypes = propTypes;
FacultyHeader.defaultProps = defaultProps;

export default FacultyHeader;