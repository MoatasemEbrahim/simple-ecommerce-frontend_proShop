import Home from '../../pages/Home';
import Product from '../../pages/Product';

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
];

export default Routes;
