import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { Spin, Alert } from 'antd';
import { getAsideListRequest } from '../api/home';

// connect方法的作用：将额外的props传递给组件，并返回新的组件，组件在该过程中不会受到影响
import { connect } from 'react-redux';

// 引入actions
import {
  getAssignClassifyArticleList,
  getAssignDateArticleList,
  getAssignArticle,
  getLifeArticleList
} from '../store/actions';

// import axios from 'axios';
import moment from 'moment';
import '../assets/style/leftAside.scss';

class LeftAside extends Component {
  constructor (props) {
    super(props);
    this.state = {
      classifyList: [],
      lifeArticleList: [],
      dateList: [],
      // 当前选中的模块
      activeTab: ''
    }
  }
  componentDidMount () {
    // let { getLifeArticleList } = this.props
    // getLifeArticleList()
    this.initData()
  }

  // 获取指定分类的文章
  handleClassifyActicle = (classify) => {
    // console.log('this.state.activeTab', this.state.activeTab)
    if (Number(classify.notebookCode) === Number(this.state.activeTab)) return
    localStorage.setItem('activeHomeTab', `classify-${classify.notebookCode}`)
    this.setState({
      activeTab: classify.notebookCode
    });
    let { getAssignClassifyArticleList } = this.props;
    getAssignClassifyArticleList({ classifyId: classify.notebookCode });
  }

  // 获取指定日期的文章
  handleAssignDateActicle = (date) => {
    if (Number(date) === Number(this.state.activeTab)) return
    localStorage.setItem('activeHomeTab', `date-${date}`)
    this.setState({
      activeTab: date
    });
    let { getAssignDateArticleList } = this.props;
    getAssignDateArticleList({ date })
  }

  // 获取指定文章
  handleAssignArtice = (article) => {
    localStorage.setItem('activeHomeTab', `article-${article._id}`)
    this.setState({
      activeTab: article._id
    });
    let { getAssignArticle } = this.props;
    getAssignArticle(article._id)
  }

  // 获取数据
  initData () {
    getAsideListRequest()
      .then(res => {
        // console.log(res.data);
        let { classifyList, lifeArticleList, dateList } = res.data.asideNav;
        let activeHomeTab = localStorage.getItem('activeHomeTab')
        this.setState({
          classifyList,
          lifeArticleList,
          dateList
        })
        if (activeHomeTab) {
          activeHomeTab = activeHomeTab.split('-')
          this.setState({
            activeTab: activeHomeTab[1]
          });
          switch (activeHomeTab[0]) {
            case 'classify':
              this.props.history.push(`/home/articleList/${activeHomeTab[1]}/classify`);
              break;
            case 'date':
              this.props.history.push(`/home/articleList/${activeHomeTab[1]}/date`);
              break;
            default:
              this.props.history.push(`/home/article/${activeHomeTab[1]}`);
          }
        } else {
          this.setState({
            activeTab: this.state.classifyList[0].notebookCode
          });
          this.props.history.push(`/home/articleList/${this.state.classifyList[0].notebookCode}/classify`);
        }
      })
      .catch(err => {
        console.log(err)
      })


  }
  render() {
    // console.log('侧边栏', this.props)
    return (
      <div className="aside-nav-main-component">
        <div className="aside-nav-package-el">
          {/*分类*/}
          <fieldset className="classify-section aside-nav-item">
            <legend>分类</legend>
            <ul className="list">
              {
                this.state.classifyList.map((item) => {
                  return (
                    <li key={item._id} onClick={this.handleClassifyActicle.bind(this, item)} className="list-item">
                      <i className="iconfont icon-biaoqian" style={{color: this.state.activeTab === item.notebookCode ? '#1890ff' : 'gray'}}></i>
                      <Link
                        to={`/home/articleList/${item.notebookCode}/classify`}
                        style={{color: this.state.activeTab === item.notebookCode ? '#1890ff' : '#333333'}}>
                        {item.notebookName}
                      </Link>
                      <span style={{color: 'gray'}}>({item.noteNum})</span>
                    </li>
                  )
                })
              }
            </ul>
          </fieldset>
          {/*生活随笔*/}
          <fieldset className="jottings-section aside-nav-item">
            <legend>生活随笔</legend>
            <ul className="list">
              {
                this.state.lifeArticleList.length ?
                  this.state.lifeArticleList.map((item) => {
                  let state = {
                    pathname: `/home/article/${item._id}`,
                    state: item
                  }
                  return (
                    <li key={item._id} className="list-item" onClick={this.handleAssignArtice.bind(this, item)}>
                      <i className="iconfont icon-wendang" style={{color: this.state.activeTab === item._id ? '#1890ff' : 'gray'}}></i>
                      <Link to={state} style={{color: this.state.activeTab === item._id ? '#1890ff' : 'gray'}}>{item.noteName}</Link>
                    </li>
                  )
                }):
                  <p className="no-content">暂无内容!</p>
              }
            </ul>
          </fieldset>
          {/*日期*/}
          <fieldset className="date-section aside-nav-item">
            <legend>日期</legend>
            <ul className="list">
              {
                this.state.dateList.map((item) => {
                  return (
                    <li key={item} onClick={this.handleAssignDateActicle.bind(this, item)} className="list-item">
                      <i className="iconfont icon-riqi" style={{color: Number(this.state.activeTab) === item ? '#1890ff' : 'gray'}}></i>
                      <Link
                        to={`/home/articleList/${item}/date`}
                        style={{color: Number(this.state.activeTab) === item ? '#1890ff' : '#333333'}}>
                        {moment(item).format('YYYY-MM-DD')}
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </fieldset>
        </div>
      </div>
    )
  }
}

// mapStateToProps: 将state映射到组件的props中
const mapStateToProps = (state) => {
  return {
    articleList: state.articleList,
    activeHomeTab: state.activeHomeTab
  }
}

// mapDispatchToProps: 将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAssignClassifyArticleList (data) {
      dispatch(getAssignClassifyArticleList(data))
    },
    getAssignDateArticleList (data) {
      dispatch(getAssignDateArticleList(data))
    },
    getAssignArticle (data) {
      dispatch(getAssignArticle(data))
    },
    getLifeArticleList () {
      dispatch(getLifeArticleList())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftAside));
