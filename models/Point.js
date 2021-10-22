const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointSchema = new Schema({
    userpoint: {type: Array}
},
{
    timestamps: true,
})

const Point = mongoose.model("Point", pointSchema);
module.exports = Point;