import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import "./dashboard.css";

function Dashboard({ match }) {
  const id = match.params.id;
  const [userData, setData] = useState("");
  console.log(id);
  const getUserData = async () => {
    await axios
      .get(`/dashboard/getUser/${id}`)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="dashboard">
      <Navbar />
      Welcome To Dashboard
      <div>
        {userData == "" ? (
          "No data"
        ) : (
          <div>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-10">{userData.name}</div>
            </div>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-10">{userData.email}</div>
            </div>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-10">{userData.address}</div>
            </div>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-10">{userData.phNo}</div>
            </div>
            {userData.shopName != " " ? (
              <div className="row">
                <div className="col-2"></div>
                <div className="col-10">{userData.shopName}</div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      {userData.type == "Customer"
        ? "Mein Hun ek customer"
        : <a href="/addItem">Add Item</a>
    }
    </div>
  );
}

export default Dashboard;
