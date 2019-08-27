import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BreedItemType from '../types/BreedItemType';
import GalleryItem from './GalleryItem';

import './Gallery.css';

class Gallery extends Component {
  render() {
    const items = Object.entries(this.props.items);

    return !!items.length && (
      <div className="Gallery">
        <div className="row">
          {items.map(([name, item]) => (
            <div className="col-sm-6 col-md-6 col-lg-4" key={name}>
              <GalleryItem item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  items: PropTypes.objectOf(BreedItemType),
};

export {
  Gallery as default,
}
