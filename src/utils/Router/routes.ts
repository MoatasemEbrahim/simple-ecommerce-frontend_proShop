import Home from '../../pages/Home';
import Product from '../../pages/Product';
import Cart from '../../pages/Cart';

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
    path: '/cart/:id',
    key: 'Cart',
    exact: true,
    component: Cart,
  },
];

export default Routes;
