import { getUserInfo } from '../localStorage.js';

const Header = {
  render: () => {
    const { name } = getUserInfo();
    return ` 
    <a href="/" class="logo"> <i class="fas fa-database"></i> LoyTech </a>

    <form action="" class="search-form">
      <input type="search" id="search-box" placeholder="search here..." />
      <label for="search-box" class="fas fa-search"></label>
    </form>

    <div class="icons">
      <div id="menu-btn" class="fas fa-bars"></div>
      <div id="search-btn" class="fas fa-search"></div>
      ${
        name
          ? `<a href="/#/profile">${name}</a>`
          : `<a href="/#/signin" class="fas fa-user"></a>`
      }
      <a href="/#/cart" class="fas fa-shopping-cart"></a>
    </div>
    `;
  },
  after_render: () => {
    let sideBar = document.querySelector('.side-bar');

    document.querySelector('#menu-btn').onclick = () => {
      sideBar.classList.toggle('active');
    };

    document.querySelector('#close-side-bar').onclick = () => {
      sideBar.classList.remove('active');
    };

    let searchForm = document.querySelector('.search-form');

    document.querySelector('#search-btn').onclick = () => {
      searchForm.classList.toggle('active');
    };

    window.onscroll = () => {
      sideBar.classList.remove('active');
      searchForm.classList.remove('active');
    };
  },
};
export default Header;
