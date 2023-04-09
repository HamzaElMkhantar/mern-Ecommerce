import './App.css'
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router  , Route, Routes } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippinScreen from './screens/ShippinScreen';
import PayementScreen from './screens/PayementScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserDashboard from './screens/DashboardScreens/UserDashboard';
import AddProducts from './components/dashboardComponents/AddProducts';
import OrdersDashboard from './components/dashboardComponents/OrderDashboard';
import ProductsDashboard from './components/dashboardComponents/ProductsDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className='app'>
    
          <Router>
          <Header/>
          <main className='py-3'>  
      
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
                    <Route path='/order/:id' element={<OrderScreen />} />
                    <Route path='/sellerdashboard/:id' element={<UserDashboard />} />
                    <Route path='/dashboard/products' element={<AddProducts />} />
                    <Route path='dashboard/orders' element={<OrdersDashboard />} />
                    <Route path='dashboard/addproducts' element={<ProductsDashboard />} />
                </Routes>
              
          </main>
                    <Footer />
              </Router>
      
    </div>

  );
}

export default App;
