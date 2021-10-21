require('dotenv').config()
const mongoose = require("mongoose")
        mongoose.connect(`mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASSWORD}@cluster0.1oz61.mongodb.net/${process.env.BD_NAME}?retryWrites=true&w=majority`)
        .then(() => {
            console.log("conectado");
        })
        .catch((error) => {
            console.log(`Ha ocurrido el siguiente error: ${error}`);
        });

mongoose.disconnect() //para desconectar la bbdd