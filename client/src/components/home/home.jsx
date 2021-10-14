import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';

function Home(props) {
    const [data,setData] = useState("");
    const getAllItems = async () =>{
        await axios.get(`/home/getAll`)
        .then((data)=>{
            setData(data.data)
        })
        .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        getAllItems();
    },[]);
    return (
        <div>
            <Navbar/>
            <h1>Vendors near by</h1>
            {
                (data != "")
                ?
                <div className="row">
                    {
                        data.map((item)=> {
                            return(
                            <div class="card col-3">
                                <div class="card-body">
                                    <h5 class="card-title">{item.shopName}</h5>
                                    <h6 class="card-title">{item.phNo}</h6>
                                    <h6 class="card-title">{item.address}</h6>
                                    <h6 class="card-title">{item.desc}</h6>
                                </div>
                                <a href={`/shop/${item._id}`}>View Items</a>
                            </div>      
                            )
                        })
                    }
                </div>
                :
                "No Vendors near by"
            }
        </div>
    );
}

export default Home;