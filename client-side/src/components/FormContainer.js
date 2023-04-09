import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


function FormContainer({children}) {
  return (
    <Container >
        <Row className='justify-content-md-center' >
            <Col xs={12} md={6}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer