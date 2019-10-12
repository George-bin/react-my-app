import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { Pagination } from "antd";
import "../assets/style/articleList.scss";
import {
  getAssignClassifyArticleList,
  getAssignDateArticleList
} from "../store/actions";

// 语法高亮
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});

interface IProps {
  match: any;
  getAssignClassifyArticleList: any;
  getAssignDateArticleList: any;
  classifyInfo: any;
}
interface IState {
  activePages: number;
}

class ArticleList extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activePages: 1
    };
  }

  componentDidMount() {
    // let pagingConfig = localStorage.getItem('pagingConfig');
    // console.log("获取文章列表:", this.props);
    let { getAssignClassifyArticleList, getAssignDateArticleList } = this.props;
    let { classifyId, type } = this.props.match.params;
    let page = localStorage.getItem("activeReadPages")
      ? Number(localStorage.getItem("activeReadPages"))
      : 1;
    this.setState({
      activePages: page
    });
    if (type === "classify") {
      getAssignClassifyArticleList({ classifyId, page });
    } else {
      getAssignDateArticleList({ date: classifyId, page });
    }
  }

  // 获取指定页面的文章
  handleGetArticleList(e: any) {
    localStorage.setItem("activeReadPages", e);
    this.setState({
      activePages: e
    });
    // console.log(e);
    let { getAssignClassifyArticleList, getAssignDateArticleList } = this.props;
    let { classifyId, type } = this.props.match.params;
    if (type === "classify") {
      getAssignClassifyArticleList({ classifyId, page: e });
    } else {
      getAssignDateArticleList({ date: classifyId, page: e });
    }
  }

  // 阅读更多
  handleReadMore() {
    // 滚动到页面顶部
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {
    let { classifyInfo } = this.props;
    let { type } = this.props.match.params;
    // console.log('this.props.history.location', this.props.match.params)
    return (
      <div className="article-list-main-components">
        {/* 分类标题 */}
        {type === "classify" ? (
          <h2 className="article-list-title">
            文章列表{" "}
            {classifyInfo.articleList.length
              ? classifyInfo.articleList[0].notebookName
              : ""}
          </h2>
        ) : (
          <h2 className="article-list-title">
            文章列表{" "}
            {classifyInfo.articleList.length
              ? moment(classifyInfo.articleList[0].createTime).format(
                  "YYYY-MM-DD"
                )
              : ""}
          </h2>
        )}
        {/* 文章列表 */}
        {classifyInfo.articleList.length ? (
          <div className="article-list-section">
            <ul className="article-list">
              {classifyInfo.articleList.map((article: any, index: number) => {
                let state = {
                  pathname: `/home/article/${article._id}`,
                  state: article
                };
                return (
                  <li className="article-list-item" key={index}>
                    <article>
                      <h3 className="article-title">{article.noteName}</h3>
                      <p className="article-other-info">
                        <span className="create-time">
                          <i className="iconfont icon-riqi"></i>
                          <span>
                            {moment(article.createTime).format("YYYY-MM-DD")}
                          </span>
                        </span>
                        <span className="label">
                          <i className="iconfont icon-biaoqian"></i>
                          <span>{article.notebookName}</span>
                        </span>
                      </p>
                      <div
                        className="article-content"
                        dangerouslySetInnerHTML={{
                          __html: article.noteContent
                            ? marked(article.noteContent.substring(0, 400))
                            : article.noteContent
                        }}
                      ></div>
                      <footer
                        className="article-footer"
                        onClick={this.handleReadMore.bind(this)}
                      >
                        {article.noteLabel === "main-body" ? (
                          <Link to={state}>Read More</Link>
                        ) : (
                          <p className="no-content-tip">草稿!</p>
                        )}
                      </footer>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="none-article">
            <i className="iconfont icon-wendang"></i>
            <p>文章列表空空如也!</p>
          </div>
        )}
        {/* 分页组件 */}
        {classifyInfo.count > 4 ? (
          <Pagination
            defaultCurrent={1}
            defaultPageSize={4}
            current={this.state.activePages}
            total={classifyInfo.count}
            onChange={this.handleGetArticleList.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    classifyInfo: state.classifyInfo
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    getAssignClassifyArticleList(data: any) {
      dispatch(getAssignClassifyArticleList(data));
    },
    getAssignDateArticleList(data: any) {
      dispatch(getAssignDateArticleList(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleList);
