// 工具函数用于组织多个reducers，并返回reducers集合
import { combineReducers } from 'redux';
import { todoList } from './todo';
import { articleList, activeArticle } from './home';

const todoApp = combineReducers({
  todoList,
  articleList,
  activeArticle
})

export default todoApp;
