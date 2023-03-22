import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {  login } from '../redux/actions/userAction'

function LoginScreen() {

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const disptach = useDispatch()

  const userLogin = useSelector(state => state.userLogin)

  const { loading , error , userInfo } = userLogin

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

    console.log(email , password)
    disptach(login(password,email))
  }

  return (
    <FormContainer  >
        <h2 style={{textAlign:'center' , marginTop:'100px'}} >Sing In</h2>
        {error && <Message variant='danger'> {error} </Message> }
        {loading && <Loader />}
        <Form onSubmit={submitHandller} >
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
           <Button style={{borderRadius:'.3rem' , margin:'auto' , display:'flex' , justifyContent:'center'}} type='submit' variant='primary' >
            Sing In
           </Button>
        </Form>
        <Row style={{width:'100%' , textAlign:'center'}} className='py-3 mx-auto'>
            <Col className='' >
                New Costumer ? <Link 
                                    style={{textDecorationLine:'none' ,
                                            color:'#2F5071' , 
                                            fontWeight:'700'}} 
                                    to={redirect ? `/register?redirect=${redirect}`:'/register' } >Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen