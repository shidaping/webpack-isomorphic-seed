import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionAjaxGetNewsList } from 'modules/all/actions/news.js';
import { increase, decrease } from 'modules/all/actions/count.js';
// import { actionAjaxGetNewsList } from '../../actions/news.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        it works!
        <div>
          {this.props.number}
          <button onClick={this.props.increase}>increase</button>
          <button onClick={this.props.decrease}>decrease</button>
        </div>

      </div>
    );
  }
}
Home.propTypes = {
  number: PropTypes.number,
  increase: PropTypes.func,
  decrease: PropTypes.func,
};
export default connect(
  state => ({ number: state.count.number }),
  ({ increase, decrease })
)(Home);
