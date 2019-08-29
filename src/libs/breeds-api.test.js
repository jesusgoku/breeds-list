import axios from 'axios';
import BreedsApi from './breeds-api';

jest.mock('axios');

const breedsApi = new BreedsApi();

describe('BreedsApi', () => {
  it('should retrieve an image', async () => {
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

    expect(await breedsApi.getBreedsList()).toHaveLength(5);
  });

  it('should retrieve an image', async () => {
    axios
      .mockResolvedValue({
        data: {
          message: 'https://images.dog.ceo/breeds/african/n02116738_6790.jpg',
          status: 'success',
        },
      })
    ;

    expect(await breedsApi.getBreedRandomImages('hound')).toHaveLength(1);
  });
});
