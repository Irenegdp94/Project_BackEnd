require('dotenv').config()
const mongoose = require("mongoose")
const User = require("./models/User")
const Point = require("./models/Point")

const bcrypt = require("bcrypt")
const salt = bcrypt.genSaltSync(10)


    mongoose.connect(`mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASSWORD}@cluster0.1oz61.mongodb.net/${process.env.BD_NAME}?retryWrites=true&w=majority`)
        .then(() => {
            console.log("conectado");
        })
        .catch((error) => {
            console.log(`Ha ocurrido el siguiente error: ${error}`);
        });
        
let passwords = ["hola","adios","gato", "cordoba"];
let hashes = passwords.map((password) => bcrypt.hashSync(password,salt));

let points = [
    {   
        _id: "617293951e5fb8248de98c75",
        userpoint: 1
    },
    {
        _id: "617293951e5fb8248de65c76",
        userpoint: 2
    },
    {
        _id: "617453951e5fb8248de65c77",
        userpoint: 3
    },
    {
        _id: "696293951e5fb8248de65c78",
        userpoint: 4
    }
    
]
let users = [
    {
        
        username: "Luis",
        password: hashes[0], //hola
        points: ["617293951e5fb8248de65c76","696293951e5fb8248de65c78"]
        
    },
    {
        username: "Carmen",
        password: hashes[1], //adios
        points: ["617293951e5fb8248de65c76"]
        
    },
    {
        username: "Juan",
        password: hashes[2], //gato
        points: ["617293951e5fb8248de65c76","696293951e5fb8248de65c78"]
        
    },
    {
        username: "Laura",
        password: hashes[3], // cordoba
        points: ["696293951e5fb8248de65c78"]
       
    }
]


// User.deleteMany().then((deletedUsers) => {
//     console.log(deletedUsers)
//     User.create(users).then((createdUsers) => {
//         console.log(createdUsers)
//         mongoose.disconnect()
//         console.log("disconnect")
//     })
// });

// es otra forma de hacer lo de arriba con el .then
const createInfo = async () => {

    let deletedPoints= await Point.deleteMany();
    console.log(deletedPoints) 
    let createdPoints = await Point.create(points);
    console.log(createdPoints) 

    let deletedUsers= await User.deleteMany();
    console.log(deletedUsers)  
    let createdUsers = await User.create(users);
    console.log(createdUsers)

   mongoose.disconnect();
   console.log("disconnect")
}
createInfo();