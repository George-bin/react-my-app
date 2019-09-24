import request from "../utils/request";

// 获取左侧导航栏列表
export function getAsideListRequest() {
  return request({
    url: "/getAsideData",
    method: "get"
  });
}

// 获取指定分类的文章列表
export function getAssignClassifyArticleListRequest({ classifyId, page = 1 }) {
  // console.log('classifyId', classifyId)
  return request({
    url: `/getClassifyArticle/${classifyId}?page=${page}&limit=4`,
    method: "get"
  });
}

// 获取指定日期的文章列表
export function getAssignDateArticleListRequest({ date, page = 1 }) {
  return request({
    url: `/getAssignDateArticle/${date}?page=${page}&limit=4`,
    method: "get"
  });
}

// 获取指定文章内容
export function getAssignArticleRequest(articleId) {
  return request({
    url: `/getAssignArticle/${articleId}`,
    method: "get"
  });
}

// 获取生活随笔文章
export function getLifeArticleListRequest({ page = 1 }) {
  return request({
    url: `/getLifeArticleList?page=${page}&limit=4`,
    method: "get"
  })
}
