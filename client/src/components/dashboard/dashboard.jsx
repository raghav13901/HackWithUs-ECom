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
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="dashboard">
      <Navbar />
      <div>
        <h2>Dashboard</h2>
        {userData == "" ? (
          "No data"
        ) : (
          <div>
            <div>
              <div className="row">
                <div className="col-2">Name</div>
                <div className="col-10">{userData.name}</div>
              </div>
              <div className="row">
                <div className="col-2">Email</div>
                <div className="col-10">{userData.email}</div>
              </div>
              <div className="row">
                <div className="col-2">Address</div>
                <div className="col-10">{userData.address}</div>
              </div>
              <div className="row">
                <div className="col-2">Phone</div>
                <div className="col-10">{userData.phNo}</div>
              </div>
              {userData.shopName != " " ? (
                <div className="row">
                  <div className="col-2">Shop name</div>
                  <div className="col-10">{userData.shopName}</div>
                </div>
              ) : (
                ""
              )}
              {userData.desc != " " ? (
                <div className="row">
                  <div className="col-2">Description</div>
                  <div className="col-10">{userData.desc}</div>
                </div>
              ) : (
                ""
              )}
            </div>
            {userData.type == "Customer" ? (
              <div className="row customer">
                <h2>Your Orders</h2>
                {userData.prevOrders.length > 0
                  ? userData.prevOrders.map((order) => {
                      return (
                        <div class="card col-3">
                          <div class="card-body">
                            <h6>Items -</h6>
                            <h6 class="card-title">
                              <ul>
                                {order.items.map((item) => {
                                  return (
                                    <li>
                                      {item.item} - {item.quantity}
                                    </li>
                                  );
                                })}
                              </ul>
                            </h6>
                            <h6 class="card-title">Price - {order.price}</h6>
                            <h6 class="card-title">Shop - {order.shop}</h6>
                            <h6 class="card-title">OTP - {order.OTP}</h6>
                          </div>
                        </div>
                      );
                    })
                  : "No Previous Orders"}
              </div>
            ) : (
              <div className="row seller">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h2>Your Items</h2>
                  </div>
                  <div className="col-4">
                    <a className="btn btn-primary" href="/addItem">Add Item</a>
                  </div>
                </div>
                {userData.inventory.length != 0
                  ? userData.inventory.map((item) => {
                      return (
                        <div class="card col-2">
                          <img
                            src={item.Image}
                            class="card-img-top"
                            alt={item.Name}
                          />
                          <div class="card-body">
                            <h6 class="card-title">Name - {item.Name}</h6>
                            <h6 class="card-title">Price - {item.Price}</h6>
                            <h6 class="card-title">
                              Quantity - {item.Quantity}
                            </h6>
                            <h6 class="card-title">Total - {item.Total}</h6>
                          </div>
                        </div>
                      );
                    })
                  : "No Items"}
                <h2>Your previous orders</h2>
                <div className="row">
                  {userData.orderPlaced.length > 0
                    ? userData.orderPlaced.map((order) => {
                        return (
                          <div class="card col-3">
                            <div class="card-body">
                              <h6>Items -</h6>
                              <h6 class="card-title">
                                <ul>
                                  {order.items.map((item) => {
                                    return (
                                      <li>
                                        {item.item} - {item.quantity}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </h6>
                              <h6 class="card-title">Price - {order.price}</h6>
                              <h6 class="card-title">OTP - {order.OTP}</h6>
                            </div>
                          </div>
                        );
                      })
                    : "No Previous Orders"}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
