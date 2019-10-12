// 引入默认值
import defaultState from "../state";

// 文章列表
export const classifyInfo = (state = defaultState.classifyInfo, action) => {
  switch (action.type) {
    case "UPDATE_ARTICLE_LIST":
      return action.data;
    default:
      return state;
  }
};

// 当前文章
export const activeArticle = (state = defaultState.activeArticle, action) => {
  switch (action.type) {
    case "UPDATE_ACTIVE_ARTICLE":
      return action.data;
    default:
      return state;
  }
};

// 生活随笔
export const lifeArticleList = (
  state = defaultState.liftArticleList,
  action
) => {
  switch (action.type) {
    case "UPDATE_LIFT_ARTICLE_LIST":
      return action.data;
    default:
      return state;
  }
};

// 搜索内容
export const searchArticleList = (
  state = defaultState.searchArticleList,
  action
) => {
  switch (action.type) {
    case "UPDATE_SEARCH_CONTENT":
      return action.data;
    default:
      return state;
  }
};

// 显示/隐藏搜索内容
export const showSearchContent = (
  state = defaultState.showSearchContent,
  action
) => {
  switch (action.type) {
    case "UPDATE_SHOW_SEARCH_CONTENT":
      return action.data;
    default:
      return state;
  }
};
