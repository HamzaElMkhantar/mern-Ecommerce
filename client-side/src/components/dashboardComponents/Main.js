import React, { useEffect, useState } from 'react'
import '../../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrderProfile, getUserOrder } from '../../redux/actions/orderAction'
import { getUserProduct } from '../../redux/actions/productsAction'
import { Button, Col, Row } from 'react-bootstrap'
import Chart from "react-apexcharts";
import 'bootstrap/dist/css/bootstrap.min.css';




function Main() {

  const [charState , setCharState] = useState({

    options: {
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: []
        }
      },
      colors:['#8780D2', '#9C27B0'],
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    },
    series: [
      {
        name: "Last Week",
        data: [30, 40, 45, 50, 49, 60]
      },
      {
        name: "This Week",
        data: [3, 45, 30, 30, 29, 65]
      }
    ]
  })

  const dispatch = useDispatch()

  const {userOrder, deleteOrder, getUserProducts} = useSelector(state => state)
  const {loading : orderLoading , error : orderError , userOrder : ordersList } = userOrder
  const {loading : getProductLoading , error : getProductError , success : getProductSuccess , userProducts } = getUserProducts

  const {loading : deleteOrderLoading , error : deleteOrderError , success : deleteOrderSuccess} = deleteOrder

  console.log(userProducts)

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
                  ? JSON.parse(localStorage.getItem('userInfo'))
                  : null

  
  useEffect(() => {
      if(userInfo){
          dispatch(getUserOrder(userInfo._id))
          dispatch(getUserProduct(userInfo._id))
      }
  
  },[dispatch])
  
     const dateFormat = (date) => {
      const deliveredDate = new Date(date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
        return deliveredDate; 
     }
  
     const HandledeleteOrder = (id) => {
       dispatch(deleteOrderProfile(id))
       dispatch(getUserOrder(userInfo._id))
      }

    const lastOrder = ordersList 
                      ? ( ordersList.length > 5 
                      ? ordersList.slice(ordersList.length - 5,ordersList.length)
                      : ordersList ) 
                      : []
    const lastProducts = userProducts 
                      ? ( userProducts.length > 5 
                      ? userProducts.slice(userProducts.length - 5,userProducts.length)
                      : userProducts ) 
                      : []
console.log(lastOrder)

let delevredNumber = 0 ;
ordersList &&  ordersList.map(item => item.isPayed ? delevredNumber = delevredNumber + 1 : delevredNumber = 0)

  return (
    <div className='dashboardmenu'>

    <Row >
    <Col md={6}>
        <div className='dasboardCard'>
            <div style={{backgroundColor:'#dbf5e0'}} className='card-content'>
            <i className="fa-solid fa-hourglass-start"></i>
                  <p>Products in Stock</p>
                  <h4>{userProducts && userProducts.length}</h4>
              </div>
              <div style={{backgroundColor:'#e3f2fd'}} className='card-content'>
              <i className="fa-regular fa-clipboard"></i>
                  <p>Orders</p>
                  <h4>{ordersList ? ordersList.length : 0}</h4>
              </div>
              <div style={{backgroundColor:'#f9f0d6'}} className='card-content'>
              <i className="fa-solid fa-truck"></i>
              <p>Order delivered</p>
              <h4>{delevredNumber} </h4>
              </div>
              <div style={{backgroundColor:'#e7e8f2'}} className='card-content'>
                  <i className="fa-regular fa-clock"></i>
                  <p>Order not delevered</p>
                  <h4>{ordersList.length - delevredNumber}</h4>
              </div>
        </div>
    </Col>
    <Col className='homeChar' md={6}>
    <h5 >Earnings of the week</h5>
        <Chart
            className='char'
            options={charState.options}
            series={charState.series}
            type="bar"
        />
        
    </Col>
    </Row>



      <div className=" home-tables container table-responsive py-5"> 
        
        <div className="table table-bordered table-hover table-container">
          <h4>Last Orders</h4>
          <table className="table table-bordered table-hover table-striped">
          <thead className="thead-dark ">
          <tr>
              <th scope="col">#</th>
              <th scope="col">TOTAL</th>
              <th scope="col">PAID</th>
              <th scope="col">DELIVEVED</th>
              <th scope="col">ORDER DETAILS</th>
              </tr>
          </thead>
          <tbody>
          {lastOrder && lastOrder.map((item , index) => {

          return (<tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.totalPrice}</td>
              <td>
              {item.isPayed ? (
                dateFormat(item.payedAt)
              
            ) : (
              <p>Not paid</p> 
            )}
              </td>
              <td>
              {
                        
                item.isPayed ? (
                    <p> Delivered 
                    </p>
                  
                ) : (
                  <p>Not Delivered</p> 
                )
            }
              </td>
              <td> <a href={`/order/${item._id}`}>
              <Button className='btn-sm' variant='light'>
                Details
              </Button>
            </a></td>
            </tr>)
          })}
            
          </tbody>
          </table>
        </div>

        <div className="table table-bordered table-hover table-container">
          <h4>LAST PRODUCTS</h4>
          <table className="table table-bordered table table-hover table-striped">
          <thead className="thead-dark">
          <tr>
              <th scope="col">#</th>
              <th scope="col">category</th>
              <th scope="col">BRAND</th>
              <th scope="col">COUNT IN STOCK</th>
              </tr>
          </thead>
          <tbody>
            {lastProducts && lastProducts.map((item , index) => {
              return(
                <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.brand}</td>
              <td>{item.countInStock}</td>
              </tr>
              )
            })}
              
          </tbody>
          </table>
        </div>
    

    </div>
    
    </div>
  )
}

export default Main
