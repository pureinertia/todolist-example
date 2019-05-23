// @flow

import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';

library.add(faCheckSquare, faSquare);

type Props = {
  done: boolean,
  text: string,
  handleCheckBox: Function,
  handleDelete: Function,
  handleUpdateText: Function,
};

const TodoItem = (props: Props) => {
  const {
    done, text, handleCheckBox, handleDelete, handleUpdateText,
  } = props;
  return (
    <li className={classnames(
      'todo-list--list-item',
      { done },
    )}
    >
      <button className="generic-btn todo-item--checkbox-button" type="button" onClick={handleCheckBox}>
        {!done && <FontAwesomeIcon className="todo-item--check-icon" icon={faSquare} />}
        {done && <FontAwesomeIcon className="todo-item--check-icon" icon={faCheckSquare} />}
      </button>
      <input className="todo-list-list-item-text" value={text} onChange={handleUpdateText} type="text" />
      <button className="generic-btn todo-item--delete-button" type="button" onClick={handleDelete}>
        <FontAwesomeIcon className="todo-list--list-item--delete" icon={(faTrashAlt)} />
      </button>
    </li>
  );
};

export default TodoItem;
