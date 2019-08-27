import { shape, arrayOf, string, bool } from 'prop-types';

const BreedItem = {
  name: string,
  path: arrayOf(string),
};

const BreedItemType = shape({
  name: string.isRequired,
  path: arrayOf(string),
  selected: bool,
});

BreedItem.sub = arrayOf(BreedItemType);

export {
  BreedItemType as default,
}
