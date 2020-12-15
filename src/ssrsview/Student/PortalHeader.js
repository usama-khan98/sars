import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from "reactstrap";
import PropTypes from "prop-types";
import AuthService from "../AuthTest";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../assets/img/brand/logodub.jpeg";
import sygnet from "../../assets/img/brand/logodub.jpeg";
import student from '../../assets/img/student.png'
import axios from 'axios'
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const Auth = new AuthService();

class StudentHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentprofileImage:'',
      notificationcount:''
    };
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler() {
    Auth.logout();
    window.location.reload(false);
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 40, height: 30, alt: "CoreUI Logo" }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: "CoreUI Logo" }}
          style={{ width: "80px" }}
        />
        <h2 style={{ marginTop: "10px", color: "#3a3a56" }}>
          <strong>SSRS</strong>
        </h2>
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/StudentPortal/Home" className="nav-link">
              Home
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="/StudentPortal/Notification" className="nav-link">
              <i className="icon-bell"></i>
              <Badge pill color="danger">
                4
              </Badge>
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img
                src={
                  student
                }
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <i className="fa fa-user"></i>
                <Link
                  to="/StudentPortal/Profile"
                  style={{ textDecoration: "none" }}
                >
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem onClick={this.logoutHandler}>
                <i className="fa fa-lock"></i>
                <Link to="/student/login" style={{ textDecoration: "none" }}>
                  Logout
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

StudentHeader.propTypes = propTypes;
StudentHeader.defaultProps = defaultProps;

export default StudentHeader;
