import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GlobalStyle } from './GlobalStyles';
import Navbar from './components/Navbar'
import Modal from './components/account/Modal';
import Footer from './components/Footer'
import HomePage from './pages/home';
import RestaurantsPage from './pages/restaurants';
import RestaurantMenuPage from './pages/restaurantMenu';
import AboutPage from './pages/about';
import ShoppingCart from './pages/cart';
import ManagerPage from './pages/manager';
import EmptyPage from './pages/empty';
import AccountPage from './pages/account';
import { UserContext } from './contexts/UserContext';
import restaurantService from './services/restaurants'
import productService from './services/products'
import orderService from './services/orders'

function App() {
  const [ showModal, setShowModal ] = useState(false)
  const [ restaurants, setRestaurants ] = useState([])
  const [ isConsumer, setIsConsumer ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ cartProducts, setCartProducts ] = useState([]);
  const [ message, setMessage ] = useState(null)
  const [ navLinks, setNavLinks] = useState([
    {
      "path": "/"
    },
    {
      "path": "/restaurants",
      "name": "Restaurants"
    },
    {
      "path": "/about",
      "name": "About Us"
    }
  ])

  useEffect(() => {
    restaurantService
    .getAll()
    .then(initialRestaurants => {
      setRestaurants(initialRestaurants)
    })
    .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      if(user.userType === "consumer") {
        setIsConsumer(true)
    }
      restaurantService.setToken(user.token)
      productService.setToken(user.token)
      orderService.setToken(user.token)

      setNavLinks([
        {
          "path": "/"
        },
        {
          "path": "/restaurants",
          "name": "Restaurants"
        },
        {
          "path": "/about",
          "name": "About Us",
        },
        {
          "path": "/account",
          "name": "Account"
        },
        {
          "path": "/cart",
          "name": "Cart"
        },
        {
          "path": "/manager",
          "name": "Managers"
        }
      ])
    }
  }, [])

  const AddToCart = (product) => {
    if (!user) {
      setMessage("Please log in to add products to cart!")
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      return
    }

    setMessage("Product added to cart!")
    setTimeout(() => {
      setMessage(null)
    }, 3000)
    const exist = cartProducts.find(x => x.product_id === product.product_id);
    if(exist) {
      setCartProducts(cartProducts.map(x => x.product_id === product.product_id ? {...exist, qty: exist.qty+1} : x))  
    } 
    else {
      setCartProducts ([...cartProducts, {...product, qty: 1}])
    }
    };
  
    const RemoveFromCart = (product) => {
      const exist = cartProducts.find((x) => x.product_id === product.product_id);
      if (exist.qty === 1) { 
        setCartProducts(cartProducts.filter((x) => x.product_id !== product.product_id));
      }
      else {
        setCartProducts(
          cartProducts.map((x) => 
          x.product_id === product.product_id ? {...exist, qty: exist.qty - 1 } : x ) )
      }
    }

  return (
    <Router>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <Modal showModal={showModal} setShowModal={setShowModal} setNavLinks={setNavLinks} setIsConsumer={setIsConsumer} />
        <Navbar openModal={() => setShowModal(!showModal)} navLinks={navLinks} setNavLinks={setNavLinks} setIsConsumer={setIsConsumer} setCartProducts={setCartProducts} />
        <Routes>
          <Route path="/" element={<HomePage restaurants={restaurants} />} />
          <Route path="/restaurants" element={<RestaurantsPage restaurants={restaurants} />} />
          <Route path="/restaurants/:restaurantId" element={<RestaurantMenuPage AddToCart={AddToCart} message={message} />} />
          <Route path="/about" element={<AboutPage />} />
          { user && <Route path="/account" element={<AccountPage />} /> }
          { user && <Route path="/cart" element={<ShoppingCart AddToCart={AddToCart} RemoveFromCart={RemoveFromCart} cartProducts={cartProducts} setCartProducts={setCartProducts} isConsumer={isConsumer} />} /> }
          { user && <Route path="/manager" element={<ManagerPage restaurants={restaurants} setRestaurants={setRestaurants} />} /> }
          <Route path="*" element={<EmptyPage /> } />
        </Routes>
      </UserContext.Provider>
      <Footer />
    </Router>
  );
}

export default App;
