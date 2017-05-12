import React from 'react';
import PropTypes from 'prop-types';
// 6u7import { ajaxGetTodoList } from 'modules/todo/ajax/todo.js';
import { ajaxGetTodoList } from '../../ajax/todo.js';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
  }
  componentDidMount() {
    this.actionAjaxGetTodoList();
  }
  actionAjaxGetTodoList() {
    ajaxGetTodoList({ page: 1 })
    .then((data) => {
      this.setState({
        dataTodoList: data,
      });
    });
  }
  __handleClick() {
    alert('click event');
  }
  render() {
    return (
      <div>
        todo
        <ul>
          {this.state.dataTodoList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <img src={require('./images/test.png')} onClick={this.__handleClick} alt="test img" />
      </div>
    );
  }
}
Home.propTypes = {
  data: PropTypes.any,
};
Home.defaultProps = {
  data: {
    dataTodoList: [],
  },
};
export default Home;