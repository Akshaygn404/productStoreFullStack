import React, { useState } from 'react'

export default function CreatePage() {

    const [product,setProduct]=useState({
        name:'',
        price:'',
        image:''
    });
    

    const updateOnChange=(event)=>{

       const {name,value}= event.target;
       
       setProduct((prevProduct)=>({
        ...prevProduct,
        [name]:value
       }));
       
       
      
    }
    const submitOnClick=async (event)=>{
        event.preventDefault();
        console.log(product);
        try{
            const response= await fetch('http://localhost:5000/products',
                {
                    method:'POST',
                    headers:{
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify(product)
                }

            );
            const data=await response.json();
            console.log('Server response: ',data);
            alert("Successful");
        }
        catch(error){
            console.log("Errorr occured: ",error);
            alert("Error Ocuured");
        }
    }
    

  return (
    <>
        <div class="container mt-5">
        <h2 style={{color:'White'}}>Product Form</h2>
        <form action="/submit">
            <div class="mb-3">
                <label for="name" class="form-label" style={{color:'White'}}>Product Name</label>
                <input type="text" class="form-control" id="name" name="name" value={product.name} onChange={updateOnChange} required/>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label" style={{color:'White'}}>Price</label>
                <input type="number" class="form-control" id="price" name="price" value={product.price} onChange={updateOnChange} required/>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label" style={{color:'White'}}>Image URL</label>
                <input type="url" class="form-control" id="image" name="image" value={product.image} onChange={updateOnChange} required/>
            </div>
            <button  class="btn btn-primary" onClick={submitOnClick} >Submit</button>
        </form>
    </div>

    </>
  )
}
