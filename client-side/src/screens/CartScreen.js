import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../redux/actions/cartAction'
import 'bootstrap/dist/css/bootstrap.min.css';


const CartScreen = () => {
  const {id} = useParams()
  const productId = id


  const location = useLocation()
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart


  console.log(cartItems)


  useEffect(() => {

    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const navigate = useNavigate()
  const checkoutHandler = async () => {
    if(!userInfo){
      navigate('/login')
    }else{
      navigate('/shipping')
    }
  }

  if(!userInfo){
    navigate('/login')
  }

  return (
    <Row className='contner'>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item, index) => (
              <ListGroupItem style={{backgrondColor:'#E5E5E555' , marginBottom:'10px'}} key={index}>
                <Row style={{display:'flex' , alignItems:'cnter' , textDecoration:'none !important'}} >
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <Link style={{textDecorationLine:'none'}} to={`/product/${item.project}`}>
                    <h5 style={{textDecorationLine:'none'}}>{item.name}</h5> 
                    </Link>
                  </Col>
                  <Col style={{marginTop:'10px'}} md={2}>${item.Price}</Col>
                  <Col style={{marginTop:'10px'}} md={2}>
                    <span style={{display:'flex'}}>
                         QTY :   {item.qty}
                    </span>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.project)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>
                Subtotal ( {cartItems.reduce((acc, item) => acc + item.qty, 0)} )
                items
              </h3>
              $
              {cartItems
                .reduce((acc, item) => {
                  const itemTotal = (item.qty && item.Price) ? (item.qty * item.Price) : 0;
                  return acc + itemTotal;
                }, 0)
                .toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen