import React from 'react'
import products from '../products'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Button, Image, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams } from "react-router-dom";


function ProductScreen({props}) {
    const  {id} = useParams() ;
    const product = products.find(p => (p._id === id))

  return (
    <div>
        <Link style={{textDecoration:'none' , backgroundColor:'#252E3B' , color:'lightgray' , fontSize:'20px' , padding:'5px 10px' , borderRadius:'.5rem' }} to='/'>
            Go Back
        </Link>
        <Row className='mt-4' >
            <Col lg={6} >
                <Image style={{borderRadius:'0rem'}} src={`${product.image}`} fluid />
            </Col>
            <Col className='pt-3' lg={3} >
                <ListGroup variant='flush' >
                    <ListGroupItem style={{textDecoration:'none'}} >
                        <h4 style={{textDecoration:'none'}} className='mb-2' >{product.name}</h4>
                    </ListGroupItem>
                    <ListGroupItem style={{textDecoration:'none'}} className='pb-5' ><h4>Description : </h4> {product.description}</ListGroupItem>
                    <ListGroupItem className='d-flex' style={{alignItems:'center'}} ><h5>Price : </h5> {product.price} $</ListGroupItem>
                    <ListGroupItem className='' >
                    <Rating value={product.rating}
                        text={`  ${product.numReviews} Reviews`}       />
                    </ListGroupItem>
        
                    </ListGroup>
            </Col>

            <Col lg={3} className='mt-4' >
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
                        <Button className='btn-block' 
                                type='button'
                                disabled={product.countInStock === 0}>Add To Cart</Button>
                    </ListGroup>
                </Card>
            </Col>

        </Row>
    </div>

  )
}

export default ProductScreen