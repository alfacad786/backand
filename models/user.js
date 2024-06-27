// userdetail schema====================================

import mongoose from "mongoose";
const { Schema,module } = mongoose;


const userSchema =new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },

});


//     ===========================
// mongodb me detabase  me collections create karne ke liya ===========

const user = mongoose.model("user", userSchema);

export default user;
//    ===================================
