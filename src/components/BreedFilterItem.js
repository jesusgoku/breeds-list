import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BreedItemType from '../types/BreedItemType';

import './BreedFilterItem.css';

class BreedFilterItem extends Component {
  constructor(props) {
    super(props);

    this.handleToggleItem = this.handleToggleItem.bind(this);
  }

  handleToggleItem() {
    const { item, onToggleItem } = this.props;

    if (typeof onToggleItem === 'function') {
      onToggleItem(item);
    }
  }

  render() {
    const { item, onToggleItem } = this.props;
    const { name, sub, selected } = item;
    const hasSub = !!(sub && sub.length)

    return (
      <div className="BreedFilterItem">
        <label className="BreedFilterItem__Label">{name}
          <input
            className="BreedFilterItem__Input"
            type="checkbox"
            value={name}
            checked={selected}
            onChange={this.handleToggleItem} />
          <span className="BreedFilterItem__Checkmark"></span>
        </label>
        {hasSub && sub.map(item => (<BreedFilterItem key={item.name} item={item} onToggleItem={onToggleItem} />))}
      </div>
    );
  }
}

BreedFilterItem.propTypes = {
  item: BreedItemType,
  onToggleItem: PropTypes.func,
};

export {
  BreedFilterItem as default,
}
