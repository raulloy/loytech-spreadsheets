import Swiper from 'swiper';
import axios from 'axios';

const HomeScreen = {
  after_render: () => {
    var swiper = new Swiper('.home-slider', {
      loop: true,
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  },
  render: async () => {
    const response = await axios({
      url: 'http://localhost:5000/api/banner-products',
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const banner = response.data;
    return `
      <!-- banner section starts  -->

      <section class="home">
        <div class="swiper home-slider">
          <div class="swiper-wrapper">

            ${banner.map(
              (product) => `
              <div class="swiper-slide slide">
                <div class="image">
                  <img src="${product.image}" alt="${product.name}" />
                </div>
                <div class="content">
                  <span>upto 50% off</span>
                  <h3>${product.name}</h3>
                  <a href="#" class="btn">shop now</a>
                </div>
              </div>
            `
            )}


          </div>

          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </section>

      <!-- banner section ends -->

      <!-- arrivals section starts  -->

      <section class="arrivals">
        <h1 class="heading">new <span>products</span></h1>

        <div class="box-container">
          <div class="box">
            <div class="image">
              <img src="images/dashboard-1.png" class="main-img" alt="" />
              <img src="images/dashboard-5.png" class="hover-img" alt="" />
            </div>
            <div class="content">
              <h3>excel spreadsheet</h3>
              <div class="price">$249.99 <span>$399.99</span></div>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>
            </div>
          </div>

          <div class="box">
            <div class="image">
              <img src="images/dashboard-2.png" class="main-img" alt="" />
              <img src="images/dashboard-5.png" class="hover-img" alt="" />
            </div>
            <div class="content">
              <h3>excel dashboard</h3>
              <div class="price">$249.99 <span>$399.99</span></div>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>
            </div>
          </div>

          <div class="box">
            <div class="image">
              <img src="images/dashboard-3.png" class="main-img" alt="" />
              <img src="images/dashboard-5.png" class="hover-img" alt="" />
            </div>
            <div class="content">
              <h3>excel spreadsheet</h3>
              <div class="price">$249.99 <span>$399.99</span></div>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>
            </div>
          </div>

          <div class="box">
            <div class="image">
              <img src="images/dashboard-4.png" class="main-img" alt="" />
              <img src="images/dashboard-5.png" class="hover-img" alt="" />
            </div>
            <div class="content">
              <h3>excel dashboard</h3>
              <div class="price">$249.99 <span>$399.99</span></div>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>
            </div>
          </div>

          <div class="box">
            <div class="image">
              <img src="images/dashboard-1.png" class="main-img" alt="" />
              <img src="images/dashboard-5.png" class="hover-img" alt="" />
            </div>
            <div class="content">
              <h3>excel spreadsheet</h3>
              <div class="price">$249.99 <span>$399.99</span></div>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>
            </div>
          </div>

          <div class="box">
            <div class="image">
              <img src="images/dashboard-4.png" class="main-img" alt="" />
              <img src="images/dashboard-5.png" class="hover-img" alt="" />
            </div>
            <div class="content">
              <h3>excel dashboard</h3>
              <div class="price">$249.99 <span>$399.99</span></div>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- arrivals section ends -->
    `;
  },
};

export default HomeScreen;
