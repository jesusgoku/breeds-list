import React from 'react';
import { mount, shallow } from 'enzyme';
import axios from 'axios';
import GalleryItem from './GalleryItem';

jest.mock('axios');

axios
  .mockResolvedValue({
    data: {
      message: 'https://images.dog.ceo/breeds/african/n02116738_6790.jpg',
      status: 'success',
    },
  })
;

const props = {
  item: {
    name: 'some',
    sub: [],
    path: ['some'],
  },
};

describe('GalleryItem', () => {
  it('renders without crashing', () => {
    mount(<GalleryItem {...props} />);
  });

  it('renders (shallow) without crashing', () => {
    shallow(<GalleryItem {...props} />);
  });

  it('should render title from prop item', () => {
    const wrapper = shallow(<GalleryItem {...props} />);
    expect(wrapper.find('.GalleryItem__Title').text()).toEqual(props.item.name);
  });

  it('should render title from prop item', () => {
    const wrapper = shallow(<GalleryItem {...props} />);
    expect(wrapper.find('.GalleryItem__Title').text()).toEqual(props.item.name);
  });
});
