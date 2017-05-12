import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionAjaxGetNewsList } from 'modules/all/actions/news.js';
// import { actionAjaxGetNewsList } from '../../actions/news.js';

class NewsList extends React.Component {
  componentDidMount() {
    this.props.actionAjaxGetNewsList({ page: 2 });
  }
  render() {
    return (
      <div>
        <ul>
          {this.props.dataNewsList.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
NewsList.propTypes = {
  actionAjaxGetNewsList: PropTypes.func,
  dataNewsList: PropTypes.array,
};
export default connect(
  state => ({ dataNewsList: state.newsList.dataNewsList }),
  dispatch => ({ actionAjaxGetNewsList: () => actionAjaxGetNewsList(dispatch) })
)(NewsList);
