import React, { useState } from 'react'
import {  Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import {savePayementMethod} from '../redux/actions/cartAction'

function PayementScreen() {

    const {cart} = useSelector(state => state.cart)
    const shippingAddress = JSON.parse(localStorage.getItem('shippinAddress'))
    const navigate = useNavigate()
    if(!shippingAddress){
        navigate('/payement')
    }
    const [payementMethod , setPayementMethod] = useState('PayPal')

    const dispatch = useDispatch()
    

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(savePayementMethod(payementMethod))
        navigate('/place-order')
    }

  return (
    <Row  style={{marginTop:'50px' }}  >
    <CheckOutSteps step1 step2 step3 />
        <Col md={12}>
    <FormContainer  >
        <h1 style={{marginTop:'30px', marginBottom:'30px' , textAlign:'center'}} >Payment Method</h1>
        <Form style={{marginTop:'10px'}} onSubmit={submitHandler} >
                <Form.Group >
                    <Form.Label as='legend' >Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label="PayPal or Credit Cart"
                            id='PayPal'
                            name='payementMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPayementMethod(e.target.value)}
                        ></Form.Check>

                        <Form.Check
                            type='radio'
                            label="Stripe"
                            id='Stripe'
                            name='payementMethod'
                            value='Stripe'
                            // checked
                            onChange={(e) => setPayementMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                
            <Button 
                style={{borderRadius:'.3rem' , margin:'auto' , display:'flex' , justifyContent:'center'}}  type='submit' variant='primary'>
                    continue
            </Button>
            </Form>
        </FormContainer>
         </Col>
     </Row>

  )
}

export default PayementScreen