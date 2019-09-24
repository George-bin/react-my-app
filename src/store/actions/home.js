import { message } from "antd";
import {
  getAssignClassifyArticleListRequest,
  getAssignDateArticleListRequest,
  getAssignArticleRequest,
  getLifeArticleListRequest
} from "../../api/home";

// 获取指定分类的文章列表
export const getAssignClassifyArticleList = ({ classifyId, page }) => {
  return (dispatch, getState) => {
    getAssignClassifyArticleListRequest({ classifyId, page }).then(response => {
      let { errcode, classifyInfo } = response.data;
      if (errcode === 0) {
        dispatch({ type: "UPDATE_ARTICLE_LIST", data: classifyInfo });
      } else if (errcode === 998) {
        message.error("当前分类不存在!");
        localStorage.removeItem('activeHomeTab')
      } else {
        message.error("获取文章列表失败!");
      }
    });
  };
};

// 获取指定日期的文章列表
export const getAssignDateArticleList = ({ date, page }) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      getAssignDateArticleListRequest({ date, page })
        .then(response => {
          let { errcode, classifyInfo } = response.data;
          // debugger;
          if (errcode === 0) {
            dispatch({ type: "UPDATE_ARTICLE_LIST", data: classifyInfo });
          } else {
            message.error("获取文章列表失败!");
          }
          resolve();
        })
        .catch(err => {
          reject();
        });
    });
  };
};

// 获取指定文章内容
export const getAssignArticle = articleId => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      getAssignArticleRequest(articleId)
        .then(response => {
          dispatch({
            type: "UPDATE_ACTIVE_ARTICLE",
            data: response.data.article
          });
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  };
};

// 获取生活随笔文章列表
export const getLifeArticleList = () => {
  return (dispath, getState) => {
    return new Promise((resolve, reject) => {
      getLifeArticleListRequest({})
        .then(response => {
          let { errcode, lifeArticeList } = response.data;
          if (errcode === 0) {
            dispath({
              type: "UPDATE_LIFT_ARTICLE_LIST",
              data: lifeArticeList
            })
          }
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
