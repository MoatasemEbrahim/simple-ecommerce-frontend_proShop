import Home from '../../pages/Home';
import Product from '../../pages/Product';
import Cart from '../../pages/Cart';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Profile from '../../pages/Profile';
import Shipping from '../../pages/Shipping';

const Routes = [
  {
    path: '/',
    key: 'home',
    exact: true,
    component: Home,
  },
  {
    path: '/product/:id',
    key: 'Product',
    exact: true,
    component: Product,
  },
  {
    path: '/cart/:id?',
    key: 'Cart',
    exact: true,
    component: Cart,
  },
  {
    path: '/login',
    key: 'login',
    exact: true,
    component: Login,
  },
  {
    path: '/register',
    key: 'register',
    exact: true,
    component: Register,
  },
  {
    path: '/profile',
    key: 'profile',
    exact: true,
    component: Profile,
  },
  {
    path: '/shipping',
    key: 'shipping',
    exact: true,
    component: Shipping,
  },
];

export default Routes;
