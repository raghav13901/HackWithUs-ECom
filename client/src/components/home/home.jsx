import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import './home.css';

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
        <div className="home">
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
                                    <h6 class="card-title">Phone - {item.phNo}</h6>
                                    <h6 class="card-title">Address - {item.address}</h6>
                                    <h6 class="card-title">Description -{item.desc}</h6>
                                </div>
                                <div className="text-center link">
                                    <a className="btn btn-primary" href={`/shop/${item._id}`}>View Items</a>
                                </div>
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