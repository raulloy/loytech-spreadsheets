import { getProduct } from '../api';
import { getCartItems, setCartItems } from '../localStorage';
import { parseRequestUrl } from '../utils';

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(
    (element) => element.product == item.product
  );
  if (existItem) {
    cartItems = [...cartItems];
  } else {
    cartItems = [...cartItems, item];
  }

  setCartItems(cartItems);
};

const CartScreen = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      console.log(getCartItems());
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
      console.log(getCartItems());
    }

    return `
        <h1>CartScreen - ${getCartItems().length} items</h1>
    `;
  },
};

export default CartScreen;
