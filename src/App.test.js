import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import App from './App';

jest.mock('axios');

axios
  .mockResolvedValue({
    data: {
      message: {
          "bulldog": [
            "boston",
            "english",
            "french"
        ],
        "bullterrier": [
            "staffordshire"
        ],
        "cairn": [],
        "cattledog": [
            "australian"
        ],
        "chihuahua": [],
      },
      status: 'success',
    },
  })
;

describe('App component', () => {
  it('renders without crashing', () => {
    mount(<App />);
  });

  it('renders (shallow) without crashing', () => {
    shallow(<App />);
  });

  it('should generate list', async () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();

    await instance.componentDidMount();

    expect(instance.state).toHaveProperty('breedsList');
    expect(instance.state.breedsList).toHaveLength(5);
  });
});
