import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
class Main extends Component {
  render() {
    // return this.props.children ? Children.only(this.props.children) : null;
    return (
      <div>
        <ul className="nav">
          <li><Link to={'/'} onlyActiveOnIndex activeClassName="active">home</Link></li>
          <li><Link to={'/news-list'} activeClassName="active">news list</Link></li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
Main.propTypes = {
  children: PropTypes.any,
};
export default Main;
