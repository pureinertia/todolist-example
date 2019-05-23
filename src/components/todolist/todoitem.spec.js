import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoItem from './todoitem';

Enzyme.configure({ adapter: new Adapter() });

describe('<TodoItem />', () => {
  const props = {
    done: false,
    text: 'Todo information',
    handleCheckBox: jest.fn(),
    handleDelete: jest.fn(),
    handleUpdateText: jest.fn(),
  };

  it('renders ticked checkbox when done', () => {
    const theseProps = {
      ...props,
      done: true,
    };
    const wrapper = mount(<TodoItem {...theseProps} />);
    const elements = wrapper.find('.fa-check-square');
    expect(elements.length).toEqual(1);
  });

  it('renders unticked checkbox when done', () => {
    const wrapper = mount(<TodoItem {...props} />);
    const elements = wrapper.find('.fa-square');
    expect(elements.length).toEqual(1);
  });

  it('calls the handleDelete function when trash icon is clicked', () => {
    const wrapper = shallow(<TodoItem {...props} />);
    const element = wrapper.find('.todo-item--delete-button').first();
    element.simulate('click');
    expect(props.handleDelete).toBeCalled();
  });

  it('calls the handleCheckBox function when checkbox is clicked', () => {
    const wrapper = shallow(<TodoItem {...props} />);
    const element = wrapper.find('.todo-item--checkbox-button').first();
    element.simulate('click');
    expect(props.handleCheckBox).toBeCalled();
  });
});
