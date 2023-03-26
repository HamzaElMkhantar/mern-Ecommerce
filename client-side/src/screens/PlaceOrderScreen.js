import { Button } from 'bootstrap'
import React from 'react'
import { Row , Col, ListGroupItem, ListGroup , Image} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import CheckOutSteps from '../components/CheckOutSteps'
import Message from '../components/Message'
import { createdOrder } from '../redux/actions/orderAction'

function PlaceOrderScreen() {

    const {cart} = useSelector(state => state.cart)
   
    const shippinAddress = JSON.parse(localStorage.getItem('shippinAddress'))
                            ? JSON.parse(localStorage.getItem('shippinAddress'))
                            : null
    const payementMethod = JSON.parse(localStorage.getItem('payementMethod'))
                            ? JSON.parse(localStorage.getItem('payementMethod'))
                            : null
    const cartItems = JSON.parse(localStorage.getItem('cartItems'))
                        ? JSON.parse(localStorage.getItem('cartItems'))
                        : null
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
                        ? JSON.parse(localStorage.getItem('userInfo'))
                        : null

                        console.log(cartItems)
    const addDecimals = (num) => {
        return (Math.round(num*100)/100).toFixed(2)
    }

     const itemsPrice = addDecimals(cartItems ? cartItems.reduce((acc , item) => acc + item.Price * item.qty , 0) : 0)
     const shippingPrice = addDecimals( itemsPrice && itemsPrice > 100 ? 0 : 100 )
     const taxPrice = addDecimals(Number((0.09*itemsPrice).toFixed(2)))
     const totalPrice = (
        Number(itemsPrice) + 
        Number(shippingPrice) + 
        Number(taxPrice) 
     ).toFixed(2)

     const dispatch = useDispatch()
    const placeOrderHandler = () => {
        console.log('order')
        dispatch(createdOrder({
            shippingAddress: shippinAddress,
            paymentMethod : payementMethod,
            orderItem: cartItems,
            itemsPrice : itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice:  taxPrice,
            totalPrice: totalPrice
        }))
    }

  return (
    <div>
        <CheckOutSteps step1 step2 step3 step4 />
        <Row style={{marginTop:'50px'}} >
            <Col md={8} >
            <ListGroupItem>
                <h2>Shipping</h2>
                <p style={{padding:'0px 25px'}} >
                    <strong style={{fontWeight:'900' , fontSize:'20px' }}>Address : </strong>
                    {shippinAddress && shippinAddress.address} , {" "}{shippinAddress && shippinAddress.city} , {" "} 
                    {shippinAddress && shippinAddress.postalCode} , {" "}
                    {shippinAddress && shippinAddress.Country} 
                </p>
            </ListGroupItem>

            <ListGroupItem>
                <h2>Payement Method</h2>
                <p style={{padding:'0px 25px'}}>
                    <strong style={{fontWeight:'900' , fontSize:'20px'}}>Method : </strong>
                    {payementMethod && payementMethod}
                </p>
            </ListGroupItem>

            <ListGroupItem>
                <h2>Order Items</h2>
                <p style={{padding:'0px 25px'}} >
                    {cartItems && cartItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                    ): (
                        <ListGroup variant='flush' >
                            {cartItems && cartItems.map((item, index) => (
                                <ListGroupItem key={index} >
                                    <Row>
                                        <Col md={2}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                             />
                                        </Col>
                                        <Col  >
                                            <Link style={{textDecorationLine:'none'}} to={`/product/${item.project}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={4}>
                                        {typeof item.qty === "number" && typeof item.Price === "number" ? (
                                            `${item.qty} x $${item.Price} = $${item.qty * item.Price}`
                                          ) : (
                                            "Invalid quantity or price"
                                          )}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    ) }
                </p>
            </ListGroupItem>

            </Col>
            <Col md={4}  >
                <ListGroup style={{ border:'1px solid lightGray'}} variant='flush' >
                    <ListGroupItem>
                        <h2>Order Summary</h2>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                        <Col>Items</Col>
                        <Col>{itemsPrice}</Col>
                        </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Row>
                        <Col>Shipping</Col>
                        <Col>{shippingPrice}</Col>
                        </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Row>
                        <Col>Tax</Col>
                        <Col>{taxPrice}</Col>
                        </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Row>
                        <Col>Total</Col>
                        <Col>{totalPrice}</Col>
                        </Row>
                    </ListGroupItem>

                    <ListGroupItem style={{display:'flex' , justifyContent:'center' , width:'100%'}} >
                        <button 
                            style={{backgroundColor:'#343a3f' , color:'#DDDDDD' , fontSize:'16px', height:'40px' , width:'100%' , fontWeight:'800' ,padding:'5px 14px' , border:'none' , borderRadius:'5px'}}
                            disabled={cartItems && cartItems.length === 0 ? true : false}
                            onClick={placeOrderHandler}
                        >
                            Place Order
                        </button>
                    </ListGroupItem>

                </ListGroup>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen