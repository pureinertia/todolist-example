// @flow

import axios from 'axios';
import { TodoListEndPoint } from '../config';

const TODOLIST_FETCH_START = 'TODOLIST_FETCH_START';
const TODOLIST_FETCH_END = 'TODOLIST_FETCH_END';
const TODOLIST_FETCH_ERROR = 'TODOLIST_FETCH_ERROR';
const TODOLIST_UPDATE = 'TODOLIST_UPDATE';
const TODOLIST_ADD = 'TODOLIST_ADD';
const TODOLIST_DELETE = 'TODOLIST_DELETE';
const TODOLIST_MARK_DONE = 'TODOLIST_MARK_DONE';

export const todolistFetchStart = () => ({ type: TODOLIST_FETCH_START });

export const todolistFetchEnd = (payload: any) => ({ type: TODOLIST_FETCH_END, payload });

export const todolistFetchError = () => ({ type: TODOLIST_FETCH_ERROR });

export const todolistUpdate = (id, text) => ({ type: TODOLIST_UPDATE, id, text });

export const todolistMarkDone = (id, done) => ({ type: TODOLIST_MARK_DONE, id, done });

export const todolistAdd = () => ({ type: TODOLIST_ADD });

export const todolistDelete = id => ({ type: TODOLIST_DELETE, id });

export const getTodoList = () => (dispatch) => {
  dispatch(todolistFetchStart());

  return axios.get(TodoListEndPoint)
    .then(response => dispatch(todolistFetchEnd(response.data)))
    .catch(() => dispatch(todolistFetchError()));
};

export const addItemToTodoList = () => (dispatch) => {
  dispatch(todolistAdd());
};

export const updateItemInTodoList = (id, text) => (dispatch) => {
  dispatch(todolistUpdate(id, text));
};

export const markItemInTodoListAsDone = (id, done) => (dispatch) => {
  dispatch(todolistMarkDone(id, done));
};

export const deleteItemInTodoList = id => (dispatch) => {
  dispatch(todolistDelete(id));
};

export const defaultState = {
  items: [],
  date: '',
  fetching: false,
};

export const ItemsReducer = (state: Object = [], action: Object = {}) => {
  const idList = state.map(v => v.id);
  const maxId = Math.max.apply(null, idList);
  switch (action.type) {
    case TODOLIST_ADD:
      return [
        ...state,
        {
          id: maxId + 1,
          text: '',
        },
      ];
    case TODOLIST_MARK_DONE:
      return state.map((item) => {
        if (item.id === action.id) {
          return Object.assign({}, item, {
            done: action.done,
          });
        }
        return item;
      });
    case TODOLIST_UPDATE:
      return state.map((item) => {
        if (item.id === action.id) {
          return Object.assign({}, item, {
            text: action.text,
          });
        }
        return item;
      });
    case TODOLIST_DELETE:
      return state.filter((item) => {
        if (item.id === action.id) {
          return false;
        }
        return true;
      });
    default:
      return state;
  }
};

const TodoListReducer = (state: Object = defaultState, action: Object = {}) => {
  switch (action.type) {
    case TODOLIST_FETCH_START:
      return Object.assign({}, state, {
        fetching: true,
      });
    case TODOLIST_FETCH_END:
      return Object.assign({}, state, {
        fetching: false,
        items: action.payload.items,
        date: action.payload.date,
      });
    case TODOLIST_UPDATE:
    case TODOLIST_ADD:
    case TODOLIST_DELETE:
    case TODOLIST_MARK_DONE:
      return Object.assign({}, state, {
        items: ItemsReducer(state.items, action),
      });
    default:
      return state;
  }
};

export default TodoListReducer;
