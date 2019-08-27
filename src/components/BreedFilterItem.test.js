import React from 'react';
import ReactDOM from 'react-dom';
import BreedFilterItem from './BreedFilterItem';

const props = {
  item: {
    name: 'some',
    sub: [],
    path: ['some'],
  },
  onToggleItem: () => {},
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BreedFilterItem {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
