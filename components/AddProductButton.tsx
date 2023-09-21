'use client'
import { addProductToDatabase } from '@/actions/serverActions';
import React, { useTransition } from 'react'

const AddProductButton = () => {
    const [isPending, startTransition] = useTransition();
    const formData = new FormData();
    formData.append("product", "macbook laptop");
    formData.append("price", "1600");
  return (
      <button className='fixed w-48 bottom-10 right-10 border bg-green-500 text-white p-2 rounded-md' disabled={isPending} onClick={() => startTransition(() => addProductToDatabase(formData))} >
         {isPending?"adding...": "add macbook"}
      </button>
  )
}

export default AddProductButton