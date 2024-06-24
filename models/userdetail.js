// userdetail schema====================================

import mongoose from "mongoose";
const { Schema,module } = mongoose;


const userSchema =new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  passWord: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },

});

// const userSchema = mongoose.Schema({
//   userName: {
//     type: String,
//     require: true,
//   },
//   passWord: {
//     type: String,
//     require: true,
//   },
//   // name: {
//   //   type: String,
//   //   require: true,
//   // },
//   // city: {
//   //   type: String,
//   // },
//   // area: {
//   //   type: String,
//   //   require: true,
//   // },
//   // mobile: {
//   //   type: Number,
//   //   maxlength: 10,
//   //   minlength: 10,
//   //   require: true,
//   // },
//   email: {
//     type: String,
//   },
// });

//     ===========================
// mongodb me detabase  me collections create karne ke liya ===========

const user = mongoose.model("user", userSchema);

module.export = {user}
//    ===================================
