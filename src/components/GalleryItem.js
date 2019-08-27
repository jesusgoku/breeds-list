import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import BreedItemType from '../types/BreedItemType';
import classnames from 'classnames';
import BreedApi from '../services/breeds-api';

import './GalleryItem.css';

class GalleryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      image: undefined,
    };
  }

  async componentDidMount() {
    const { item } = this.props;
    const { path } = item;

    this.setState({ isLoading: true });

    // Retrieve image from API
    const images = await BreedApi.getBreedRandomImages(path);
    const image = images[0];

    // Preload image
    const imageEl = new Image();
    imageEl.addEventListener('load', () => {
      this.setState({ image: image, isLoading: false })
    });
    imageEl.src = image;
  }

  render() {
    const { isLoading, image } = this.state;
    const { item } = this.props;
    const { path } = item;
    const name = path.join(' - ');

    return (
      <div className={classnames('GalleryItem', { 'GalleryItem--loading': isLoading })}>
        {isLoading
          ? (<span className="GalleryItem__Loading fa fa-spinner fa-pulse fa-5x fa-fw"></span>)
          : (<img className="GalleryItem__Img" src={image} alt={name} title={name} />)}
        <div className="GalleryItem__Title">{name}</div>
      </div>
    );
  }
}

GalleryItem.propTypes = {
  item: BreedItemType,
};

export {
  GalleryItem as default,
}
