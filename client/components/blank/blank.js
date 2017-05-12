import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
class Blank extends Component {
  render() {
    // return this.props.children ? Children.only(this.props.children) : null;
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
Blank.propTypes = {
  children: PropTypes.any,
};
export default Blank;
