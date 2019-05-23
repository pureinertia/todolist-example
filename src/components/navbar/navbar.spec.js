import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from './navbar';

Enzyme.configure({ adapter: new Adapter() });

describe('<NavBar />', () => {
  const props = {
    user: {
      name: 'Some Name',
    },
  };

  it('renders without errors', () => {
    const wrapper = shallow(<NavBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
