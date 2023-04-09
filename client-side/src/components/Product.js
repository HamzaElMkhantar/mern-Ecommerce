import React from 'react'
import { Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating' 
import 'bootstrap/dist/css/bootstrap.min.css';

function Product({product}) {

    console.log(product)
    const cardStyle = { 
        textDecorationLine:'none'
    }
  return (
        <Link style={cardStyle} to={`/product/${product._id}`} >
          <Card style={{height:'92%'}} className='mb-1 p-3 rounded-4'>
                <Card.Img name='image' style={{height:'200px' , objectFit:'contain'}} className='rounded-4' variant="top" src={product.image} />
                <Card.Body>
                    <Card.Title as='div' >{product.name}</Card.Title>
                    <Card.Text as='div' >
                        <Rating value={product.rating}
                            text={product.numReviews}
                               />
                    </Card.Text>
                    <Card.Text as='h3' variant="primary">{product.price} $</Card.Text>
                </Card.Body>
            </Card>
        </Link>
  )
}

export default Product