const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointSchema = new Schema({
    userpoint: {type: Number}
},
{
    timestamps: true,
})

const Point = mongoose.model("Point", pointSchema);
module.exports = Point;