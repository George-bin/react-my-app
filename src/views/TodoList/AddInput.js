import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';

class AddInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventValue: ''
    }
  }
  onClearInput() {
    this.setState({
      eventValue: ''
    })
  }
  handleChange(e) {
    this.setState({
      eventValue: e.target.value
    });
  }
  handKeyDown(e) {
    let { onAddEvent } = this.props;
    switch(e.keyCode) {
      case 13:
        onAddEvent({
          id: Date.now(),
          data: e.target.value
        });
        this.onClearInput();
    }
  }
  render() {
    return (
      <div className="add-event-section">
        <input
          type="text"
          value={this.state.eventValue}
          placeholder="请输入代办事项!"
          onKeyDown={this.handKeyDown.bind(this)}
          onChange={this.handleChange.bind(this)}/>
      </div>
    )
  }
}
export default AddInput;
