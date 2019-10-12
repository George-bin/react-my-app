import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import { Menu, Dropdown, Icon } from "antd";
import avatarImg from "../assets/img/icon.jpg";
import "../assets/style/mainHeader.scss";

// connect方法的作用：将额外的props传递给组件，并返回新的组件，组件在该过程中不会受到影响
import { connect } from "react-redux";

// 引入actions
import {
  getSearchArticle,
  showSearchContentAction,
  getAssignArticle
} from "../store/actions";

interface IProps {
  match: any;
  searchContent: any;
  getSearchArticle: any;
  searchArticleList: any[];
  showSearchContent: boolean;
  showSearchContentAction: any;
  getAssignArticle: any;
}
interface IState {
  activeRoute: string;
  showSearchInp: boolean;
  searchInput: any;
  showDropdownMenu: boolean;
}

class MainHeader extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeRoute: "Home",
      // 显示搜索框
      showSearchInp: false,
      searchInput: React.createRef(),
      showDropdownMenu: false
    };
  }

  handleChangeRoute(item: any, event: any) {
    this.setState({
      activeRoute: item.name,
      showDropdownMenu: false
    });
  }

  // 实时搜索内容
  handleSearchContent = (event: any) => {
    // console.log("内容:", event.target.value);
    let { getSearchArticle } = this.props;
    getSearchArticle(event.target.value);
  };

  // 搜索框获得焦点
  handleSearchInpFocus = () => {
    let { showSearchContentAction } = this.props;
    showSearchContentAction(true);
  };

  // 搜索框失去焦点
  handleSearchInpBlur = () => {
    let { showSearchContentAction } = this.props;
    setTimeout(() => {
      this.setState({
        showSearchInp: false
      });
      showSearchContentAction(false);
    }, 200);
  };

  // 获取指定文章
  handleGetAssignArticle = (articleId: string | number) => {
    let { getAssignArticle } = this.props;
    getAssignArticle(articleId);
    // 滚动到页面顶部
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  // 启动搜索
  handleStartSearch = () => {
    this.setState({
      showSearchInp: true
    });
    this.state.searchInput.current.focus();
  };

  // 显示下拉菜单
  handleOpenDropdownMenu = () => {
    this.setState({
      showDropdownMenu: !this.state.showDropdownMenu
    });
  };

  render() {
    let { searchArticleList, showSearchContent } = this.props;
    let { showSearchInp, searchInput, showDropdownMenu } = this.state;
    // console.log(searchArticleList);
    return (
      <header className="header-container" id="main-header">
        <div className="header-container-package-el">
          <div className="main-title">
            <img src={avatarImg} alt="头像" />
            <h1>
              George<span>前端开发爱好者</span>
            </h1>
          </div>
          {/* 搜索区域 */}
          <div className="search-section">
            <div
              className="search-inp-box"
              style={{ width: showSearchInp ? "167px" : 0 }}
            >
              <input
                className="search-inp"
                type="text"
                onChange={this.handleSearchContent.bind(this)}
                onFocus={this.handleSearchInpFocus.bind(this)}
                onBlur={this.handleSearchInpBlur.bind(this)}
                ref={searchInput}
              />
              <i className="iconfont icon-sousuo"></i>
            </div>
            {/* 搜索结果显示 */}
            {showSearchContent ? (
              <ul className="search-article-list">
                {searchArticleList.map(item => {
                  let path = `/home/article/${item._id}`;
                  return (
                    <li
                      className="search-article-list-item"
                      key={item._id}
                      title={item.noteName}
                      onClick={this.handleGetAssignArticle.bind(this, item._id)}
                    >
                      <Link to={path}>
                        <p className="note-name ellipsis">{item.noteName}</p>
                        <p className="des">
                          <span className="note-book-name ellipsis">
                            {item.notebookName}
                          </span>
                          <time>
                            {moment(item.createTime).format("YYYY-MM-DD HH:mm")}
                          </time>
                        </p>
                      </Link>
                    </li>
                  );
                })}
                {!searchArticleList.length ? (
                  <li>
                    <p>暂无数据!</p>
                  </li>
                ) : null}
              </ul>
            ) : null}
            {/* 搜索按钮 */}
            {showSearchInp ? null : (
              <i
                className="iconfont icon-sousuo search-btn"
                style={{ cursor: "pointer" }}
                onClick={this.handleStartSearch.bind(this)}
              ></i>
            )}
          </div>
          {/* 大屏主导航 */}
          <nav className="main-nav">
            <ul className="aside-nav-list-section">
              <li
                className="aside-nav-list-item"
                onClick={this.handleChangeRoute.bind(this, {
                  name: "Home",
                  label: "首页"
                })}
                style={{
                  borderBottom:
                    this.state.activeRoute === "Home" ? "2px solid #1e90ff" : ""
                }}
              >
                <Link to="/">首页</Link>
              </li>
              <li
                className="aside-nav-list-item"
                onClick={this.handleChangeRoute.bind(this, {
                  name: "Life",
                  label: "生活"
                })}
                style={{
                  borderBottom:
                    this.state.activeRoute === "Life" ? "2px solid #1e90ff" : ""
                }}
              >
                <Link to="/life">生活</Link>
              </li>
            </ul>
          </nav>
          {/* 小屏下拉菜单 */}
          <div className="small-screen-menu">
            <Icon
              type="unordered-list"
              onClick={this.handleOpenDropdownMenu.bind(this)}
            />
            <ul
              className="dropdown-menu"
              style={{ display: showDropdownMenu ? "block" : "none" }}
            >
              <li
                className="dropdown-menu-item"
                onClick={this.handleChangeRoute.bind(this, {
                  name: "Home",
                  label: "首页"
                })}
                style={{
                  borderBottom:
                    this.state.activeRoute === "Home" ? "2px solid #1e90ff" : ""
                }}
              >
                <Link to="/">首页</Link>
              </li>
              <li
                className="dropdown-menu-item"
                onClick={this.handleChangeRoute.bind(this, {
                  name: "Life",
                  label: "生活"
                })}
                style={{
                  borderBottom:
                    this.state.activeRoute === "Life" ? "2px solid #1e90ff" : ""
                }}
              >
                <Link to="/life">生活</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

// mapStateToProps: 将state映射到组件的props中
const mapStateToProps = (state: any) => {
  return {
    searchArticleList: state.searchArticleList,
    showSearchContent: state.showSearchContent
  };
};

// mapDispatchToProps: 将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    getSearchArticle(data: any) {
      dispatch(getSearchArticle(data));
    },
    showSearchContentAction(data: any) {
      dispatch(showSearchContentAction(data));
    },
    getAssignArticle(data: string) {
      dispatch(getAssignArticle(data));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainHeader)
);