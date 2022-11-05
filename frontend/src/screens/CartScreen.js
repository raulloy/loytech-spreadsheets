import { getProduct } from '../api';
import { getCartItems, setCartItems } from '../localStorage';
import { parseRequestUrl, rerender } from '../utils';

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(
    (element) => element.product == item.product
  );
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((element) =>
        element.product == existItem.product ? item : element
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartScreen);
  }
};

const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((element) => element.product !== id));
  if (id == parseRequestUrl().id) {
    document.location.hash = '/cart';
  } else {
    rerender(CartScreen);
  }
};

const CartScreen = {
  after_render: () => {
    const qtySelects = document.getElementsByClassName('qty-select');
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener('change', (e) => {
        const item = getCartItems().find((x) => x.product == qtySelect.id);
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });
    const deleteBtns = document.getElementsByClassName('delete-btn');
    Array.from(deleteBtns).forEach((deleteBtn) => {
      deleteBtn.addEventListener('click', (e) => {
        removeFromCart(deleteBtn.id);
      });
    });
    document.getElementById('checkout-btn').addEventListener('click', () => {
      document.location.hash = '/signin';
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      //   console.log(getCartItems());
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        discountPrice: product.discountPrice,
        countInStock: product.countInStock,
        qty: 1,
      });
      // console.log(getCartItems());
    }
    const cartItems = getCartItems();

    return `
<!-- shopping cart section starts  -->

<section class="shopping-cart">
    ${
      cartItems.length == 0
        ? '<h2>Shopping Cart empty - <a href="/#/products" class="back">Go Shopping</a></h2>'
        : `
    <h1 class="heading">your <span>products</span></h1>

    <div class="box-container">
        ${cartItems
          .map(
            (item) => `
            <div class="box">
                <i id="${item.product}" class="delete-btn fas fa-times"></i>
                <img src="${item.image}" alt="">
                <div class="content">
                    <h3>${item.name}</h3>
                    <form action="">
                        <span>quantity : </span>
                        <select  class="qty-select" id="${item.product}">
                            ${[...Array(item.countInStock).keys()].map((x) =>
                              item.qty == x + 1
                                ? `<option selected value="${x + 1}">${
                                    x + 1
                                  }</option>`
                                : `<option value="${x + 1}">${x + 1}</option>`
                            )}
                        </select>
                    </form>
                    <div class="price">$${item.price} <span>$${
              item.discountPrice
            }</span></div>
                </div>
            </div>
        `
          )
          .join('')}

    </div>

    <div class="cart-total">
        <h3> items : <span>${cartItems.reduce(
          (acc, cur) => acc + cur.qty,
          0
        )}</span> </h3>
        <h3> taxes : <span>$${
          cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0) * 0.16
        }</span> </h3>
        <h3> subtotal : <span>$${
          cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0) * 1.16
        }</span> </h3>
        <a class="btn" id="checkout-btn">proceed to checkout</a>
    </div>
    `
    }

</section>

<!-- shopping cart section ends -->
    `;
  },
};

export default CartScreen;
