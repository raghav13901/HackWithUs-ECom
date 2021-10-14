import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import "./shop.css";
var otpGenerator = require("otp-generator");

function Shop({ match }) {
  const id = match.params.id;
  const [data, setData] = useState("");
  const [pay, setPay] = useState(true);
  const [OTP, setOTP] = useState("");
  const [type, setType] = useState();
  const getDetails = async () => {
    await axios
      .get(`/home/getItems/${localStorage.getItem("id")}`)
      .then((data) => {
        setType(data.data.type);
      })
      .catch((err) => console.log(err));
  };
  const getItems = async () => {
    await axios
      .get(`/home/getItems/${id}`)
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      })
      .catch((err) => console.log(err));
  };
  const checkCount = () => {
    let a = document.querySelectorAll(".inventory span");
    for (let i = 0; i < a.length; i++) {
      if (a[i].innerText >= 1 || a[i].innerText == "1") {
        setPay(false);
        return;
      }
    }
    setPay(true);
  };

  const showTotal = async () => {
    let a = document.querySelectorAll(".inventory span");
    let inv = [];
    let price = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i].innerText >= 1) {
        inv.push({
          item: data.inventory[i].Name,
          quantity: a[i].innerText,
        });
        price += a[i].innerText * data.inventory[i].Price;
      }
    }
    console.log(inv);
    console.log(price);
    await axios
      .post(`/home/pay/${localStorage.getItem("id")}`, {
        inv,
        OTP,
        id,
        price,
      })
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          window.location.href = "/";
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getItems();
    getDetails();
    setOTP(
      otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
        alphabets: false,
        digits: true,
      })
    );
  }, []);
  return (
    <div className="shop">
      <Navbar />
      <h1>{data.shopName}</h1>
      <div className="row">
        <div className="col-6">
          <h4>Phone - {data.phNo}</h4>
        </div>
        <div className="col-6">
          <h4>Address - {data.address}</h4>
        </div>
      </div>
      {data != "" ? (
        <div className="inventory">
          {data.inventory.length > 0 ? (
            <div className="row">
              {data.inventory.map((item, index) => {
                return (
                  <div class="card col-2">
                    <img
                      src={item.Image}
                      class="card-img-top"
                      alt={item.Name}
                    />
                    <div class="card-body">
                      <h6 class="card-title">Item:&nbsp;{item.Name}</h6>
                      <h6 class="card-title">Price: {item.Price}</h6>
                      {type != "Seller" ? (
                        <h6 class="card-title">
                          Quantity:
                          <div className="row align-items-center">
                            <button
                              onClick={() => {
                                if (
                                  parseInt(
                                    document.getElementById(index).innerText
                                  ) < item.Total
                                ) {
                                  document.getElementById(index).innerText =
                                    parseInt(
                                      document.getElementById(index).innerText
                                    ) + 1;
                                }
                                checkCount();
                              }}
                              className="btn btn-primary col-5"
                            >
                              Add
                            </button>
                            <span className="col-2" id={index}>
                              0
                            </span>

                            <button
                              onClick={() => {
                                if (
                                  document.getElementById(index).innerText > 0
                                ) {
                                  document.getElementById(index).innerText -= 1;
                                }
                                checkCount();
                              }}
                              className="btn btn-danger col-5"
                            >
                              Remove
                            </button>
                          </div>
                        </h6>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      {localStorage.getItem("authToken") != undefined ? (
        <div className="text-center">
          <button
            onClick={showTotal}
            className="btn btn-lg btn-success"
            disabled={pay}
          >
            Pay
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Shop;
