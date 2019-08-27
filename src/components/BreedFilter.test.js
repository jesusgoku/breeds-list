import React from 'react';
import { mount, shallow } from 'enzyme';
import BreedFilter from './BreedFilter';

const baseProps = {
  items: [
    {
      name: 'some',
      sub: [],
      path: ['some'],
    },
  ],
  onToggleItem: jest.fn(() => {}),
};

describe('BreedFilter', () => {
  it('renders without crashing', () => {
    mount(<BreedFilter {...baseProps} />);
  });

  it('renders (shallow) without crashing', () => {
    shallow(<BreedFilter {...baseProps} />);
  });

  it('should display filter on BreedFilter__FilterBtn click', () => {
    const wrapper = shallow(<BreedFilter {...baseProps} />);

    wrapper.find('.BreedFilter__FilterBtn').simulate('click');
    expect(wrapper.find('.BreedFilter__Container--display').length).toEqual(1);
  });
});
