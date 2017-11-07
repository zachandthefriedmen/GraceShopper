/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main';
export {default as UserHome} from './user-home';
export {Login, Signup} from './auth-form';
export {default as Products} from './Products';
export {default as ProductCell} from './ProductCell';
export {default as SingleProduct} from './SingleProduct';
export {default as Cart} from './Cart';
export {default as LandingPage} from './LandingPage';
export {default as AccountView} from './AccountView';
export {default as AdminPage} from './AdminPage';
export { OrderDetails, Checkout, Confirm } from './Order';
