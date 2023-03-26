import React, { useState } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import {saveShippinAddress} from '../redux/actions/cartAction'

function ShippinScreen() {

    const {cart} = useSelector(state => state.cart)
    const shippingAddress = JSON.parse(localStorage.getItem('shippinAddress'))

    console.log(shippingAddress)

    const [address , setAddress] = useState(shippingAddress && shippingAddress.address)
    const [Country , setCountry] = useState(shippingAddress && shippingAddress.Country)
    const [postalCode , setPostalCode] = useState(shippingAddress && shippingAddress.postalCode)
    const [city , setCity] = useState(shippingAddress && shippingAddress.city)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippinAddress({address, Country, postalCode, city}))
        navigate('/payement')
    }

  return (
    <Row  >
    <CheckOutSteps step1 step2 />
        <Col md={12}>
    <FormContainer  >
        <h1 style={{marginTop:'30px' , textAlign:'center'}} >Shipping</h1>
        <Form style={{marginTop:'10px'}} onSubmit={submitHandler} >
                <Form.Group controlId='address'>
                    <Form.Label> Address</Form.Label>
                    <Form.Control
                        type='address'
                        placeholder='Enter address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>PostalCode</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter postalCode'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
            </Form.Group>

            <Form.Group style={{marginBottom:'20px'}} controlId='country'>
                <Form.Label>Password Address</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter country'
                    value={Country}
                    onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
            </Form.Group>

            <Button 
                disabled={Country === '' || city === '' || address === '' || postalCode === '' ? true : false}
                style={{borderRadius:'.3rem' , margin:'auto' , display:'flex' , justifyContent:'center'}}  type='submit' variant='primary'>
                    continue
            </Button>
            </Form>
        </FormContainer>
         </Col>
     </Row>

  )
}

export default ShippinScreen