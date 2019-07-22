import React, { Component } from 'react';

class List extends Component {
  handleDelEvent(data) {
    let { onDelEvent } = this.props;
    onDelEvent(data);
  }
  render() {
    return (
      <ul className="event-list-section">
        {
          this.props.todoList.map((item, index) => {
            return (
              <li key={item.id} className="event-list-item">
                <span>{item.data}</span>
                <i className="iconfont icon-shanchu" onClick={this.handleDelEvent.bind(this, item)}></i>
              </li>
              )
          })
        }
      </ul>
    )
  }
}

export default List;
