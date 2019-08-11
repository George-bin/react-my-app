import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// connect方法的作用：将额外的props传递给组件，并返回新的组件，组件在该过程中不会受到影响
import { connect } from 'react-redux';

// 引入actions
import {
  getAssignClassifyArticleList,
  getAssignDateArticleList
} from '../store/actions';

import axios from 'axios';
import moment from 'moment';
import '../assets/style/leftAside.scss';
// import {articleList} from "../store/reducers/home";

class LeftAside extends Component {
  constructor (props) {
    super(props);
    this.state = {
      classifyList: [],
      jottingsList: [],
      dateList: [],
      // 当前选中的模块
      activeTab: ''
    }
  }
  componentDidMount () {
    this.getData();
  }

  // 获取指定分类的文章
  handleClassifyActicle = (classify) => {
    this.setState({
      activeTab: classify._id
    });
    let { getAssignClassifyArticleList } = this.props;
    getAssignClassifyArticleList(classify.notebookCode)
  }

  // 获取指定日期的文章
  handleAssignDateActicle = (date) => {
    this.setState({
      activeTab: date
    });
    // console.log('date', date)
    let { getAssignDateArticleList } = this.props;
    getAssignDateArticleList(date)
  }

  // 获取指定文章
  handleAssignArtice = (article) => {
    this.setState({
      activeTab: article._id
    });
  }

  // 获取数据
  getData () {
    axios.get('http://localhost:3000/api/blog/getAsideData')
      .then(res => {
        console.log(res.data);
        let { classifyList, jottingsList, dateList } = res.data.asideNav;
        this.setState({
          classifyList,
          jottingsList,
          dateList
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
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
                      <i className="iconfont icon-biaoqian" style={{color: this.state.activeTab === item._id ? '#509827' : 'gray'}}></i>
                      <Link to={`/home/articleList/${item._id}`} style={{color: this.state.activeTab === item._id ? '#509827' : '#333333'}}>{item.notebookName}</Link>
                      <span style={{color: 'gray'}}>({item.noteNum})</span>
                    </li>
                  )
                })
              }
            </ul>
          </fieldset>
          {/*随笔*/}
          <fieldset className="jottings-section aside-nav-item">
            <legend>随笔</legend>
            <ul className="list">
              {
                this.state.jottingsList.length ?
                  this.state.jottingsList.map((item) => {
                  let state = {
                    pathname: `/home/article/${item._id}`,
                    state: item
                  }
                  return (
                    <li key={item._id} className="list-item" onClick={this.handleAssignArtice.bind(this, item)}>
                      <i className="iconfont icon-wendang" style={{color: this.state.activeTab === item._id ? '#509827' : 'gray'}}></i>
                      <Link to={state} style={{color: this.state.activeTab === item._id ? '#509827' : 'gray'}}>{item.noteName}</Link>
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
                      <i className="iconfont icon-riqi" style={{color: this.state.activeTab === item ? '#509827' : 'gray'}}></i>
                      <Link to={`/home/articleList/${item}`} style={{color: this.state.activeTab === item ? '#509827' : '#333333'}}>{moment(item).format('YYYY-MM-DD')}</Link>
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
    articleList: state.articleList
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftAside)
