import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Layout from './layout';

Enzyme.configure({ adapter: new Adapter() });

describe('<Layout />', () => {
  const props = {
    user: {
      name: 'Some Name',
    },
  };

  it('renders without errors', () => {
    const wrapper = shallow(<Layout {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
