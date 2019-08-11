import axios from 'axios';
// 获取指定分类的文章列表
export const getAssignClassifyArticleList = classifyId => {
  return (dispatch, getState) => {
    axios.get(`http://localhost:3000/api/blog/getClassifyArticle/${classifyId}`)
      .then(response => {
        dispatch({ type: 'UPDATE_ARTICLE_LIST', data: response.data.articleList })
      })
  }
}

// 获取指定日期的文章列表
export const getAssignDateArticleList = date => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3000/api/blog/getAssignDateArticle/${date}`)
        .then(response => {
          dispatch({ type: 'UPDATE_ARTICLE_LIST', data: response.data.articleList })
          resolve()
        })
        .catch(err => {
          reject()
        })
    })
  }
}

// 获取指定文章内容
export const getAssignArticle = articleId => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3000/api/blog/getAssignArticle/${articleId}`)
        .then(response => {
          dispatch({ type: 'UPDATE_ACTIVE_ARTICLE', data: response.data.article })
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
