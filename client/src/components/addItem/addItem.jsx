import axios from "axios";
import React, { useState } from "react";
import firebase, { storage } from "../../config/fire";
import Navbar from "../navbar/navbar";
import "./add.css";

function AddItem(props) {
  const [itemName, setItemN] = useState("");
  const [itemQuantity, setItemQ] = useState("");
  const [itemTotal, setItemT] = useState("");
  const [itemPrice, setItemP] = useState("");
  const [imageState, setImageState] = useState("");
  const [path, updatePath] = useState("");
  const addItem = async () => {
    await axios
      .post(`/dashboard/addItem/${localStorage.getItem("id")}`, {
        itemName,
        itemQuantity,
        itemTotal,
        itemPrice,
        path,
      })
      .then((data) => {
        if (data.status == 200)
          window.location.href = `/dashboard/${localStorage.getItem("id")}`;
      })
      .catch((err) => console.log(err));
  };
  const imageHandler = (e) => {
    imageSaveHandler(e.target.files[0]);
  };

  const imageSaveHandler = (image) => {
    // e.preventDefault();
    if (image.name != undefined) {
      const uploadTask = storage.child(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              setImageState("running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          setImageState("completed");
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            updatePath(downloadURL);
            console.log(path);
          });
        }
      );
      console.log(path);
    }
  };
  return (
    <div className="form">
      <Navbar/>
      <form>
        <h3>Add items</h3>
        <div className="inputField row">
          <div className="col-3">Item Image</div>
          <div className="col-9">
            <input
              type="file"
              accept=".jpeg,.jpg,.png"
              multiple={false}
              name="image"
              onChange={imageHandler}
              required
            />
          </div>
        </div>
        <div className="inputField row">
          <div className="col-3">Item Name</div>
          <div className="col-9">
            <input type="text" onChange={(e) => setItemN(e.target.value)} />
          </div>
        </div>
        <div className="inputField row">
          <div className="col-3">Item Quantity</div>
          <div className="col-9">
            <input type="number" onChange={(e) => setItemQ(e.target.value)} />
          </div>
        </div>
        <div className="inputField row">
          <div className="col-3">Item Total</div>
          <div className="col-9">
            <input type="number" onChange={(e) => setItemT(e.target.value)} />
          </div>
        </div>
        <div className="inputField row">
          <div className="col-3">Item Price</div>
          <div className="col-9">
            <input type="number" onChange={(e) => setItemP(e.target.value)} />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={addItem}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddItem;
