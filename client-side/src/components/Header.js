import React from 'react'
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../redux/actions/userAction';

function Header() {
  const dispatch = useDispatch()
  // const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const userLogin = useSelector(state => state.userLogin)
  const userInfo = userLogin.userInfo || JSON.parse(localStorage.getItem('userInfo'))
  
  console.log(userInfo)

  const logOutHandler = () => {
    dispatch(logout())
  }
  
  console.log(userLogin)
  return (
    <header className='' style={{position:'fixed' , width:'100%' , zIndex:'999' , top:'0'}}>
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
                { !userInfo ? (<LinkContainer to='/login'>
                    <Nav.Link >
                      <i className="fa-solid fa-user"></i>  Sign In
                    </Nav.Link>
                </LinkContainer>) 
                : (
                  <NavDropdown title={userInfo.name} id='username' >
                      <LinkContainer to='/profile' >
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={`/sellerdashboard/${userInfo._id}`} >
                          <NavDropdown.Item>Seller Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={() => logOutHandler()} >LogOut</NavDropdown.Item>
                  </NavDropdown>
                )
              }
            </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header