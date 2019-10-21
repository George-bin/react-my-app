import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Icon } from "antd";
import { getAsideListRequest } from "../api/home";

// connect方法的作用：将额外的props传递给组件，并返回新的组件，组件在该过程中不会受到影响
import { connect } from "react-redux";

// 引入actions
import {
  getAssignClassifyArticleList,
  getAssignDateArticleList,
  getAssignArticle,
  getLifeArticleList,
  showSmallScreenAsideMenuAction
} from "../store/actions";

// import axios from 'axios';
import moment from "moment";
import "../assets/style/leftAside.scss";

interface IProps {
  match: any;
  getAssignClassifyArticleList: any;
  getAssignDateArticleList: any;
  getAssignArticle: any;
  history: any;
  activeArticle: any;
  location: any;
  showSmallScreenAsideMenuAction: any;
  showSmallScreenAsideMenu: boolean;
}
interface IState {
  classifyList: any;
  lifeArticleList: any;
  dateList: any;
  activeTab: string;
}

class LeftAside extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      classifyList: [],
      lifeArticleList: [],
      dateList: [],
      // 当前选中的模块
      activeTab: ""
    };
  }
  componentDidMount() {
    // let { getLifeArticleList } = this.props
    // getLifeArticleList()
    this.initData();
  }

  // 获取指定分类的文章
  handleClassifyActicle = (classify: any) => {
    // 初始化activeReadPages start
    localStorage.setItem("activeReadPages", "1");
    // 初始化activeReadPages end
    // console.log('this.state.activeTab', this.state.activeTab)
    if (Number(classify.notebookCode) === Number(this.state.activeTab)) return;
    localStorage.setItem("activeHomeTab", `classify-${classify.notebookCode}`);
    this.setState({
      activeTab: classify.notebookCode
    });
    let { getAssignClassifyArticleList } = this.props;
    getAssignClassifyArticleList({ classifyId: classify.notebookCode });
    // 滚动到页面顶部
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  // 获取指定日期的文章
  handleAssignDateActicle = (date: any) => {
    // 初始化activeReadPages start
    localStorage.setItem("activeReadPages", "1");
    // 初始化activeReadPages end
    if (Number(date) === Number(this.state.activeTab)) return;
    localStorage.setItem("activeHomeTab", `date-${date}`);
    this.setState({
      activeTab: date
    });
    let { getAssignDateArticleList } = this.props;
    getAssignDateArticleList({ date });
    // 滚动到页面顶部
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  // 获取指定文章
  handleAssignArtice = (article: any) => {
    localStorage.setItem("activeHomeTab", `article-${article._id}`);
    this.setState({
      activeTab: article._id
    });
    let { getAssignArticle } = this.props;
    getAssignArticle(article._id);
    // 滚动到页面顶部
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  // 关闭小屏菜单
  handleCloseSmallScreenMenu = () => {
    // console.log("小屏菜单");
    let { showSmallScreenAsideMenuAction } = this.props;
    showSmallScreenAsideMenuAction(false);
  };

  // 获取数据
  initData() {
    getAsideListRequest()
      .then(res => {
        // console.log(res.data);
        let { classifyList, lifeArticleList, dateList } = res.data.asideNav;
        let activeHomeTab: any = localStorage.getItem("activeHomeTab");
        this.setState({
          classifyList,
          lifeArticleList,
          dateList
        });
        if (activeHomeTab) {
          activeHomeTab = activeHomeTab.split("-");
          this.setState({
            activeTab: activeHomeTab[1]
          });
          switch (activeHomeTab[0]) {
            case "classify":
              this.props.history.push(
                `/home/articleList/${activeHomeTab[1]}/classify`
              );
              break;
            case "date":
              this.props.history.push(
                `/home/articleList/${activeHomeTab[1]}/date`
              );
              break;
            default:
              this.props.history.push(`/home/article/${activeHomeTab[1]}`);
          }
        } else {
          this.setState({
            activeTab: this.state.classifyList[0].notebookCode
          });
          this.props.history.push(
            `/home/articleList/${this.state.classifyList[0].notebookCode}/classify`
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    let { activeArticle, showSmallScreenAsideMenu } = this.props;
    let { pathname } = this.props.location;
    // console.log("侧边栏", this.props.location);
    return (
      <div className="aside-nav-main-component">
        {/* 大屏右侧菜单 */}
        <div className="aside-nav-package-el">
          {/*分类*/}
          <fieldset className="classify-section aside-nav-item">
            <legend>分类</legend>
            <ul className="list">
              {this.state.classifyList.map((item: any) => {
                return (
                  <li
                    key={item._id}
                    onClick={this.handleClassifyActicle.bind(this, item)}
                    className="list-item"
                  >
                    <i
                      className="iconfont icon-biaoqian"
                      style={{
                        color: /home\/articleList\/(.+)\/classify/g.test(
                          pathname
                        )
                          ? this.state.activeTab === item.notebookCode
                            ? "#1890ff"
                            : "gray"
                          : activeArticle.notebookCode === item.notebookCode
                          ? "#1890ff"
                          : "gray"
                      }}
                    ></i>
                    <Link
                      to={`/home/articleList/${item.notebookCode}/classify`}
                      style={{
                        color: /home\/articleList\/(.+)\/classify/g.test(
                          pathname
                        )
                          ? this.state.activeTab === item.notebookCode
                            ? "#1890ff"
                            : "#333333"
                          : activeArticle.notebookCode === item.notebookCode
                          ? "#1890ff"
                          : "#333333"
                      }}
                    >
                      {item.notebookName}
                    </Link>
                    <span style={{ color: "gray" }}>({item.noteNum})</span>
                  </li>
                );
              })}
            </ul>
            {/*<p>*/}
            {/*<span>更多</span>*/}
            {/*</p>*/}
          </fieldset>
          {/*生活随笔*/}
          <fieldset className="jottings-section aside-nav-item">
            <legend>生活随笔</legend>
            <ul className="list">
              {this.state.lifeArticleList.length ? (
                this.state.lifeArticleList.map((item: any) => {
                  let state = {
                    pathname: `/home/article/${item._id}`,
                    state: item
                  };
                  return (
                    <li
                      key={item._id}
                      className="list-item"
                      onClick={this.handleAssignArtice.bind(this, item)}
                    >
                      <i
                        className="iconfont icon-wendang"
                        style={{
                          color:
                            this.state.activeTab === item._id
                              ? "#1890ff"
                              : "gray"
                        }}
                      ></i>
                      <Link
                        to={state}
                        style={{
                          color:
                            this.state.activeTab === item._id
                              ? "#1890ff"
                              : "gray"
                        }}
                      >
                        {item.noteName}
                      </Link>
                    </li>
                  );
                })
              ) : (
                <p className="no-content">暂无内容!</p>
              )}
            </ul>
          </fieldset>
          {/*日期*/}
          <fieldset className="date-section aside-nav-item">
            <legend>日期</legend>
            <ul className="list">
              {this.state.dateList.map((item: any) => {
                return (
                  <li
                    key={item}
                    onClick={this.handleAssignDateActicle.bind(this, item)}
                    className="list-item"
                  >
                    <i
                      className="iconfont icon-riqi"
                      style={{
                        color:
                          Number(this.state.activeTab) === item
                            ? "#1890ff"
                            : "gray"
                      }}
                    ></i>
                    <Link
                      to={`/home/articleList/${item}/date`}
                      style={{
                        color:
                          Number(this.state.activeTab) === item
                            ? "#1890ff"
                            : "#333333"
                      }}
                    >
                      {moment(item).format("YYYY-MM-DD")}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        </div>
        {/* 移动端左侧滑动菜单 */}
        <div
          className="small-screen-aside-menu"
          style={{
            transform: showSmallScreenAsideMenu
              ? "translate3d(0, 0, 0)"
              : "translate3d(300px, 0, 0)"
          }}
        >
          <ul className="classify-list">
            {this.state.classifyList.map((item: any) => {
              return (
                <li
                  key={item._id}
                  onClick={this.handleClassifyActicle.bind(this, item)}
                  className="classify-list-item"
                >
                  <i
                    className="iconfont icon-biaoqian"
                    style={{
                      color: /home\/articleList\/(.+)\/classify/g.test(pathname)
                        ? this.state.activeTab === item.notebookCode
                          ? "#1890ff"
                          : "gray"
                        : activeArticle.notebookCode === item.notebookCode
                        ? "#1890ff"
                        : "gray"
                    }}
                  ></i>
                  <Link
                    to={`/home/articleList/${item.notebookCode}/classify`}
                    style={{
                      color: /home\/articleList\/(.+)\/classify/g.test(pathname)
                        ? this.state.activeTab === item.notebookCode
                          ? "#1890ff"
                          : "#333333"
                        : activeArticle.notebookCode === item.notebookCode
                        ? "#1890ff"
                        : "#333333"
                    }}
                  >
                    {item.notebookName}
                  </Link>
                  <span style={{ color: "gray" }}>({item.noteNum})</span>
                </li>
              );
            })}
          </ul>
        </div>
        {/* 背景层 */}
        {showSmallScreenAsideMenu ? (
          <div
            className="small-screen-aside-menu-bg"
            onClick={this.handleCloseSmallScreenMenu.bind(this)}
          ></div>
        ) : null}
      </div>
    );
  }
}

// mapStateToProps: 将state映射到组件的props中
const mapStateToProps = (state: any) => {
  return {
    articleList: state.articleList,
    activeHomeTab: state.activeHomeTab,
    activeArticle: state.activeArticle,
    showSmallScreenAsideMenu: state.showSmallScreenAsideMenu
  };
};

// mapDispatchToProps: 将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    getAssignClassifyArticleList(data: any) {
      dispatch(getAssignClassifyArticleList(data));
    },
    getAssignDateArticleList(data: any) {
      dispatch(getAssignDateArticleList(data));
    },
    getAssignArticle(data: any) {
      dispatch(getAssignArticle(data));
    },
    getLifeArticleList() {
      dispatch(getLifeArticleList());
    },
    showSmallScreenAsideMenuAction(data: boolean) {
      dispatch(showSmallScreenAsideMenuAction(data));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LeftAside)
);
