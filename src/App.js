import React, { Component } from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";
import tick from "./img/tick.svg";
class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: "",

      todoItems: window.localStorage.getItem("items")
        ? JSON.parse(window.localStorage.getItem("items"))
        : [],
    };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onItemClicked = (item) => {
    const isCompleted = item.isCompleted;
    const { todoItems } = this.state;
    const index = todoItems.indexOf(item);
    this.setState({
      todoItems: [
        ...todoItems.slice(0, index),
        {
          ...item,
          isCompleted: !isCompleted,
        },
        ...todoItems.slice(index + 1),
      ],
    });

    // window.localStorage.setItem("items", JSON.stringify(this.state.todoItems));
  };

  onKeyUp(event) {
    if (event.keyCode === 13) {
      let text = event.target.value;
      if (!text) {
        return;
      }

      text = text.trim();
      if (!text) {
        return;
      }

      this.setState({
        newItem: "",
        todoItems: [
          { title: text, isCompleted: false },
          ...this.state.todoItems,
        ],
      });

      console.log(this.state.todoItems);
      console.log(text);

      // window.localStorage.setItem(
      //   "items",
      //   JSON.stringify(this.state.todoItems)
      // );
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value,
    });
  }

  renderTodoList() {
    window.localStorage.setItem("items", JSON.stringify(this.state.todoItems));
    return this.state.todoItems.length ? (
      this.state.todoItems.map((item, index) => (
        <TodoItem
          key={index}
          item={item}
          onClick={() => this.onItemClicked(item)}
        />
      ))
    ) : (
      <React.Fragment>EMPTY</React.Fragment>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="Header">
          <img src={tick} width={32}></img>
          <input
            type="text"
            placeholder="Add a new item"
            value={this.state.newItem}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
          ></input>
        </div>
        {this.renderTodoList()}
      </div>
    );
  }
}

export default App;
