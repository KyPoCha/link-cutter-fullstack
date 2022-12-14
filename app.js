const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const {mongo} = require("mongoose");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/link", require("./routes/link.routes"));

app.use("/t", require("./routes/redirect.routes"));

if(process.env.NODE_ENV === "production"){
    app.use("/",express.static(path.join(__dirname, "client", "build")));

    app.get("*",(req, res)=>{
        const index = path.join(__dirname, 'client' ,'build', 'index.html');
        res.sendFile(index);
    });
}

//const PORT = config.get("port") || 5000;
const PORT = process.env.PORT || 5000;
app.use(cors());
async function start() {
    try {
       await mongoose.connect("mongodb+srv://kyrylo:1234@cluster0.l0tit3q.mongodb.net/?retryWrites=true&w=majority", {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           //useCreateIndex: true,
           }
       );
       app.listen(PORT, ()=>{
           console.log(`App has been started on ${PORT}`);
       });
    }
    catch (e){
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start();