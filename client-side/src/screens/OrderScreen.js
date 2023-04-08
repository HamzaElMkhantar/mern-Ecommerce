import React, { useEffect, useState } from 'react'
import { Row , Col, ListGroupItem, ListGroup , Image} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CheckOutSteps from '../components/CheckOutSteps'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { createdOrder , getOrderDeatails , payOrder} from '../redux/actions/orderAction'
import  { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../redux/constantsProduct./orderConstants'
import axios from 'axios'

function OrderScreen() {

    const orderId = useParams().id

    const dateFormat = (date) => {
        const deliveredDate = new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });
          return deliveredDate; 
       }
    
    
    const [sdkReady , setSdkReady] = useState(false)
    
    const orderDetails = useSelector(state => state.orderDetails)
    const {loading , order, error } = orderDetails
    
    const orderPay = useSelector(state => state.orderPay)
    
    const {succes : succesPay , loading : loadingPay} = orderPay
    
    console.log(orderId)
    console.log(order)
    
    const dispatch = useDispatch()
    
    const addDecimals = (num) => {
        return (Math.round(num*100)/100).toFixed(2)
    }

    // const itemsPrice = addDecimals(order ? order.orderItem.reduce((acc , item) => acc + item.Price * item.qty , 0) : 0)
    
    const navigate = useNavigate()
    useEffect(()=>{

        const addPaypalScript = async () => {
            const {data : clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.onload = () => {
                setSdkReady(true)
            }
            
        }

        if(!order || succesPay){
            dispatch(getOrderDeatails(orderId))
            dispatch({type : ORDER_PAY_RESET})
        }else if(!order.isPayed){
            if(!window.paypal){
                // running the sdk javascript
                addPaypalScript()
            }else{
                
                setSdkReady(true)
            }
        }
        
    },[dispatch , order , succesPay , orderId])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }
    

  
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
                        ? JSON.parse(localStorage.getItem('userInfo'))
                        : null

    const shippinAddress = JSON.parse(localStorage.getItem('shippinAddress'))
                        ? JSON.parse(localStorage.getItem('shippinAddress'))
                        : null

    const payementMethod = JSON.parse(localStorage.getItem('payementMethod'))
                        ? JSON.parse(localStorage.getItem('payementMethod'))
                        : null

    const cartItems = JSON.parse(localStorage.getItem('cartItems'))
                        ? JSON.parse(localStorage.getItem('cartItems'))
                        : null

  return (
   <div className='contner'>
    {

        loading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger' >{error}</Message>
        ) :
        <div >
        <h2 style={{textAlign:'center'}} >Order : {order  && order._id}</h2>
            <Row style={{marginTop:'50px'}} >
                <Col md={8} >
                <ListGroupItem>
                    <h2>Shipping</h2>
                    <p style={{padding:'0px 25px'}} >
                        <strong style={{fontWeight:'900' , fontSize:'20px' }}>Name : </strong>
                        {userInfo && userInfo.name}
                    </p>
                    <p style={{padding:'0px 25px'}} >
                        <strong style={{fontWeight:'900' , fontSize:'20px' }}>Email : </strong>
                        {userInfo && userInfo.email}
                    </p>
                    <p style={{padding:'0px 25px'}} >
                        <strong style={{fontWeight:'900' , fontSize:'20px' }}>Address : </strong>
                        {order && order.shippingAddress.address} , {" "}{order && order.shippingAddress.city} , {" "} 
                        {order && order.shippingAddress.postalCode} , {" "}
                        {order && order.shippingAddress.Country} 
                    </p>
                        { order && order.isPayed  ?  order.isDelivered ?  (
                            <Message variant='success'>Delivered at {order.deliveredAt}</Message>
                        ) : (
                            <Message variant='info'>Products are being shipped </Message>
                        ) : ''}
                </ListGroupItem>
    
                <ListGroupItem>
                    <h2>Payement Method</h2>
                    <p style={{padding:'0px 25px'}}>
                        <strong style={{fontWeight:'900' , fontSize:'20px'}}>Method : </strong>
                        {order && order.paymentMethod}
                    </p>
                    {order && order.isPayed ?  (
                        <Message variant='success'>Paid at : {dateFormat(order.payedAt)}</Message>
                    ) : (
                        <Message variant='danger'>Not Payed</Message>
                    )}
                </ListGroupItem>
    
                <ListGroupItem>
                    <h2>Order Items</h2>
                    <p style={{padding:'0px 25px'}} >
                        {order && order.orderItem.length === 0 ? (
                            <Message>Your cart is empty</Message>
                        ): (
                            <ListGroup variant='flush' >
                                {order  && order.orderItem.map((item, index) => (
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
                            <Col>{order && order.itemsPrice}</Col>
                            </Row>
                        </ListGroupItem>
    
                        <ListGroupItem>
                            <Row>
                            <Col>Shipping</Col>
                            <Col>{order && order.shippingPrice}</Col>
                            </Row>
                        </ListGroupItem>
    
                        <ListGroupItem>
                            <Row>
                            <Col>Tax</Col>
                            <Col>{order && order.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>
    
                        <ListGroupItem>
                            <Row>
                            <Col>Total</Col>
                            <Col>{order && order.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>
    
                        {/*loadingPay*/}
    
                        {order && !order.isPayed && (
                                <ListGroupItem>
                                    {loadingPay && <Loader/>}
                                    {sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                        amount={order.totalPrice} 
                                        onSuccess={successPaymentHandler}   />
                                    )}
                                </ListGroupItem>
                            )}
                        
    
                    </ListGroup>
                </Col>
            </Row>
        </div>
    }

   </div>
  )
}

export default OrderScreen