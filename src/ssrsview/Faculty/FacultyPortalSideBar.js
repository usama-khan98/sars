import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import {
    AppAside,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppBreadcrumb2 as AppBreadcrumb,
    AppSidebarNav2 as AppSidebarNav,
  } from '@coreui/react';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class FacultySideBar extends Component {


    render() {


        var reviewer= localStorage.getItem('isReviewer');
        var supervisor= localStorage.getItem('isSupervisor');
        console.log(reviewer+""+supervisor);
        // eslint-disable-next-line
        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <AppSidebar fixed display="lg">
                    <AppSidebarHeader ></AppSidebarHeader>
                    <AppSidebarForm ></AppSidebarForm>
                    <AppSidebarNav >
                    <Nav>
                        <NavItem  >
                            <Link to={'/FacultyPortal'} className="nav-link"><i className="nav-icon icon-home"></i>Home</Link>
                        </NavItem>
                        <NavItem hidden={(supervisor==="true")?false:true}>
                            <Link to={'/FacultyPortal/Student'} className="nav-link">
                                <i className="nav-icon icon-graduation"></i> Students
                            </Link>
                        </NavItem>
                        <NavItem hidden={(supervisor==="true")?false:true}>
                            <Link to={'/FacultyPortal/Synopsis'} className="nav-link"><i className="nav-icon icon-docs"></i> Assignment </Link>
                        </NavItem>
                        <NavItem hidden={(supervisor==="true")?false:true}>
                            <Link to={'/FacultyPortal/ReviewComments'} className="nav-link"><i className="nav-icon icon-people"></i> Review Comments </Link>
                        </NavItem>
                        <NavItem hidden={(supervisor==="true")?false:true}>
                            <Link to={'/FacultyPortal/Presentation'} className="nav-link"><i className="nav-icon cui-speedometer"></i> Presentation</Link>
                        </NavItem>
                        <NavItem hidden={(supervisor==="true")?false:true}>
                            <Link to={'/FacultyPortal/Decisions'} className="nav-link"><i className="nav-icon icon-hourglass"></i> Decisions</Link>
                        </NavItem>
                        <NavItem hidden={(reviewer==="true")?false:true}>
                            <Link to={'/FacultyPortal/ReviewTask'} className="nav-link"><i className="nav-icon icon-layers"></i>Review Tasks</Link>
                        </NavItem>
                    </Nav>
                    </AppSidebarNav>
                    <AppSidebarMinimizer />
                </AppSidebar>
            </React.Fragment>
        );
    }
}

FacultySideBar.propTypes = propTypes;
FacultySideBar.defaultProps = defaultProps;

export default FacultySideBar;


