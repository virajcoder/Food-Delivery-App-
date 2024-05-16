import React, {lazy, Suspense, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Body from './components/Body.js';
import About from './components/About.js';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Contact from './components/Contact.js';
import Error from './components/Error.js';
import RestaurantMenu from './components/RestaurantMenu.js';
import UserContext from './utils/UserContext.js';
import {Provider } from "react-redux"; 
import appStore from './utils/appStore.js';
import Cart from "./components/Cart.js";
import Login from './components/Login.js';
import Signup from './components/Signup.js'
import AddressForm from './components/Address.js'
import { Auth } from './components/Auth.js';
import toast, { Toaster } from 'react-hot-toast';

// import Grocery from './components/Grocery.js';


// chunking+
// code splitting
// Dynamic Bundling
// lazy Loading
// on demanding loading

const Grocery = lazy(() => import("./components/Grocery.js"))

const AppLayout = () => {

const [userName, setUserName] = useState();

//authentication
useEffect(() => {
  // make an API call and send username and password
  const data = {
  name: "Viraj Singh",
  };
  setUserName(data.name);
}, []);

  return (
    <Provider store={appStore}>
    <UserContext.Provider value={{ loggedInuser: userName, setUserName}}>
    <div className="app">
      <Header />
      <Toaster/>
      {/* <Auth> */}
      <Outlet/>
      {/* </Auth> */}
      <Footer />
    </div>
    </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {path: "/",
  element: <AppLayout />,
  children: [
    {
      path: "/",
      element: <Body />
      

    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/contact",
      element: <Contact />
    },
    {
      path: "/grocery",
      element: (<Suspense fallback={<h1>Loading...</h1>}><Grocery /></Suspense>),
    },
    {
      path: "/restaurants/:resId",
      element: <RestaurantMenu />
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/AddressForm",
      element: <AddressForm />,
    },
  ],
  errorElement: <Error />,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}/>);
