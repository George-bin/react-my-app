import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import '../assets/style/articleList.scss';
import {getAssignClassifyArticleList, getAssignDateArticleList} from '../store/actions';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    // console.log('获取文章列表:', this.props)
    let { getAssignClassifyArticleList, getAssignDateArticleList } = this.props;
    let { classifyId, type} = this.props.match.params;
    if (type === 'classify') {
      getAssignClassifyArticleList(classifyId);
    } else {
      getAssignDateArticleList(classifyId)
    }
  }

  render() {
    let { articleList } = this.props;
    let { type } = this.props.match.params;
    // console.log('this.props.history.location', this.props.match.params)
    return (
      <div className="article-list-main-components">
        {
          type === 'classify' ?
            <h2 className="article-list-title">文章列表 {articleList.length ? articleList[0].notebookName : ''}</h2> :
            <h2 className="article-list-title">文章列表 {articleList.length ? moment(articleList[0].createTime).format('YYYY-MM-DD') : ''}</h2>
        }
        {
          articleList.length ?
            <ul className="article-list-section">
              {
                articleList.map((article, index) => {
                  let state = {
                    pathname: `/home/article/${article._id}`,
                    state: article
                  }
                  return (
                    <li className="article-list-item" key={index}>
                      <article>
                        <h3 className="article-title">{article.noteName}</h3>
                        <p className="article-other-info">
                          <span className="create-time">
                            <i className="iconfont icon-riqi"></i>
                            <span>{moment(article.createTime).format('YYYY-MM-DD')}</span>
                          </span>
                          <span className="label">
                            <i className="iconfont icon-biaoqian"></i>
                            <span>{article.notebookName}</span>
                          </span>
                        </p>
                        <div className="article-content" dangerouslySetInnerHTML={{__html: article.noteContent.substring(0, 400)}}></div>
                        <footer className="article-footer">
                          <Link to={state}>阅读全文</Link>
                        </footer>
                      </article>
                    </li>
                  )
                })
              }
            </ul>:
            <div className="none-article">
              <i className="iconfont icon-wendang"></i>
              <p>文章列表空空如也!</p>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articleList: state.articleList
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAssignClassifyArticleList (data) {
      dispatch(getAssignClassifyArticleList(data))
    },
    getAssignDateArticleList (data) {
      dispatch(getAssignDateArticleList(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
