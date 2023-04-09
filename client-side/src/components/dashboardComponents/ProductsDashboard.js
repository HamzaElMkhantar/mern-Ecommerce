import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductUser, getUserProduct, updateProducts } from '../../redux/actions/productsAction'
import { Button, Form } from 'react-bootstrap'
import SideBar from './SideBar'
import Message from '../Message'
import FormContainer from '../FormContainer'
import 'bootstrap/dist/css/bootstrap.min.css';


function ProductsDashboard() {

    const {getUserProducts , deleteProduct , updateproducts} = useSelector(state => state)
    const {loading : getProductLoading , error : getProductError , success : getProductSuccess , userProducts } = getUserProducts

    const {loading : updateproductsLoading , error : updateproductsError , success : updateproductsSuccess , updatedProduct } = updateproducts
    const {loading  , error , success } = deleteProduct

    console.log(updateproductsLoading  , updateproductsSuccess , updateproductsError , updatedProduct )
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

    console.log(userProducts)
    const dispatch = useDispatch()

    useEffect(() => {
        if(userInfo){
            dispatch(getUserProduct(userInfo._id))
        }

    },[dispatch  ,success , loading])


    const HandledeleteProduct = (id) => {
        dispatch(deleteProductUser(id))
    }
    
   const [prodcutId , setProductId] = useState('')
    const handlUpdate = () => {
        setStyle(true)
    }
 

    const [showMessage, setShowMessage] = useState(updateproductsSuccess);
    
    const [productInfo , setProductInfo] = useState({
        name : '',
        image : '',
        brand: '',
        category : '',
        description : '',
        price : '',
        countInStock : ''
    })

    const submitHandller =  (e) => {
        e.preventDefault()
        const formData = new FormData() ;
        formData.append('name', productInfo.name);
        formData.append('image', productInfo.image);
        formData.append('brand', productInfo.brand);
        formData.append('category', productInfo.category);
        formData.append('description', productInfo.description);
        formData.append('price', productInfo.price);
        formData.append('countInStock', productInfo.countInStock);

         dispatch(updateProducts(formData , prodcutId))
  
    }

    if(showMessage){

        setTimeout(() => {
          setShowMessage(false);
        }, 1000)

    }

    const [style , setStyle] = useState(false)
    let blurStyle ;
    let displayStyle ;
    if(!style){
        displayStyle = 'none'
        blurStyle = ''
    }else{
        blurStyle = 'blur(2px)'
        displayStyle = ''
    }

  return (
    <div >
        <div  style={{display:`${displayStyle}` , position:''}} className='formUpdateContainer' >
                <span onClick={() => setStyle(false)} style={{position:'absolute'
                , top:'60px' , right:'300px' , fontSize:'25px' , cursor:'pointer'}}>X</span>
            <div className='formContainer' >
                
                <FormContainer  >
                <h2 style={{textAlign:'center' , marginTop:'10px'}} >UPDATE Product</h2>
                {updateproductsSuccess && <Message variant='success' >product updated successfully</Message>}

                <Form className='updateProductsForm' onSubmit={submitHandller} encType="multipart/form-data" >
                        <div style={{display:'flex' , justifyContent:'space-between' , backgroundClor:'red'}}>
                            <div style={{width:'49%'}}>
                                <Form.Group controlId='email' >
                                    <Form.Label >Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        
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
                                rows="4"
                                type='text'
                                
                                placeholder='Product Description'
                                value={productInfo.description}
                                onChange={(e) => setProductInfo({ ...productInfo , description :e.target.value})}  >
                                
                            </textarea>
                        </Form.Group>

                        <Form.Group style={{display:'flex' , flexDirection:'column' , marginBottom:'10px'}} controlId='productImage' >
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control
                                name="image"
                                
                                type="file"
                                accept="image/png, image/jpeg"
                                placeholder='Product Image'
                                
                                onChange={(e) => setProductInfo({ ...productInfo , image : e.target.files[0]})}  >
                            </Form.Control>
                            
                        </Form.Group>
                        

                        <Button style={{borderRadius:'.3rem' , margin:'auto' , display:'flex' , justifyContent:'center'}} type='submit' variant='primary' >
                            UPDATE
                        </Button>
                </Form>
                </FormContainer>
            </div>
        
        </div>
        <div style={{filter: `${blurStyle}`}} className='productsDashboard'>
            <SideBar />
            <div className='productsDashboard-content'>
                <div>
                    <h2>Products</h2>
                        <table className="table table-bordered table-hover table-striped">
                        <thead className="thead-dark ">
                        <tr style={{textAlign:'center'}}>
                            <th scope="col">#</th>
                            <th scope="col">NAME</th>
                            <th scope="col">BRAND</th>
                            <th scope="col">CATEGORY</th>
                            <th scope="col">COUNT IN STOCK</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">DETAILS</th>
                            <th scope="col">UPDATE</th>
                            <th scope="col">DELETE</th>
                            </tr>
                        </thead>
                        <tbody style={{textAlign:'center'}}>
                        {userProducts && userProducts.map((item , index) => {
            
                        return (<tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.brand} </td>
                            <td>{item.category}</td>
                            <td>{item.countInStock}</td>
                            <td>{item.price}</td>
                                <td> <a href={`/product/${item._id}`}>
                                <Button className='btn-sm' variant='light'>
                                    Details
                                </Button>
                        </a></td>
                        <td><Button onClick={() =>{
                             handlUpdate()
                             setProductId(item._id)}} className='btn-sm' variant='light'>
                            update
                        </Button>
                        </td>
                        <td>
                            <button onClick={() => HandledeleteProduct(item._id)}  style={{ border:'none',padding:"5px 10px", backgroundColor:'#F7DDDC' , borderRadius:'5px'}} >
                                <i style={{color:'danger'}} className="fa-solid fa-trash"></i>
                            </button>
                        </td>
                        </tr>)
                        })}
                        
                        </tbody>
                        </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductsDashboard
