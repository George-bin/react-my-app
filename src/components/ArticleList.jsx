import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import '../assets/style/articleList.scss';

class ArticleList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { articleList } = this.props;
    console.log('articleList', articleList)
    return (
      <div className="article-list-main-components">
        <h2 className="article-list-title">文章列表</h2>
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

export default connect(mapStateToProps, null)(ArticleList)
