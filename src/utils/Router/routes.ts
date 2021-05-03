import Home from '../../pages/Home';
import Product from '../../pages/Product';
import Cart from '../../pages/Cart';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Profile from '../../pages/Profile';
import Shipping from '../../pages/Shipping';
import Payment from '../../pages/Payment';
import PlaceOrder from '../../pages/PlaceOrder';
import CheckoutOrder from '../../pages/CheckoutOrder';

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
  {
    path: '/payment',
    key: 'payment',
    exact: true,
    component: Payment,
  },
  {
    path: '/order/:id',
    key: 'checkoutOrder',
    exact: true,
    component: CheckoutOrder,
  },
  {
    path: '/order',
    key: 'placeOrder',
    exact: true,
    component: PlaceOrder,
  },
];

export default Routes;
