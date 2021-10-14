const User = require("../models/User");

exports.getAll = async (req, res, next) => {
  try {
    let data = await User.find({ type: { $regex: 'Seller'} });
    console.log(data);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

exports.getItems = async (req, res, next) => {
    try {
      let data = await User.findById(req.params.id);
      res.send(data);
    } catch (err) {
      next(err);
    }
  };

  exports.pay = async (req, res, next) => {
    const cid = req.params.id;
    const { inv, id, OTP, price } = req.body;
    try {
        console.log(inv,id,OTP,price);
        const sData = await User.findById(id);
        const cData = await User.findById(cid);
        for(let i = 0;i<inv.length;i++){
          for(let j = 0;j<sData.inventory.length;j++){
            if(sData.inventory[j].Name == inv[i].item){
              sData.inventory[j].Quantity = parseInt(sData.inventory[j].Quantity) - parseInt(inv[i].quantity);
            }
          }
        }
        ordP = sData.orderPlaced;
        ordP.push({
          'items':inv,
          'OTP':OTP,
          'price':price,
          'cid':cid,
          'accept':false
        })
        console.log(sData);
        sData.orderPlaced = ordP;
        await User.findByIdAndUpdate(id,sData);
        prevOrd = cData.prevOrders;
        prevOrd.push({
          'items':inv,
          'OTP':OTP,
          'price':price,
          'sid':cid,
          'accept':false,
          'shop':sData.shopName
        })
        cData.prevOrders = prevOrd;
        await User.findByIdAndUpdate(cid,cData);
        await res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  };