import React from 'react'
import { Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating' 

function Product({product}) {

    const cardStyle = { 
        textDecorationLine:'none'
    }
  return (
        <Link style={cardStyle} to={`/product/${product._id}`} >
          <Card style={{height:'92%'}} className='mb-1 p-3 rounded-4'>
                <Card.Img className='rounded-4' variant="top" src={product.image} />
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