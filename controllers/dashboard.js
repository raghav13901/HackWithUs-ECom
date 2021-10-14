const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    let data = await User.findById(id);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

exports.addItem = async (req, res, next) => {
  const id = req.params.id;
  const { itemName, itemPrice, itemTotal, itemQuantity, path } = req.body;

  try {
    let data = await User.findById(id);
    let inv = data.inventory;
    inv.push({
      'Name':itemName,
      'Quantity':itemQuantity,
      'Price':itemPrice,
      'Total':itemTotal,
      'Image':path
    })
    console.log(inv);
    data.inventory = inv;
    await User.findByIdAndUpdate(id,data);
    await res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
