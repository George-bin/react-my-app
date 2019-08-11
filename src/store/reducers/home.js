// 引入默认值
import defaultState from '../state';

// 文章列表
export const articleList = (state = defaultState.articleList, action) => {
  switch (action.type) {
    case 'UPDATE_ARTICLE_LIST':
      return [
        ...action.data
      ]
    default:
      return state
  }
}

export const activeArticle = (state = defaultState.activeArticle, action) => {
  switch (action.type) {
    case 'UPDATE_ACTIVE_ARTICLE':
      return action.data;
    default:
      return state
  }
}
