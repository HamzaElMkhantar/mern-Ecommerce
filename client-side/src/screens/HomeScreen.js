import React, { useEffect, useState } from 'react'
// import products from '../products'
import { Row , Col, Container } from 'react-bootstrap'
import Product from '../components/Product'
// import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../redux/actions/productsAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import 'bootstrap/dist/css/bootstrap.min.css';


function HomeScreen() {

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading , error , products} = productList

  const allProduct = products && products.products
  console.log(allProduct)

  useEffect(() => {
    dispatch(listProducts())
    

  } , [dispatch] )

  return (
    <div className='contner' style={{}}>
        <h1>Latest Products</h1>
 
          
          {loading ? 
            <Loader />
            : error 
            ? <Message variant='danger' children={error} /> 
            : (
              <Row>
              {allProduct && allProduct.map((product,index) => {
                  return(
                      <Col key={index} sm={12} md={6} lg={4} xl={3}>
                       { 
                    
                        <Product product={product} />
                      }
                      </Col>)
                  }) }
            </Row>
            )   }

    </div>
  )
}

export default HomeScreen