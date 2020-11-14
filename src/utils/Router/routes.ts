import Home from '../../pages/Home';

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
    component: Home,
  },
];

export default Routes;
