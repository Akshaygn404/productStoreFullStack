import React, { useState } from 'react'

export default function CreatePage() {

    const [product,Setproduct]=useState({
        name:'',
        price:'',
        image:''
    })


  return (
    <>
        <div class="container mt-5">
        <h2 style={{color:'White'}}>Product Form</h2>
        <form action="/submit" method="POST">
            <div class="mb-3">
                <label for="name" class="form-label" style={{color:'White'}}>Product Name</label>
                <input type="text" class="form-control" id="name" name="name" required/>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label" style={{color:'White'}}>Price</label>
                <input type="number" class="form-control" id="price" name="price" required/>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label" style={{color:'White'}}>Image URL</label>
                <input type="url" class="form-control" id="image" name="image" required/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>

    </>
  )
}
