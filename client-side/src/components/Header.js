import React from 'react'
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../redux/actions/userAction';
import 'bootstrap/dist/css/bootstrap.min.css';


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
    <header className='header' style={{position:'fixed' , width:'100%' , zIndex:'999' , top:'0'}}>
      <Navbar style={{height:'60px'}} bg="dark" variant="dark">
        <Container style={{justifyContent:'space-between !important' , width:'80%'}} className='d-flex'>
            <LinkContainer to='/'>
                <Navbar.Brand className='whiteColor' >Our Shop</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-ato">
                <LinkContainer to='/cart'>
                    <Nav.Link className='whiteColor' >
                      <i className="fa-solid fa-cart-shopping whiteColor"></i> Cart
                    </Nav.Link>
                </LinkContainer>
                { !userInfo ? (<LinkContainer to='/login'>
                    <Nav.Link className='whiteColor' >
                      <i className="fa-solid fa-user whiteColor"></i>  Sign In
                    </Nav.Link>
                </LinkContainer>) 
                : (
                  <NavDropdown className='whiteColor'  title={userInfo.name} id='username' >
                      <LinkContainer to='/profile' >
                          <NavDropdown.Item >Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={`/sellerdashboard/${userInfo._id}`} >
                          <NavDropdown.Item >Seller Dashboard</NavDropdown.Item>
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