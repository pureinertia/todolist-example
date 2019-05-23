import { connect } from 'react-redux';
import TodoList from './todolist';
import {
  getTodoList, addItemToTodoList, deleteItemInTodoList, updateItemInTodoList,
  markItemInTodoListAsDone,
} from '../../reducers/todolist';

const mapState = ({ todolist }) => ({
  items: todolist.items,
  date: todolist.date,
});

const mapDispatch = {
  getTodoList,
  addItemToTodoList,
  deleteItemInTodoList,
  updateItemInTodoList,
  markItemInTodoListAsDone,
};

export default connect(
  mapState,
  mapDispatch,
)(TodoList);
