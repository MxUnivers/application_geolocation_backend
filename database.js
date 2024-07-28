

const  mongooseClient   = require("mongoose");
const  dotenv =  require("dotenv");
const Station = require("./models/StationModel");
const User = require("./models/UserModel");
dotenv.config();

//const url = "mongodb://localhost:20127"
const url = process.env.MONGO_URI
mongooseClient.set('strictQuery', false);
const connectDB = async () => {
  await mongooseClient.connect(url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
  ).then(async () => {
    console.log("Connexion à la base de donnée réussi");
    await Station.initializeStations();
    await User.initializeUsers();
  }).catch((error) => {
      console.log("connexion a la base de données réfusés "+error);
    })
}


module.exports =  connectDB;
