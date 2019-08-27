import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BreedItemType from '../types/BreedItemType';

import './BreedPills.css';

class BreedPills extends Component {
  render() {
    const { items, onToggleItem, onClearItems } = this.props;
    const names = Object.entries(items);

    return !!names.length && (
      <div className="BreedPills">
        {names.map(([name, item]) => (
          <span key={name} className="BreedPills__Item" onClick={() => onToggleItem(item)}>
            {name} <i className="fa fa-times"></i>
          </span>
        ))}

        <p className="text-center mb-0">
          <button className="btn btn-link btn-sm" onClick={onClearItems}>
            Clear all
          </button>
        </p>
      </div>
    );
  }
}

BreedPills.propTypes = {
  items: PropTypes.objectOf(BreedItemType),
  onToggleItem: PropTypes.func,
  onClearItems: PropTypes.func,
};

export {
  BreedPills as default,
}
