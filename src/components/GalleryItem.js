import React, { Component } from 'react';
import classnames from 'classnames';
import BreedItemType from '../types/BreedItemType';
import makeCancelable from '../libs/make-cancelable';
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
    this.cancelablePromise = makeCancelable(BreedApi.getBreedRandomImages(path));
    try {
      const images = await this.cancelablePromise.promise;
      const image = images[0];

      // Preload image
      const imageEl = new Image();
      imageEl.addEventListener('load', () => {
        this.setState({ image: image, isLoading: false })
      });
      imageEl.src = image;
    } catch(e) {
      if (!e.isCanceled) throw e;
    }
  }

  componentWillUnmount() {
    this.cancelablePromise && this.cancelablePromise.cancel();
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
