import TodoListReducer, {
  todolistUpdate,
  todolistMarkDone,
  todolistAdd,
  todolistDelete,
  defaultState,
} from './todolist';

describe('TodoList Reducer', () => {
  const stateWith3Items = {
    ...defaultState,
    items: [
      {
        id: 1,
        text: 'Some text',
        done: true,
      },
      {
        id: 2,
        text: 'Some other text',
        done: false,
      },
      {
        id: 3,
        text: 'Some other other text',
        done: false,
      },
    ],
  };

  it('should return original state when no action type matches', () => {
    const result = TodoListReducer();
    expect(result).toBe(defaultState);
  });

  it('add a new item', () => {
    const newState = TodoListReducer(stateWith3Items, todolistAdd());

    expect(newState.items.length).toEqual(4);
  });

  it('should mark item as down', () => {
    const newState = TodoListReducer(stateWith3Items, todolistMarkDone(2, true));
    expect(newState.items[1].done).toEqual(true);
  });

  it('should mark item as not done', () => {
    const newState = TodoListReducer(stateWith3Items, todolistMarkDone(1, false));
    expect(newState.items[0].done).toEqual(false);
  });

  it('should delete item', () => {
    const newState = TodoListReducer(stateWith3Items, todolistDelete(1));
    expect(newState.items.length).toEqual(2);
    expect(newState.items.filter(item => item.id === 1).length).toEqual(0);
  });

  it('should update text for item', () => {
    const newState = TodoListReducer(stateWith3Items, todolistUpdate(1, 'Some new text'));
    expect(newState.items[0].text).toEqual('Some new text');
  });
});
