import React, { useState, useEffect, useCallback } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {  getUserProfile , updateUserProfile } from '../redux/actions/userAction'
import { useNavigate } from 'react-router-dom'
import { userOrderReducer } from '../redux/reducers/orderReducer'
import { getUserOrder, deleteOrderProfile} from '../redux/actions/orderAction'

import dateFormat from 'dateformat';
import { ORDER_PAY_RESET } from '../redux/constants/orderConstants'
import 'bootstrap/dist/css/bootstrap.min.css';


// import { listOrders } from '../actions/orderActions'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const {userOrder, deleteOrder} = useSelector(state => state)
  const {loading : orderLoading , error : orderError , userOrder : ordersList } = userOrder
  console.log(deleteOrder)

  const {loading : deleteOrderLoading , error : deleteOrderError , success : deleteOrderSuccess} = deleteOrder

  console.log(deleteOrderLoading, deleteOrderError, deleteOrderSuccess)


  const userDetaills = useSelector((state) => state.userDetaills)
  const {  user } = userDetaills

  const userLogin = useSelector((state) => state.userLogin)
  const userInfo = userLogin.userInfo || JSON.parse(localStorage.getItem('userInfo'))

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success , loading, error } = userUpdateProfile



const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo) {
        navigate('/login')
    } else {
      if (!userInfo.name) {
        dispatch(getUserProfile('profile'))
    } 
}

}, [dispatch, navigate, userInfo , getUserOrder])

const submitHandler = (e) => {
  e.preventDefault()

      if (password !== confirmPassword) {
        setMessage('Passwords do not match')
      } else {
        dispatch(updateUserProfile({ id: userInfo._id, name, email, password }))
      //   setMessage('Profile updated')
  
      setEmail('')
      setName('')
      setConfirmPassword('')
      setPassword('')
      }

}

useEffect(() => {
    if(userInfo){
        dispatch(getUserOrder(userInfo._id))
    }

},[dispatch])

   const dateFormat = (date) => {
    const deliveredDate = new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      return deliveredDate; 
   }

   const HandledeleteOrder = (id) => {
     dispatch(deleteOrderProfile(id))
     dispatch(getUserOrder(userInfo._id))
    }
   
   
  return (
    <Row className='contner mx-auto'>
      <Col md={4}>
        <h2 style={{textAlign:'center' , marginTop:'40px'}}  >Update Profile</h2>
        {message && <Message variant='success'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password Address</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label >Confirm Password</Form.Label>
            <Form.Control
              style={{marginBottom:'20px'}}
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button style={{borderRadius:'.3rem' , margin:'auto' , display:'flex' , justifyContent:'center'}}  disabled={name || email || (password && confirmPassword) ? false : true} type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      
      <Col md={8}>
        <h2 style={{textAlign:'center' , marginTop:'40px' , marginBottom:'40px'}} >My Orders </h2>
        {
        (
            <div style={{ maxHeight:'540px' , overflowY:'scroll' , borderBottom:'.5px solid lightGray'}}>
                
            <Table style={{maxHeight:'50vh' }}  striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>order Details</th>
                  <th>DELETE</th>
                  </tr>
              </thead>
  
              
              {
                  orderLoading ? (
                      <Loader/>
                  ) : orderError ? (
                      <Message variant='danger'>{orderError}</Message>
                  ) :
              <tbody  style={{textAlign:'center'}} >
         
              { ordersList &&
                    ordersList.map((order , index) => (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPayed ? (
                            dateFormat(order.payedAt)
                          
                        ) : (
                           <p>Not paid</p> 
                        )}
                      </td>
                         <td>
                        {
                      
                        order.isPayed ? (
                            <p> Delivered 
                            </p>
                          
                        ) : (
                           <p>Not Delivered</p> 
                        )
                    }
                        </td>
                                            
                                        
                      <td>
                        <a href={`/order/${order._id}`}>
                          <Button className='btn-sm' variant='light'>
                            Details
                          </Button>
                        </a>
                      </td>
                      <td>
                      <button onClick={() => HandledeleteOrder()}  style={{padding:"5px 10px" , border:'none', backgroundColor:'#F7DDDC' , borderRadius:'5px'}} >
                        <i style={{color:'danger'}} className="fa-solid fa-trash"></i>
                      </button>
                      </td>
                    </tr>
                  ))
            }
  
              </tbody>}
  
            </Table>
            </div>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen