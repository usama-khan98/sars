import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class StudentFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="#">Smart Assignment Review System</a> &copy; 2020 .</span>
        <span className="ml-auto">Powered by <a href="#">Univertsity College Dublin</a></span>  
      </React.Fragment>
    );
  }
}

StudentFooter.propTypes = propTypes;
StudentFooter.defaultProps = defaultProps;

export default StudentFooter;
