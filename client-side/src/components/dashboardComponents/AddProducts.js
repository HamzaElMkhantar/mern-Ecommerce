import React, { useEffect, useState } from 'react'
import SideBar from './SideBar';
import { Button, Col, Form, Row } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer'
import { addProduct } from '../../redux/actions/productsAction';

function AddProducts() {

    const [showMessage, setShowMessage] = useState(false);

 

    const userInfo =  JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

    const {addProducts} = useSelector(state => state)
    const {newProduct , error : newProductError , loading : newProductLoading , success : newProductSuccess} = addProducts
    console.log('newProduct : ' , newProduct )
    console.log('newProductError' , newProductError)
    console.log('newProductLoading' , newProductLoading )
    console.log('newProductSuccess' , newProductSuccess )
    // console.log(newProduct , addProducts)
    const dispatch = useDispatch()


    const [productInfo , setProductInfo] = useState({
        userId: userInfo && userInfo._id,
        name : '',
        image : '',
        brand: '',
        category : '',
        description : '',
        price : '',
        countInStock : ''
    })

    const submitHandller = (e) => {
        e.preventDefault()
        const formData = new FormData() ;
        formData.append('userId', productInfo.userId);
        formData.append('name', productInfo.name);
        formData.append('image', productInfo.image);
        formData.append('brand', productInfo.brand);
        formData.append('category', productInfo.category);
        formData.append('description', productInfo.description);
        formData.append('price', productInfo.price);
        formData.append('countInStock', productInfo.countInStock);

        console.log(productInfo)
        dispatch(addProduct(formData))

        setShowMessage(newProductSuccess)
    }
    if(showMessage){

        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
    }

   
   


  return (
    <div style={{backgroundColor:'#f4f7fa'}} className='addproducts'>
        <SideBar />
        <div className='addproducts-content'>

            <FormContainer  >
                <h2 style={{textAlign:'center' , marginTop:'100px'}} >Add New Product</h2>
                {showMessage && <Message variant='success' >product added successfully</Message>}
                {newProductError && <Message variant='danger'> {newProductError} </Message> }
                {newProductLoading && <Loader />}

                <Form className='addProductsForm' onSubmit={submitHandller} encType="multipart/form-data" >
                        <div style={{display:'flex' , justifyContent:'space-between' , backgroundClor:'red'}}>
                            <div style={{width:'49%'}}>
                                <Form.Group controlId='email' >
                                    <Form.Label >Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        required
                                        placeholder='Name'
                                        value={productInfo.name}
                                        onChange={(e) => setProductInfo({ ...productInfo , name :e.target.value})}  >
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div style={{width:'49%'}}>
                                <Form.Group controlId='category' >
                                    <Form.Label >Category</Form.Label>
                                    <Form.Control
                                        type='text'
                                        required
                                        placeholder='category'
                                        value={productInfo.category}
                                        onChange={(e) => setProductInfo({ ...productInfo , category :e.target.value})}  >
                                    </Form.Control>
                                </Form.Group>
                            </div>

                        </div>

                        <div style={{display:'flex' , justifyContent:'space-between' , backgroundClor:'red'}}>
                            <div style={{width:'49%'}}>
                                <Form.Group controlId='brand' >
                                    <Form.Label >Brand</Form.Label>
                                    <Form.Control
                                        type='text'
                                        required
                                        placeholder='Brand'
                                        value={productInfo.brand}
                                        onChange={(e) => setProductInfo({ ...productInfo , brand : e.target.value})}  >
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div style={{width:'49%'}}>
                                <Form.Group controlId='price' >
                                    <Form.Label >Price</Form.Label>
                                    <Form.Control
                                        type='text'
                                        required
                                        placeholder='Price'
                                        value={productInfo.price}
                                        onChange={(e) => setProductInfo({ ...productInfo , price : e.target.value})}  >
                                    </Form.Control>
                                </Form.Group>
                            </div>

                        </div>

                        <Form.Group controlId='countInStock' >
                            <Form.Label >Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                min='0'
                                required
                                placeholder='Count In Stock'
                                value={productInfo.countInStock}
                                onChange={(e) => setProductInfo({ ...productInfo , countInStock :e.target.value})}  >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group style={{display:'flex' , flexDirection:'column'}} controlId='productDescription' >
                            <Form.Label>Product Description</Form.Label>
                            <textarea
                                style={{backgroundColor:'#f7f7f9' , 
                                        padding:'10px',
                                    border:'none'}}
                                rows="6"
                                type='text'
                                required
                                placeholder='Product Description'
                                value={productInfo.description}
                                onChange={(e) => setProductInfo({ ...productInfo , description :e.target.value})}  >
                                
                            </textarea>
                        </Form.Group>

                        <Form.Group style={{display:'flex' , flexDirection:'column' , marginBottom:'10px'}} controlId='productImage' >
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control
                                name="image"
                                required
                                type="file"
                                accept="image/png, image/jpeg"
                                placeholder='Product Image'
                                
                                onChange={(e) => setProductInfo({ ...productInfo , image : e.target.files[0]})}  >
                            </Form.Control>
                            
                        </Form.Group>
                        

                        <Button style={{borderRadius:'.3rem' , margin:'auto' , display:'flex' , justifyContent:'center'}} type='submit' variant='primary' >
                            ADD
                        </Button>
                </Form>
            </FormContainer>

        </div>
        
    </div>
  )
}

export default AddProducts ;
