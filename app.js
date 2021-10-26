const env = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Point = require("./models/Point");
const app = express();
const bcrypt = require("bcrypt");
const path = require("path");
const cors = require("cors");

mongoose
  .connect(
    `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASSWORD}@cluster0.1oz61.mongodb.net/${process.env.BD_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("conectado");
  })
  .catch((error) => {
    console.log(`Ha ocurrido el siguiente error: ${error}`);
  });
// let db = mongoose.connection;
app.use(express.json()); // para que el back end reciba archivos json
app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));

//crear una ruta para que me puedan hacer peticiones
// app.get("/getUsers", async (req, res) => { //req: lo que llega del cliente res: lo que le envias al cliente
//     let users = await User.find();
//     res.json({usuarios:users});  //{}
// })

//ruta login
app.post("/login", async (req, res) => {
  let nom = req.body.nom;
  let pass = req.body.pass;
  let info_user = await User.find({ username: nom });
  bcrypt.compare(pass, info_user[0].password, (err, result) => {
    if (result == true) {
      res.json({
        auth: true,
        message: "log ok",
        userName: info_user[0].username,
        userID: info_user[0]._id,
      });
      return;
    } else if (result == false) {
      res.json({
        auth: false,
        message: "Usuario o contraseña incorrecto",
        userName: null,
        userID: null,
      });
      return;
    }
  });
});

//ruta puntos
app.post("/pointCounter", async (req, res) => {
  let nom = req.body.nom;
  let point_round = req.body.pointRound;
  let user_id = req.body.userID;
  //consultas base de datos:
  ///Crear nueva puntuacion en la bbdd de points -->
  ////create
  let points = { userpoint: point_round };
  let doc;
  try {
    doc = await Point.create(points);
  } catch (error) {
    return res.status(500).json({
      menssage: "Error del servidor",
    });
  }

  ///guardar en la bbdd de user -->
  ////findByidAndUpdate
  let update_user;
  try {
    update_user = await User.findByIdAndUpdate(
      user_id,
      {
        $push: { points: doc._id },
      },
      { new: true }
    ).populate("points");
  } catch (error) {
    return res.json({
      menssage: "todo mal",
    });
  }

  //Puntuacion mas alta -->
  array_ordenado = update_user.points.sort(function (a, b) {
    return b.userpoint - a.userpoint;
  });

  let hight_point = update_user.points[0].userpoint;
  

  //Respuesta -->

  res.json({
    message: `${nom}, has obtenido ${point_round} puntos`,
    hightPoint: `Tu puntuación más alta es de ${hight_point} puntos`,
    //gestion errores
  });

  return;
});
// montar servidor
app.listen(5000, () => {
  console.log("server listening on port 5000");
});
