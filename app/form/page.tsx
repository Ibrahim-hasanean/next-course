import { addProductToDatabase } from '@/actions/serverActions';
import AddProductButton from '@/components/AddProductButton';
import { IProducts } from '@/typings';
import { revalidateTag } from 'next/cache';
import React from 'react';


const page = async () => {
    const res = await fetch('https://650ac83edfd73d1fab08e2bb.mockapi.io/products', {
        cache: "no-cache",
        next:{
            tags:["products"]
        }
     });
    const products: IProducts[] = await res.json();    
  
    return (
        <main>
            <h1 className='text-3xl font-bold text-center' >products warehouse </h1>
            <form action={addProductToDatabase}  className='flex flex-col gap-5 max-w-xl mx-auto p-5' >
                <input name="product" type='text' placeholder='product name' className='p-1 border border-gray-300 rounded-md' />
                <input name="price" type='number' placeholder='product price' className='p-1 border border-gray-300 rounded-md' />
                <button className='border bg-blue-500 text-white p-2 rounded-md'>Add product</button>
                <AddProductButton />
            </form>
            <h2 className='font-bold p-5' >list of products</h2>
            <div className='flex flex-wrap gap-5'>
                {
                    products.map(product => <div key={product.id} className='p-5 shadow'>
                        <p>{product.product}</p>
                        <p>${product.price}</p>
                    </div>  )
                }
            </div>
           
    </main>
    )
}

export default page