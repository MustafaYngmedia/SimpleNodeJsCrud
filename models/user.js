const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    first_name: {
      type: String,
      default:""
    },
    last_name: {
      type: String,
      default:""
    },
    email:{
      type: String,
      default:""
    },
    phoneNumber:{
      type: String,
      default:""
    },
    hash:{
      type: String,
      required: [true, "Password is required."],
    },
    status:{
      type:Number,
      default:1, 
      // 1 => Active
      // 2 => Blocked
    }
  },
  { timestamps: true },
  { minimize: false }
);



module.exports = mongoose.model("User", userSchema);
