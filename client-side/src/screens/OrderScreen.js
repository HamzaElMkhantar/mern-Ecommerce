import { Button } from 'bootstrap'
import React, { useEffect } from 'react'
import { Row , Col, ListGroupItem, ListGroup , Image} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CheckOutSteps from '../components/CheckOutSteps'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { createdOrder , getOrderDeatails} from '../redux/actions/orderAction'

function OrderScreen() {

    const orderId = useParams().id


    const cart = useSelector( state => state.cart )

    const orderDetails = useSelector(state => state.orderDetails)

    const {loading , order, error} = orderDetails
    console.log(loading, order, error)
    
    const dispatch = useDispatch()
    
    const addDecimals = (num) => {
        return (Math.round(num*100)/100).toFixed(2)
    }

    const itemsPrice = addDecimals(order ? order.orderItem.reduce((acc , item) => acc + item.Price * item.qty , 0) : 0)
    
    useEffect(()=>{
        if(!order || order._id !== orderId){
            dispatch(getOrderDeatails(orderId))
        }
    },[])




  
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
    loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger' >{error}</Message>
    ) :
    <div>
    <h2 style={{textAlign:'center'}} >Oredr : {order  && order._id}</h2>
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
                    {order.isDelivered ?  (
                        <Message variant='success'>Delivered at {order.deliveredAt}</Message>
                    ) : (
                        <Message variant='info'>Products are being shipped</Message>
                    )}
            </ListGroupItem>

            <ListGroupItem>
                <h2>Payement Method</h2>
                <p style={{padding:'0px 25px'}}>
                    <strong style={{fontWeight:'900' , fontSize:'20px'}}>Method : </strong>
                    {order && order.paymentMethod}
                </p>
                {order.isPayed ?  (
                    <Message variant='success'>Delivered at {order.payedAt}</Message>
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

                    

                </ListGroup>
            </Col>
        </Row>
    </div>
  )
}

export default OrderScreen