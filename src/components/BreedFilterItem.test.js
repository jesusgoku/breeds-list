import React from 'react';
import { mount, shallow } from 'enzyme';
import BreedFilterItem from './BreedFilterItem';

const baseProps = {
  item: {
    name: 'some',
    sub: [],
    path: ['some'],
  },
  onToggleItem: jest.fn(() => {}),
};

describe('BreedFilterItem', () => {
  it('renders without crashing', () => {
    mount(<BreedFilterItem {...baseProps} />);
  });

  it('renders (shallow) without crashing', () => {
    shallow(<BreedFilterItem {...baseProps} />);
  });

  it('should render BreedFilterItem__Label', () => {
    const wrapper = shallow(<BreedFilterItem {...baseProps} />);

    expect(wrapper.find('.BreedFilterItem__Label').length).toEqual(1);
  });

  it('should render recursive component', () => {
    const props = {
      ...baseProps,
      item: {
        ...baseProps.item,
        sub: [baseProps.item]
      }
    };

    const wrapper = mount(<BreedFilterItem {...props} />);

    expect(wrapper.find('.BreedFilterItem').length).toEqual(2);
  });

  it('should call onToggleItem', () => {
    const wrapper = shallow(<BreedFilterItem {...baseProps} />);

    wrapper.find('.BreedFilterItem__Input').simulate('change', { target: { checked: true } })

    expect(baseProps.onToggleItem.mock.calls.length).toEqual(1);
  });
});
