import React, { Component } from "react";
import "./index.css";
import checkImg from "../../img/check.svg";
import checkCompletedImg from "../../img/check-completed.svg";

class TodoItem extends Component {
  render() {
    const { item, onClick } = this.props;

    let className = "TodoItem";
    if (item.isCompleted) {
      className += " TodoItem-completed";
    }

    let url = checkImg;
    if (item.isCompleted) {
      url = checkCompletedImg;
    }

    return (
      <div className={className}>
        <img onClick={onClick} src={url} width={32} />
        <p>{this.props.item.title}</p>
      </div>
    );
  }
}

export default TodoItem;
