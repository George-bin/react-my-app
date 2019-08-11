import React, { Component } from 'react';
import '../assets/style/articleContent.scss';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  getAssignArticle
} from '../store/actions/home';

class ArticleContent extends Component {
  componentDidMount() {
    let { pathname } = this.props.location;
    let { getAssignArticle } = this.props;
    pathname = pathname.split('/');
    let articleId = pathname[pathname.length - 1];
    getAssignArticle(articleId)
    console.log('this.props.location', this.props.location)
  }

  render () {
    console.log('ArticleContent', this.props.location)
    // let article = this.props.location.state;
    let { activeArticle } = this.props;
    return (
      <div className="article-content-main-component">
        <article>
          <header className="article-title">
            <h3>{activeArticle.noteName}</h3>
          </header>
          <p className="article-other-info">
            <span className="create-time">
              <i className="iconfont icon-riqi"></i>
              <span>{moment(activeArticle.createTime).format('YYYY-MM-DD')}</span>
            </span>
            <span className="label">
              <i className="iconfont icon-biaoqian"></i>
              <span>{activeArticle.notebookName}</span>
            </span>
          </p>
          <div className="article-content" dangerouslySetInnerHTML={{__html: activeArticle.noteContent}}></div>
        </article>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeArticle: state.activeArticle
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAssignArticle (data) {
      dispatch(getAssignArticle(data))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContent)
