import React, { Component } from "react";
import "../assets/style/articleContent.scss";
import moment from "moment";
import { connect } from "react-redux";
import { getAssignArticle } from "../store/actions/home";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: true,
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
  getAssignArticle: any;
  activeArticle: any;
}
interface IState {
  count: number;
}

class ArticleContent extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    let { articleId } = this.props.match.params;
    let { getAssignArticle } = this.props;
    getAssignArticle(articleId);
  }

  render() {
    // console.log('ArticleContent', this.props.location)
    let { activeArticle } = this.props;
    // activeArticle.noteContent && console.log(marked(activeArticle.noteContent));
    return (
      <div className="article-content-main-component">
        <article>
          <header className="article-title">
            <h3>{activeArticle.noteName}</h3>
          </header>
          <p className="article-other-info">
            <span className="create-time">
              <i className="iconfont icon-riqi"></i>
              <span>
                {moment(activeArticle.createTime).format("YYYY-MM-DD")}
              </span>
            </span>
            <span className="label">
              <i className="iconfont icon-biaoqian"></i>
              <span>{activeArticle.notebookName}</span>
            </span>
          </p>
          <div
            className="article-content"
            dangerouslySetInnerHTML={{
              __html: activeArticle.noteContent
                ? marked(activeArticle.noteContent)
                : ""
            }}
          ></div>
        </article>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    activeArticle: state.activeArticle
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    getAssignArticle(data: string) {
      dispatch(getAssignArticle(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleContent);
