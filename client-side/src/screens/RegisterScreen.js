import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {  register } from '../redux/actions/userAction'

function RegisterScreen() {

  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [confirmPassword , setConfirmPassword] = useState('')
  const [message , setMessage] = useState(null)

  const disptach = useDispatch()

  const userRegister = useSelector(state => state.userRegister)

  const { loading , error , userInfo } = userRegister



  const location = useLocation()

  const redirect = location.search ? location.search.split('=')[1] : '/' ;

  const navigate = useNavigate()

  useEffect( ()=> {
    if(userInfo){
      navigate(redirect)
    }
  }, [navigate,userInfo,redirect])

  const submitHandller = (e) => {
    e.preventDefault()
    if(password === confirmPassword){
    
        disptach(register( name,email,password))
    }else{
        setMessage('Password not match')
    }
  }

  return (
    <FormContainer  >
        <h2 style={{textAlign:'center' , marginTop:'100px'}} >Sing Up</h2>
        {message && <Message variant='danger' >{message}</Message>}
        {error && <Message variant='danger'> {error} </Message> }
        {loading && <Loader />}
        <Form onSubmit={submitHandller} >
            <Form.Group controlId='email' >
              <Form.Label >Full Name</Form.Label>
              <Form.Control
                 type='text'
                 placeholder='Name'
                 value={name}
                 onChange={(e) => setName(e.target.value)}  >
              </Form.Control>
           </Form.Group>

           <Form.Group controlId='email' >
              <Form.Label >Email Address</Form.Label>
              <Form.Control
                 type='email'
                 placeholder='Enter Email'
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}  >
              </Form.Control>
           </Form.Group>

           <Form.Group controlId='password' className='mb-3' >
              <Form.Label>Password</Form.Label>
              <Form.Control
                 type='password'
                 placeholder='Enter password'
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}  >
              </Form.Control>
           </Form.Group>

           <Form.Group controlId='confirmPassword' className='mb-3' >
              <Form.Label>Password</Form.Label>
              <Form.Control
                 type='password'
                 placeholder='Comfirm password'
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}  >
              </Form.Control>
           </Form.Group>

           <Button style={{borderRadius:'.3rem' , margin:'auto' , display:'flex' , justifyContent:'center'}} type='submit' variant='primary' >
            Register
           </Button>
        </Form>
        <Row style={{width:'100%' , textAlign:'center'}} className='py-3 mx-auto'>
            <Col className='' >
                Have an account ? <Link 
                                    style={{textDecorationLine:'none' ,
                                            color:'#2F5071' , 
                                            fontWeight:'700'}} 
                                    to={redirect ? `/login?redirect=${redirect}`:'/login' } >Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen