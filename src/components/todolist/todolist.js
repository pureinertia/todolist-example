// @flow

import React from 'react';
import moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import TodoItem from './todoitem';
import './todolist.scss';

library.add(faPlusCircle);

type Props = {
  getTodoList: Function,
  markItemInTodoListAsDone: Function,
  addItemToTodoList: Function,
  deleteItemInTodoList: Function,
  updateItemInTodoList: Function,
  items: array,
  date: date,
};

class TodoList extends React.Component<Props> {
  componentDidMount() {
    const { getTodoList } = this.props;
    getTodoList();
  }

  getDate() {
    const { date } = this.props;
    if (date) {
      return moment(date).format('ddd DD MMMM');
    }
    return '';
  }

  handleCheckBox(id, done) {
    const { markItemInTodoListAsDone } = this.props;
    markItemInTodoListAsDone(id, done);
  }

  handleDelete(id) {
    const { deleteItemInTodoList } = this.props;
    deleteItemInTodoList(id);
  }

  handleUpdateText(event, id) {
    const { updateItemInTodoList } = this.props;
    updateItemInTodoList(id, event.currentTarget.value);
  }

  handleAddNew() {
    const { addItemToTodoList } = this.props;
    addItemToTodoList();
  }

  render() {
    const { items } = this.props;
    return (
      <div className="todo-list">
        <header className="todo-list--header">
          <h1>Team To-Do List</h1>
          <p className="todo-list--header--date">{this.getDate()}</p>
        </header>
        <ul className="todo-list--list">
          {items.map(item => (
            <TodoItem
              {...item}
              handleCheckBox={() => this.handleCheckBox(item.id, !item.done)}
              handleDelete={() => this.handleDelete(item.id)}
              handleUpdateText={event => this.handleUpdateText(event, item.id)}
              key={item.id}
            />
          ))}
        </ul>
        <footer className="todo-list--footer">
          <button
            type="button"
            className="generic-btn todo-list--footer--button todo-list--footer--add-new"
            onClick={() => this.handleAddNew()}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            Add a to-do
          </button>
        </footer>
      </div>
    );
  }
}

export default TodoList;
