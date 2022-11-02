import axios from 'axios';
import { Rating } from '../components/Rating';

const ProductsScreen = {
  after_render: () => {},
  render: async () => {
    const response = await axios({
      url: 'http://localhost:5000/api/products',
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const products = response.data;

    const categories = products.map((product) => product.category);
    const uniqueCategories = categories.filter((v, i, a) => a.indexOf(v) === i);
    return `

<!-- category section starts  -->

<section class="category">

    <h1 class="heading"> shop by <span>category</span> </h1>

    <div class="box-container">
        
        ${uniqueCategories
          .map(
            (cat) => `
            <a href="#" class="box">
                <img src="images/dashboard-1.png" alt="">
                <h3>${cat}</h3>
            </a>
        `
          )
          .join('')}

    </div>

</section>

<!-- category section ends -->

<!-- products section starts  -->

<section class="products">

    <h1 class="heading"> our <span>products</span> </h1>

    <div class="box-container">

      ${products
        .map(
          (product) => `
        <div class="box">
            <div class="image">
            <a href="#/product/${product._id}"><img src="${
            product.image
          }" class="main-img" alt="${product.name}">
                <img src="${product.imageHover}" class="hover-img" alt="${
            product.name
          }"></a>
                <div class="icons">
                    <a href="#/product/${
                      product._id
                    }" class="fas fa-shopping-cart"></a>
                    <a href="#" class="fas fa-search-plus"></a>
                    <a href="#" class="fas fa-heart"></a>
                    <a href="#" class="fas fa-share"></a>
                </div>
            </div>
            <div class="content">
                <h3>${product.name}</h3>
                <div class="price">$${product.price} <span>$${
            product.discountPrice
          }</span></div>
                <div class="stars">
                    ${Rating.render({
                      value: product.rating,
                      text: `${product.numReviews} reviews`,
                    })}
                </div>
            </div>
        </div>
      `
        )
        .join('')}

    </div>

</section>

<!-- products section ends -->

<!-- product banner section starts  -->

<section class="product-banner">

    <h1 class="heading"> <span>deal</span> of the day </h1>

    <div class="box-container">

        <div class="box">
            <img src="images/dashboard-1.png" alt="">
            <div class="content">
                <span>special offer</span>
                <h3>upto 50% off</h3>
                <a href="#" class="btn">shop now</a>
            </div>
        </div>

        <div class="box">
            <img src="images/dashboard-1.png" alt="">
            <div class="content">
                <span>special offer</span>
                <h3>upto 50% off</h3>
                <a href="#" class="btn">shop now</a>
            </div>
        </div>

    </div>
    
</section>

<!-- product banner section ends -->
    `;
  },
};

export default ProductsScreen;
