
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router  , Route, Routes } from 'react-router-dom'
import Product from './components/Product';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3 '>  
          <Container>
          <Routes>
            <Route index element={<HomeScreen/>} exact />
            <Route path="/product/:id" element={<ProductScreen />} />
          </Routes>
          </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
