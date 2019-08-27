import React from 'react';
import ReactDOM from 'react-dom';
import GalleryItem from './GalleryItem';

const props = {
  item: {
    name: 'some',
    sub: [],
    path: ['some'],
  },
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GalleryItem {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
