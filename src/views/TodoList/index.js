import React, { Component } from 'react';
// connect方法的作用：将额外的props传递给组件，并返回新的组件，组件在该过程中不会受到影响
import { connect } from 'react-redux';
import '../../assets/style/todoList.scss';
import AddInput from './AddInput';
import List from './List';
import { addTodo, delTodo } from '../../store/actions';
// import Button from '@material-ui/core/Button';

class TodoList extends Component {
  render() {
    return (
      <div className="todo-list-main-component">
        <h1>TodoList</h1>
        {/*<Button variant='contained' color='primary'>按钮</Button>*/}
        <AddInput onAddEvent={this.props.addTodo} />
        <List todoList={this.props.todoList} onDelEvent={this.props.delTodo} />
      </div>
    )
  }
}

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state) => {
  return {
    todoList: state.todoList
  }
}
// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addTodo (data) {
      // 如果不懂这里的逻辑可查看前面对redux-thunk的介绍
      dispatch(addTodo(data));
      // 执行setPageTitle会返回一个函数
      // 这正是redux-thunk的所用之处:异步action
      // 上行代码相当于
      /*dispatch((dispatch, getState) => {
          dispatch({ type: 'SET_PAGE_TITLE', data: data })
      )*/
    },
    delTodo (data) {
      dispatch(delTodo(data));
    }
  }
}

TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList)
export default TodoList;
