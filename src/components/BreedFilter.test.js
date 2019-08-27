import React from 'react';
import ReactDOM from 'react-dom';
import BreedFilter from './BreedFilter';

const props = {
  items: [
    {
      name: 'some',
      sub: [],
      path: ['some'],
    },
  ],
  onToggleItem: () => {},
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BreedFilter {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
