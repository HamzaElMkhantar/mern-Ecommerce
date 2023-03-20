import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Button, Image, ListGroupItem, FormControl } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsDetails } from '../redux/actions/productsAction';


function ProductScreen({props}) {
    const  {id} = useParams() ;
    

    const [qty , setQty] = useState(1)
    const navigate = useNavigate()
    const addToCartHandller = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {error , loading , product} = productDetails

    console.log(product)
    
    useEffect(() => {
        dispatch(listProductsDetails(id))
    //     const fetchProducts = async () => {
    //         const { data } = await axios.get(`/api/products/${id}`)
    //         setProduct(data)
    //         console.log(data)
    //     }
    //     fetchProducts()
    } , [id , dispatch] )

  return (
    <div>
        <Link style={{textDecoration:'none' , backgroundColor:'#252E3B' , color:'lightgray' , fontSize:'20px' , padding:'5px 10px' , borderRadius:'.3rem' }} to='/'>
            Go Back
        </Link>
        <Row className='mt-4' >
            <Col lg={6} >
                <Image style={{borderRadius:'0rem'}} src={`${product.image}`} fluid />
            </Col>
            <Col lg={6} >

            <ListGroupItem style={{textDecoration:'none'}} >
                <h4 style={{textDecoration:'none' , fontSize:'25px' }} className='mb-2' >{product.name}</h4>
            </ListGroupItem>
            <Row>
                <Col className='pt-3' lg={6} >
                    <ListGroup variant='flush' >
                        <ListGroupItem style={{textDecoration:'none'}} className='pb-5' ><h4>Description : </h4> {product.description}</ListGroupItem>
                        <ListGroupItem className='d-flex' style={{alignItems:'center'}} ><h5>Price : </h5> {product.price} $</ListGroupItem>
                        <ListGroupItem className='' >
                        <Rating value={product.rating}
                            text={`  ${product.numReviews} Reviews`}       />
                        </ListGroupItem>
            
                    </ListGroup>
                </Col>

                <Col lg={6} style={{marginTop:'30px'}} className='' >
                    <Card>
                        <ListGroup variant='flush' >
                            <ListGroupItem>
                                <Row>
                                    <Col>Price : </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status : </Col>
                                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                                </Row>
                            </ListGroupItem>
                            {
                                product.countInStock > 0 &&
                                <ListGroupItem>
                                    <Row style={{display:'flex' , alignItems:'center'}} >
                                        <Col>QTY :</Col>
                                        <Col >
                                            <FormControl
                                                style={{cursor:'pointer'}}
                                                as='select'
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)} >
                                                {
                                                    [...Array(product.countInStock).keys()].map((item) => (
                                                        <option key={item + 1} value={item + 1} >{item + 1}</option>
                                                    ))
                                                }
                                            </FormControl>
                                        </Col>
                                    </Row>
                            </ListGroupItem>
                            }
                            <Button
                                    onClick={addToCartHandller}
                                    className='btn-block' 
                                    type='button'
                                    disabled={product.countInStock === 0}>Add To Cart</Button>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            </Col>

        </Row>
    </div>

  )
}

export default ProductScreen