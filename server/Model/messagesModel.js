const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: String,
      required:true
      
    },
  },
  {
    timestamps: true,
  }
);

const message = mongoose.model("Messages", MessageSchema);

module.exports=message