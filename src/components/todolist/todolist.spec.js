import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoList from './todolist';

Enzyme.configure({ adapter: new Adapter() });

describe('<TodoList />', () => {
  const props = {
    getTodoList: jest.fn(),
    markItemInTodoListAsDone: jest.fn(),
    addItemToTodoList: jest.fn(),
    deleteItemInTodoList: jest.fn(),
    updateItemInTodoList: jest.fn(),
    items: [
      {
        id: 1,
        text: 'Some text',
      },
      {
        id: 2,
        text: 'Some other text',
      },
      {
        id: 3,
        text: 'Some last bit of text',
      },
    ],
    date: '2012-05-04',
  };

  it('renders no multiple list items', () => {
    const wrapper = mount(<TodoList {...props} />);
    const elements = wrapper.find('.todo-list--list-item');
    expect(elements.length).toEqual(3);
  });

  it('renders no check list items', () => {
    const theseProps = {
      ...props,
      items: [],
    };
    const wrapper = mount(<TodoList {...theseProps} />);
    const elements = wrapper.find('.todo-list--list-item');
    expect(elements.length).toEqual(0);
  });

  it('converts date appropriately', () => {
    const wrapper = mount(<TodoList {...props} />);
    const element = wrapper.find('.todo-list--header--date').first();
    expect(element.text()).toEqual('Fri 04 May');
  });

  it('calls the addItemToTodoList function when add button is clicked', () => {
    const wrapper = shallow(<TodoList {...props} />);
    const element = wrapper.find('.todo-list--footer--add-new').first();
    element.simulate('click');
    expect(props.addItemToTodoList).toBeCalled();
  });
});
