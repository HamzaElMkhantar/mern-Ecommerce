import './App.css'
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router  , Route, Routes } from 'react-router-dom'
import Product from './components/Product';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippinScreen from './screens/ShippinScreen';
import PayementScreen from './screens/PayementScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>  
          <Container style={{width:'80%'}}   >
              <Routes>
                <Route index element={<HomeScreen/>} exact />
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/cart/:id?" element={<CartScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen/>} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/shipping" element={<ShippinScreen />} />
                <Route path='/payement' element={<PayementScreen />} />
                <Route path='/place-order' element={<PlaceOrderScreen />} />
              </Routes>
          </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
