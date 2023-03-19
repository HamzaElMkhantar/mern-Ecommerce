import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'


function Header() {
  return (
    <header>
      <Navbar style={{height:'60px'}} bg="dark" variant="dark">
        <Container style={{justifyContent:'space-between !important' , width:'80%'}} className='d-flex'>
            <LinkContainer to='/'>
                <Navbar.Brand>Our Shop</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-ato">
                <LinkContainer to='/cart'>
                    <Nav.Link >
                      <i className="fa-solid fa-cart-shopping"></i> Cart
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to='singin'>
                    <Nav.Link >
                      <i className="fa-solid fa-user"></i>  Sign In
                    </Nav.Link>
                </LinkContainer>
            </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header