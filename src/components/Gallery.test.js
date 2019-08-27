import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery';

const props = {
  items: {
    'some': {
      name: 'some',
      sub: [],
      path: ['some'],
    }
  },
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Gallery {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
