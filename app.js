const env = require("dotenv").config();
const express = require ("express");
const mongoose = require ("mongoose");
const User = require("./models/User");
const Point = require("./models/Point");
const app = express();
const bcrypt = require("bcrypt")


//coger datos del html
//let user_name = document.getElementById("user_name").value
//let user_password = document.getElementById("user_password").value
//hasear contraseña

//let login_user = {user_name, user_password} //pasar al post


mongoose
    .connect(`mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASSWORD}@cluster0.1oz61.mongodb.net/${process.env.BD_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("conectado");
    })
    .catch((error) => {
        console.log(`Ha ocurrido el siguiente error: ${error}`);
    });

app.use(express.json()) // para que el back end reciba archivos json

//crear una ruta para que me puedan hacer peticiones
app.get("/getUsers", async (req, res) => { //req: lo que llega del cliente res: lo que le envias al cliente
    let users = await User.find();
    res.json({usuarios:users});  //{}
})

//ruta login

app.post("/login",async (req,res) => {
    let nom = req.body.nombre
    let pass = req.body.pass
    let info_user = await User.find({username: nom})
    bcrypt.compare(pass, info_user[0].password, (err, result) => {
        
        if (result == true){
            res.json({
                auth: true,
                message: "log ok"
            })
            return
        }else if (result == false){
            res.json({
                auth: false,
                message: "log Nok"
            })
            return
        }
    });

   // res.json({texto: "adios"})

})






















// montar servidor
app.listen(5000, () => {
    console.log("server listening on port 5000")
})

