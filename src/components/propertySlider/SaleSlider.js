import React, { useEffect, useRef, useState } from 'react'
import {motion} from 'framer-motion';
import axios from 'axios'



const SaleSlider = () => {
    
    const carouselRef = useRef()
    
    const [width,setWidth] = useState(0);
    const [sale,setSale] = useState(null);
    
    
    useEffect(() => {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    },[sale])
    
    useEffect(() => {
      
      const fetchData = async () => {
        try {
          const result = await axios.get('http://localhost:3001/getProduct')
          const buySales = result.data.filter(item => item.name === 'Buy');
          
          setSale(buySales);
  
        } catch (error) {
          console.log(error)
        }
      
      }
      
      fetchData()
      
    }, [])

   
  return (
    <div className="carousel-slider" >
    <motion.div
        className="slider"
        ref={carouselRef}
      >
        <motion.div
       
        drag='x'
        dragConstraints={{right:0, left: -width}}
      
        className='inner-slider'
        >
       {sale ? sale.map((item,index) => (
        
        <motion.div key={index} >
            <div className="for-sale-card">
            <img src={item.image_link} alt="" />
            <h5>{item.title}</h5>
            <p>{item.description}</p><br/>
            <small>{item.address}</small>
            <small>$ {item.price}</small>
            </div>
        </motion.div>
    )):'' 
    }

        
    
     </motion.div>
        
      </motion.div>
  </div>
        
  )
}


export default SaleSlider
