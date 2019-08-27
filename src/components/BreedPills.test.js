import React from 'react';
import { mount, shallow} from 'enzyme';
import BreedPills from './BreedPills';

const props = {
  items: {
    'some': {
      name: 'some',
      sub: [],
      path: ['some'],
    }
  },
  onToggleItem: jest.fn(() => {}),
  onClearItems: jest.fn(() => {}),
};

describe('BreedPills', () => {
  it('renders without crashing', () => {
    mount(<BreedPills {...props} />);
  });

  it('renders (shallow) without crashing', () => {
    shallow(<BreedPills {...props} />);
  });

  it('should contain BreedPills__Item', () => {
    const wrapper = shallow(<BreedPills {...props} />);
    const itemsEl = wrapper.find('.BreedPills__Item');
    expect(itemsEl.length).toEqual(1);
    expect(itemsEl.contains('some')).toBe(true);
  });

  it('should call onToggleItem prop when click on BreedPills__Item', () => {
    const wrapper = shallow(<BreedPills {...props} />);
    wrapper.find('.BreedPills__Item').simulate('click');
    expect(props.onToggleItem.mock.calls.length).toEqual(1);
  });

  it('should call onClearItems prop when click on BreedPills__ClearBtn', () => {
    const wrapper = shallow(<BreedPills {...props} />);
    wrapper.find('.BreedPills__ClearBtn').simulate('click');
    expect(props.onClearItems.mock.calls.length).toEqual(1);
  });
});
