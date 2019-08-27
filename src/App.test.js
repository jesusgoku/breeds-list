import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

describe('App component', () => {
  it('renders without crashing', () => {
    mount(<App />);
  });

  it('renders (shallow) without crashing', () => {
    shallow(<App />);
  });
});
