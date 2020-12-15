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

class StudentSideBar extends Component {


    render() {

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
                            <Link to={'/StudentPortal'} className="nav-link"><i className="nav-icon icon-home"></i>Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/StudentPortal/regSynopsis'} className="nav-link">
                                <i className="nav-icon icon-graduation"></i> Register Synopsis
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/StudentPortal/fileSynopsis'} className="nav-link"><i className="nav-icon icon-docs"></i>Upload File</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/StudentPortal/statusSynopsis'} className="nav-link"><i className="nav-icon icon-people"></i>Synopsis Status</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/StudentPortal/finalDecisions'} className="nav-link"><i className="nav-icon icon-hourglass"></i>Decisions</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/StudentPortal/schedulePresentations'} className="nav-link"><i className="nav-icon cui-speedometer"></i>Presentation</Link>
                        </NavItem>
                    </Nav>
                    </AppSidebarNav>
                    <AppSidebarMinimizer />
                </AppSidebar>
            </React.Fragment>
        );
    }
}

StudentSideBar.propTypes = propTypes;
StudentSideBar.defaultProps = defaultProps;

export default StudentSideBar;
