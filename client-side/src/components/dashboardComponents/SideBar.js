import React, { useState } from 'react'
import '../../App.css'
// import { SidearData } from '../../../public/SidearData'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function SideBar() {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

    const  SidearData = [
        {
            title : "Home",
            icone :  <i className="fa-solid fa-house"></i>,
            link : `/sellerdashboard/${userInfo._id}`
        },
        {
            title : "Add Products",
            icone : <i className="fa-solid fa-plus"></i>,
            link : "/dashboard/products"
        },
        {
            title : "Products",
            icone : <i className="fa-brands fa-product-hunt"></i>,
            link : "/dashboard/addproducts"
        },
        {
            title : "Orders",
            icone : <i className="fa-brands fa-first-order-alt"></i>,
            link : "/dashboard/orders"
        }
    ]
    
    const [sideMenu , setSideMenu] = useState(false)
    const [styleBar , setstyleBar] = useState({})

    
    const handleSideBard = () => {
        setSideMenu(!sideMenu)
        if(!sideMenu){

             setstyleBar({marginLeft:'-170px'})
        }else{
            setstyleBar({})
        }
    }

   
  return (
    <div style={styleBar} className='sidebar'>

    <div onClick={handleSideBard} className='menuIcon' >
        <i className="fa-solid fa-bars"></i>
    </div>
    {
        !sideMenu &&
        <div>
            
        {
            !sideMenu && 
            <div className='dashboardName'>
                <h4>Seller Dashboard</h4>
            </div>
        }
        {
            !sideMenu && 
            <div className='userinfo'>
                <h4>{userInfo && userInfo.name}</h4>
                <p>{userInfo && userInfo.email}</p>
            </div>
        }
            <ul className='sidebarList'>
                {SidearData.map((item, index) => 
                (
                    <Link to={item.link}
                        className='row' 
                        id={window.location.pathname === item.link ? "activ" : ''}
                        style={{color:'#F0F0F1' , 
                                textDecoration:'none'}} 
                        key={index} >
                        <span>{item.icone}</span>
                        {
                            !sideMenu && 
                            <span>{item.title}</span>
                        }
                        
                    </Link>
                )
                )}
            </ul>
        </div>
    }
{
    sideMenu &&
    <ul className='secondList'>
        {SidearData.map((item , index) => (

            <li key={index} > {item.icone}</li>)
        )
        
        }
    </ul>
}

        

    </div>
  )
}

export default SideBar
