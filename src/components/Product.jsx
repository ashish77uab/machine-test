import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct } from '../redux/features/productSlice'
import { toast } from 'react-toastify'

const Product = ({product}) => {
     const {products} = useSelector((state) => state.product)
 const dispatch = useDispatch()
  const [isEdit,setIsEdit]=useState(false)
  const [price,setPrice]=useState(product.price)
  const carts= JSON.parse(localStorage.getItem('carts')||'[]')
  const isAdded= carts.findIndex((item)=>item?.id===product.id)>=0
  const handleMarkAsFavourite=(product)=>{
  localStorage.setItem('carts',JSON.stringify([...carts,product]))

  
   const updatedProducts= products.map((item)=>{
        if(product.id===item?.id){
          return {...item,isAdded:true}
        }
        return item
      })
    dispatch(updateProduct(updatedProducts))

 toast.success('Added to cart Successfully')

  }
  const handleSave=(id)=>{

    const updatedProducts= products.map((item)=>{
        if(id===item?.id){
          return {...item,price:price}
        }
        return item
      })
    dispatch(updateProduct(updatedProducts))
    setIsEdit(false)
    toast.success('updated Successfully')



  }
  return (
     <div key={product.id} className='p-6 text-center rounded-md bg-gray-100 border border-zinc-200'>
        <img className='w-full h-[250px] object-contain' src={product.image} alt={product.title} />
        <div className='py-4'>
            <h6 className='text-sm  '>
            {product?.title}
        </h6>

        <div>
          {isEdit?  <input type='number' onChange={(e)=>setPrice(e.target.value)} value={price} />:<p className='font-semibold'>{product.price}</p>}
        </div>
<div>

        {isEdit ? <button className='px-4 py-2 rounded-md bg-blue-500 text-white'  onClick={()=>handleSave(product.id)}>Save</button> : <button  className='px-4 py-2 rounded-md bg-black text-white' onClick={()=>setIsEdit(prev=>!prev)}>Edit</button>}
        
</div>
        </div>

       { product.isAdded||isAdded ? <div className='text-green-500'>
         Added To Cart
       </div>: <button onClick={()=>handleMarkAsFavourite(product)} >
         Add to cart
        </button>}

    </div>
  )
}

export default Product
