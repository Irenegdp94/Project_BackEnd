const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Point = require("./models/Point")

const userSchema = new Schema({
    
    username: {type: String, required: true},
    password: {type: String, required: true},
    points: [{type: Schema.Types.ObjectId, ref: "Point"}]
},
{
    timestamps: true,
})

const User = mongoose.model("User", userSchema);
module.exports = User;