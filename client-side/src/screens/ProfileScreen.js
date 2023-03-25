// import React, { useEffect, useState } from 'react'
// import { Button, Col, Form, Row } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import FormContainer from '../components/FormContainer'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
// import {  getUserProfile , updateUserProfile } from '../redux/actions/userAction'

// function ProfileScreen() {

//   const [name , setName] = useState('')
//   const [email , setEmail] = useState('')
//   const [password , setPassword] = useState('')
//   const [confirmPassword , setConfirmPassword] = useState('')
//   const [message , setMessage] = useState(null)

//   const disptach = useDispatch()

//   const userDetaills = useSelector(state => state.userDetaills )
//   const { error , loading  } = userDetaills

//   const userLogin = useSelector(state => state.userLogin )
//   const userInfo = userLogin.userInfo || JSON.parse(localStorage.getItem('userInfo'))

//   const userUpdateProfile = useSelector(state => state.userUpdateProfile )
//   const { success } = userUpdateProfile

//   const user =  JSON.parse(localStorage.getItem('userInfo'))



//   const location = useLocation()

// //   const redirect = location.search ? location.search.split('=')[1] : '/' ;

//   const navigate = useNavigate()

//   useEffect( ()=> {
//     if(!userInfo){
//       navigate('/login')
//     }
//     else{

//         if(!userInfo.name){
//             disptach(getUserProfile('profile'))
//         }else{
//             setName(user.name)
//             setEmail(user.email)
//         }
//     }
//   }, [navigate , userInfo , user , disptach])

//   const submitHandller = (e) => {
//     e.preventDefault()
//     if(password === confirmPassword){
    
//         disptach(updateUserProfile( {id:userInfo._id,name,email,password}))
//     }else{
//         setMessage('Password not match')
//     }
//   }

//   return (
//     <Row>
//        <Col md={5}>
       
//        <h2 style={{textAlign:'center' , marginTop:'100px'}} >Update Profile</h2>
//        {message && <Message variant='danger' >{message}</Message>}
//        {success && <Message variant='success' >Profile Updated</Message>}
//        {error && <Message variant='danger'> {error} </Message> }
//        {loading && <Loader />}
//        <Form onSubmit={submitHandller} >
//            <Form.Group controlId='email' >
//              <Form.Label >Full Name</Form.Label>
//              <Form.Control
//                 type='text'
//                 placeholder='Name'
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}  >
//              </Form.Control>
//           </Form.Group>
   
//           <Form.Group controlId='email' >
//              <Form.Label >Email Address</Form.Label>
//              <Form.Control
//                 type='email'
//                 placeholder='Enter Email'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}  >
//              </Form.Control>
//           </Form.Group>
   
//           <Form.Group controlId='password' className='mb-3' >
//              <Form.Label>Password</Form.Label>
//              <Form.Control
//                 type='password'
//                 placeholder='Enter password'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}  >
//              </Form.Control>
//           </Form.Group>
   
//           <Form.Group controlId='confirmPassword' className='mb-3' >
//              <Form.Label>Confirm Password</Form.Label>
//              <Form.Control
//                 type='password'
//                 placeholder='Comfirm password'
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}  >
//              </Form.Control>
//           </Form.Group>
   
//           <Button style={{borderRadius:'.3rem' , margin:'auto' , display:'flex' , justifyContent:'center'}} type='submit' variant='primary' >
//            Update
//           </Button>
//        </Form>
//        </Col>
//        <Col style={{marginTop:'100px'}} md={7} >
//             <h2 style={{textAlign:'center'}} >My Orders</h2>
//        </Col>
//     </Row>


//   )
// }

// export default ProfileScreen

// ----------------------- 

import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {  getUserProfile , updateUserProfile } from '../redux/actions/userAction'
import { useNavigate } from 'react-router-dom'
// import { listOrders } from '../actions/orderActions'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetaills = useSelector((state) => state.userDetaills)
  const {  user } = userDetaills

  const userLogin = useSelector((state) => state.userLogin)
  const userInfo = userLogin.userInfo || JSON.parse(localStorage.getItem('userInfo'))

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success , loading, error } = userUpdateProfile

//   const listMyOrders = useSelector((state) => state.listMyOrders)
//   const { loading: loadingOrders, error: errorOrders, orders } = listMyOrders

const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo) {
        navigate('/login')
    } else {
      if (!userInfo.name) {
        dispatch(getUserProfile('profile'))
        // dispatch(listOrders())
      } else {
        // setName(userInfo.name)
        // setEmail(userInfo.email)
      }
    }
  }, [dispatch, navigate, userInfo, user])

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

  return (
    <Row>
      <Col md={4}>
        <h2 style={{textAlign:'center' , marginTop:'40px'}}  >User Profile</h2>
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
        <h2 style={{textAlign:'center' , marginTop:'40px' , marginBottom:'40px'}} >My Orders</h2>
        {
        //     loadingOrders ? (
        //   <Loader />
        // ) : errorOrders ? (
        //   <Message variant='danger'>{errorOrders}</Message>
        // ) : 
        (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
            //     orders.map((order) => (
            //     <tr key={order._id}>
            //       <td>{order._id}</td>
            //       <td>{order.createdAt.substring(0, 10)}</td>
            //       <td>{order.totalPrice}</td>
            //       <td>
            //         {order.isPaid ? (
            //           order.paidAt.substring(0, 10)
            //         ) : (
            //           <i className='fas fa-times' style={{ color: 'red' }}></i>
            //         )}
            //       </td>
            //       <td>
            //         {order.isDelivered ? (
            //           order.deliveredAt.substring(0, 10)
            //         ) : (
            //           <i className='fas fa-times' style={{ color: 'red' }}></i>
            //         )}
            //       </td>
            //       <td>
            //         <LinkContainer to={`/order/${order._id}`}>
            //           <Button className='btn-sm' variant='light'>
            //             Details
            //           </Button>
            //         </LinkContainer>
            //       </td>
            //     </tr>
            //   ))
            }
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen