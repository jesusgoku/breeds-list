import React, { Component } from 'react';

import BreedPills from './components/BreedPills';
import BreedFilter from './components/BreedFilter';
import Gallery from './components/Gallery';

import makeCancelable from './libs/make-cancelable';
import BreedsApi from './services/breeds-api';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breedsList: [],
      selected: {},
    };

    this.handleToggleItem = this.handleToggleItem.bind(this);
    this.handleClearItems = this.handleClearItems.bind(this);
  }

  async componentDidMount() {
    this.cancelablePromise = makeCancelable(BreedsApi.getBreedsList());

    try {
      const breedsList = await this.cancelablePromise.promise;
      this.setState({ breedsList });
    } catch (e) {
      if (!e.isCanceled) throw e;
    }
  }

  componentWillUnmount() {
    if (this.cancelablePromise) {
      this.cancelablePromise.cancel();
    }
  }

  handleToggleItem(item) {
    const { name } = item;

    this.setState(({ selected }) => {
      if (name in selected) {
        const { [name]: _, ...rest } = selected;
        return { selected: rest };
      } else {
        return { selected: {...selected, [name]: item} };
      }
    });
  }

  handleClearItems() {
    this.setState({ selected: {} });
  }

  processList(list) {
    const { selected } = this.state;

    return list
      .map(({ name, sub, ...rest }) => ({
        ...rest,
        name,
        selected: name in selected,
        sub: sub && sub.length ? this.processList(sub) : [],
      }));
  }

  render() {
    const { breedsList, selected } = this.state;
    const items = this.processList(breedsList);

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="BreedTitle text-center">Breeds List</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="BreedSidebar">
                <BreedPills items={selected} onToggleItem={this.handleToggleItem} onClearItems={this.handleClearItems} />
                <BreedFilter items={items} onToggleItem={this.handleToggleItem} />
              </div>
            </div>

            <div className="col-md-8">
              <Gallery items={selected} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
