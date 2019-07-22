import { combineReducers } from 'redux'
import { todoList } from './todo'

const todoApp = combineReducers({
  todoList
})

export default todoApp;
