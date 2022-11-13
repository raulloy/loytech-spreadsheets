import Header from './components/Header.js';
import AboutScreen from './screens/AboutScreen.js';
import CartScreen from './screens/CartScreen.js';
import Error404Screen from './screens/Error404Screen.js';
import HomeScreen from './screens/HomeScreen.js';
import ProductDetailsScreen from './screens/ProductDetailsScreen.js';
import ProductsScreen from './screens/ProductsScreen.js';
import SigninScreen from './screens/SigninScreen.js';
import { parseRequestUrl } from './utils.js';

const routes = {
  '/': HomeScreen,
  '/about': AboutScreen,
  '/products': ProductsScreen,
  '/product/:id': ProductDetailsScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
};

const router = async () => {
  const request = parseRequestUrl();
  const parseRequest =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '');
  const screen = routes[parseRequest] ? routes[parseRequest] : Error404Screen;

  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  Header.after_render();

  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  screen.after_render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
