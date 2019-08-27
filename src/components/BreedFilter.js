import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import BreedFilterItem from './BreedFilterItem';
import BreedItemType from '../types/BreedItemType';

import './BreedFilter.css';

class BreedFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filtersDisplay: false,
    };

    this.handleToggleFiltersDisplay = this.handleToggleFiltersDisplay.bind(this);
  }

  handleToggleFiltersDisplay() {
    this.setState(({ filtersDisplay }) => ({ filtersDisplay: !filtersDisplay }));
  }

  render() {
    const { filtersDisplay } = this.state;
    const { items, onToggleItem } = this.props;

    return (
      <div className="BreedFilter">
        <button className="BreedFilter__FilterBtn btn btn-primary btn-block d-block d-md-none mb-1" onClick={this.handleToggleFiltersDisplay}>Filtrar</button>

        <div className={classnames('BreedFilter__Container', { 'BreedFilter__Container--display': filtersDisplay })}>
          <div className="BreedFilter__List">
            {items.map((item) => (<BreedFilterItem key={item.name} item={item} onToggleItem={onToggleItem} />))}
          </div>

          <button className="BreedFilter__ReadyBtn btn btn-primary btn-block d-block d-md-none" onClick={this.handleToggleFiltersDisplay}>Listo</button>
        </div>
      </div>
    );
  }
}

BreedFilter.propTypes = {
  items: PropTypes.arrayOf(BreedItemType),
  onToggleItem: PropTypes.func,
};

export {
  BreedFilter as default,
}
