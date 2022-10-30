import AboutScreen from './screens/AboutScreen.js';
import Error404Screen from './screens/Error404Screen.js';
import HomeScreen from './screens/HomeScreen.js';
import ProductsScreen from './screens/ProductsScreen.js';
import { parseRequestUrl } from './utils.js';

const routes = {
  '/': HomeScreen,
  '/about': AboutScreen,
  '/products': ProductsScreen,
};

const router = async () => {
  const request = parseRequestUrl();
  const parseRequest = request.resource ? `/${request.resource}` : '/';
  const screen = routes[parseRequest] ? routes[parseRequest] : Error404Screen;

  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  screen.after_render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
