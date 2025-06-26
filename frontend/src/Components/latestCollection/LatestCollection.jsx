import React from 'react'
import { ShopContext } from '../../Context/ShopContext';
import Title from '../Title'
import React,{useContext} from 'react';

const latestCollection = () => {

    const {products} = useContext(ShopContext);

    console.log(products);
    
  return (
    <div className='my-10'>
        <div className='py-8 mb-10 text-3xl text-center'> 
         <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
        </div>
    </div>
  )
}

export default latestCollection
