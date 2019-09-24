// 工具函数用于组织多个reducers，并返回reducers集合
import { combineReducers } from 'redux';
import { todoList } from './todo';
import { classifyInfo, activeArticle, lifeArticleList } from './home';

const blogApp = combineReducers({
  lifeArticleList,
  todoList,
  classifyInfo,
  activeArticle
})

export default blogApp;
