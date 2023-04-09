import React, { useEffect } from 'react'
import { Button, Col, Table } from 'react-bootstrap'
import Loader from '../Loader'
import Message from '../Message'
import { deleteOrderProfile, getUserOrder } from '../../redux/actions/orderAction'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from './SideBar'
import 'bootstrap/dist/css/bootstrap.min.css';



const  OrdersDashboard = () => {


    const {userOrder, deleteOrder} = useSelector(state => state) ;
    const {loading : orderLoading , error : orderError , userOrder : ordersList } = userOrder ;
    const userLogin = useSelector((state) => state.userLogin) ;
    const userInfo = userLogin.userInfo || JSON.parse(localStorage.getItem('userInfo')) ;
  
    const dateFormat = (date) => {
        const deliveredDate = new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        return deliveredDate; 
    }
    const dispatch = useDispatch()
    useEffect(() => {
        if(userInfo){
            dispatch(getUserOrder(userInfo._id))
        }
    },[dispatch])

   
       const HandledeleteOrder = (id) => {
         dispatch(deleteOrderProfile(id))
         dispatch(getUserOrder(userInfo._id))
        }
  return (
    <div className='order-dashboard'>
    <SideBar />
    <Col style={{ height:'93vh' , overflowY:'scroll'}} className='order-dashboard-content' >
    <h2 style={{textAlign:'center' , marginTop:'40px' , marginBottom:'40px'}} > Orders </h2>
    {orderLoading ? (
        <Loader/>
    ) : orderError ? (
        <Message variant='danger'>{orderError}</Message>
    ) :

    (
        <div style={{ borderBottom:'.5px solid lightGray'}}>
            
            <Table style={{maxHeight:'50vh' }}  striped bordered hover responsive className='table-sm table-striped'>
            <thead>
                <tr>
                <th>ID</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>order Details</th>
                <th>DELETE</th>
                </tr>
            </thead>

            
            {
                
            <tbody  style={{textAlign:'center'}} >
        
            { ordersList &&
                    ordersList.map((order , index) => (
                    <tr key={order._id}>
                    <td>{index + 1}</td>
                    
                    <td>{order.totalPrice}</td>
                    <td>
                        {order.isPayed ? (
                            dateFormat(order.payedAt)
                        
                        ) : (
                        <p>Not paid</p> 
                        )}
                    </td>
                        <td>
                        {
                    
                        order.isPayed ? (
                            <p> Delivered 
                            </p>
                        
                        ) : (
                        <p>Not Delivered</p> 
                        )
                    }
                        </td>
                                            
                                        
                    <td>
                        <a href={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                            Details
                        </Button>
                        </a>
                    </td>
                    <td>
                    <button onClick={() => HandledeleteOrder()}  style={{padding:"5px 10px" , border:'none', backgroundColor:'#F7DDDC' , borderRadius:'5px'}} >
                        <i style={{color:'danger'}} className="fa-solid fa-trash"></i>
                    </button>
                    </td>
                    </tr>
                ))
            }

            </tbody>
            }

            </Table>
        </div>
    )}
  </Col>
    </div>
  )
}

export default OrdersDashboard
