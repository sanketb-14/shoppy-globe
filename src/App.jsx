import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Loader from './components/Loader';

// Lazy load components
const Header = lazy(() => import('./components/Header'));
const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
const NotFound = lazy(() => import('./components/NotFound'));
const OrderConfirmation = lazy(() => import('./components/OrderConfirmation'));

const Layout = () => (
  <div className="min-h-screen bg-base-100 w-full flex flex-col items-center ">
    <Suspense fallback={<Loader />}>
      <Header />
      <main className="container w-full max-w-7xl  mt-4 p-2 sm:p-4">
        <Outlet />
      </main>
    </Suspense>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <ProductList /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'order-confirmation', element: <OrderConfirmation /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;