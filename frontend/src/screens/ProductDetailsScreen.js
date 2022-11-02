import { getProduct } from '../api';
import { Rating } from '../components/Rating';
import { parseRequestUrl } from '../utils';

const ProductDetailsScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById('add-btn').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      console.log(product.error);
      return `<h1 style="margin: 0 0 60vh 0;">${product.error.response.data}</h1>`;
    }

    return `
      <section class="product-details">

      <div class="image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="content">
        <h3>${product.name}</h3>
        <h4>Description:</h4>
        <p>${product.description}</p>
        <div class="price">
          price:
          $${product.price} <span>$${product.discountPrice}</span>
        </div>
          <div class="stars">
            ${Rating.render({
              value: product.rating,
              text: `${product.numReviews} reviews`,
            })}
          </div>
          <div><button id="add-btn" class="add-btn">add to cart</button></div>
      </div>

      </section>
    `;
  },
};

export default ProductDetailsScreen;
