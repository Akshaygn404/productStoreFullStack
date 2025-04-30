import React, { useEffect, useState } from 'react'


export default function HomePage() {

    const [products,setProducts]=useState([]);

    const [formData,setFormData]=useState({
        name:'',
        price:'',
        image:'',
    });
    const [editId,setEditId]=useState(null);

    const handleOnEdit=(p)=>{
        editId=p._id;
    }


    const fetchData=async ()=>{
        try{
        const response=await fetch('http://localhost:5000/products')
        const data =await response.json();
        setProducts(data.message);
        console.log(products);}
        catch(error){
            console.log(error);
        }
    }

    const deleteData=async (id)=>{
        try{
            const response=await fetch(`http://localhost:5000/products/${id}`,{
                method:'DELETE',
            });

            const result=response.json();
            console.log("Result is ",result)
            if(result){
                setProducts((prev)=>prev.filter((p)=>p._id!=id));
            }else{
                alert("Failed to delete the product");
            }
        }
        catch(error){
            console.log("Error :",error.message);
        }
        
    }
    const handleOnUpdate=aync(id)
    

    useEffect(()=>{
        fetchData();
    },[])



  return (
    
    <>

    


    
     <div class="container mt-5">
    <h2 class="text-white mb-4">Products</h2>
    <div class="row g-4">
      
      {products.map((p)=>(
            <div class="col-sm-6 col-md-4 col-lg-3" key={p._id}>
                <div class="card h-100">
                <img src="https://via.placeholder.com/200x150" class="card-img-top" alt="Product Name"/>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">{p.name}</h5>
                    <p class="card-text mb-4">Price: {p.price}</p>
                    <div class="mt-auto d-flex justify-content-between">
                    <button class="btn btn-sm btn-primary"onClick={()=>handleOnEdit(p)} >Update</button>
                    <button class="btn btn-sm btn-danger" onClick={()=>deleteData(p._id)}>Delete</button>
                    </div>
                </div>
                </div>
          </div>)
      )}
      

      
      

      

    </div>
  </div>
  
    
  </>
  )
}
