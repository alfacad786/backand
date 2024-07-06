// userdetail schema====================================

import mongoose from "mongoose";
const { Schema,module } = mongoose;


const ProductSchema =new mongoose.Schema({
 projectName: {
    type: String,
    require: true,
  },
  discription: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },

});


//     ===========================
// mongodb me detabase  me collections create karne ke liya ===========

const product = mongoose.model("Product", ProductSchema);

export default product;
//    ===================================
