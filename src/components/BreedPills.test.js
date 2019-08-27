import React from 'react';
import ReactDOM from 'react-dom';
import BreedPills from './BreedPills';

const props = {
  items: {
    'some': {
      name: 'some',
      sub: [],
      path: ['some'],
    }
  },
  onToggleItem: () => {},
  onClearItems: () => {},
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BreedPills {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
