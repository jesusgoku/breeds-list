/**
 * @typedef RequestOptions
 * @property {String} url
 * @property {String} method
 * @property {Object} headers
 *
 * @typedef Breed
 * @property {String} name
 * @property {Breed[]} sub
 */

import axios from 'axios';


class BreedsApi {
  constructor({
    baseUrl = 'https://dog.ceo/api',
  } = {}) {
    this.baseURL = baseUrl;
  }

  /**
   * Make request to Dog-API
   *
   * @param {RequestOptions} requestOptions options for make request
   *
   * @return {Promise}
   */
  async request({ headers, ...options }) {
    const { baseURL } = this;

    const requestOptions = {
      baseURL,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...headers,
      },
      ...options,
    };

    const { data: { message } } = await axios(requestOptions);

    return message;
  }

  /**
   * Retrieve a list of Breeds and Sub-Breeds
   *
   * @return {Promise<Breed>}
   */
  async getBreedsList() {
    const data = await this.request({ url: '/breeds/list/all' });

    return Object
      .entries(data)
      .map(([name, sub]) => ({
        name,
        sub: sub.map(subName => ({ name: subName, sub: [], path: [name, subName] })),
        path: [name],
      }))
    ;
  }

  /**
   * Retrieve random images of breed
   *
   * @param {Number} n number of images to retrieve
   *
   * @return {Promise<String[]>} list of random images
   */
  async getRandomImages(n = 1) {
    n = this._trimToLimits(n, 1, 50);

    const url = `/breeds/image/random${n > 1 ? `/${n}` : ''}`;

    const data = await this.request({ url });

    return this._toArray(data);
  }

  /**
   * Retrieve images for Breed or Sub-Breed
   *
   * @param {String|String[]} breed breed or (breed and sub-breed)
   *
   * @return {Promise<String[]>} list of images for breed
   */
  async getBreedImages(breed) {
    breed = this._toArray(breed).join('/');

    const url = `/breed/${breed}/images`;

    return this.request({ url });
  }

  /**
   * Retrieve random images for Breed or Sub-Breed
   *
   * @param {String|String[]} breed breed or (breed and sub-breed)
   * @param {Number} n number of images to retrieve
   *
   * @return {Promise<String[]>} list of breed or sub-breed images
   */
  async getBreedRandomImages(breed, n = 1) {
    n = this._trimToLimits(n, 1);
    breed = this._toArray(breed).join('/');

    const url = `/breed/${breed}/images/random${n > 1 ? `/${n}` : ''}`;

    const data = await this.request({ url });

    return this._toArray(data);
  }

  /**
   * Retrive a sub-breed list
   *
   * @param {String} breed breed for return sub-breed
   *
   * @return {Promise<String[]>} list of sub-breed
   */
  async getSubBreedList(breed) {
    return this.request({ url: `/breed/${breed}/list` });
  }

  /**
   * Trim n value to min and max value
   *
   * @param {Number} n number to trim
   * @param {Number} min min range available
   * @param {Number} max max range available
   *
   * @return {Number} number trimed
   */
  _trimToLimits(n, min = -Infinity, max = Infinity) {
    return n < min
      ? min
      : (n > max ? max : n);
  }

  /**
   * Convert parameter to array
   *
   * @param {*} item for convert to array if not is array
   *
   * @return {Array} item in an array if this is not array
   */
  _toArray(item) {
    return Array.isArray(item) ? item : [item];
  }
}

export {
  BreedsApi as default,
};
