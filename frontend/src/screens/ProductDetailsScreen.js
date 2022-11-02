import { getProduct } from '../api';
import { parseRequestUrl } from '../utils';

const ProductDetailsScreen = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      console.log(product.error);
      return `<h1 style="margin: 0 0 60vh 0;">${product.error.response.data}</h1>`;
    }

    return `<h1 style="margin: 0 0 60vh 0;">${product.name}</h1>`;
  },
};

export default ProductDetailsScreen;
