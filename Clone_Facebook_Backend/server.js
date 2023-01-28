const express = require('express');
const mongoose = require('mongoose');
const cors  = require('cors');
// const userRout = require('./routes/user');
const {readdirSync} = require('fs');
const dotenv = require('dotenv');

dotenv.config();

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 
//    }
//    app.use(cors(corsOptions));

const app = express();
app.use(cors());
app.use(express.json())



// app.get('/', function(req, res){
//     res.send("Home");
// })
// app.get('/api', userRout)


//ROUTES
readdirSync("./routes").map((r)=> app.use('/', require('./routes/'+r)));


//DATABASE
mongoose.set('strictQuery', true);
mongoose.connect( process.env.DATABASE_URL ).then(()=>{
    console.log("Databse connected");
}).catch((err)=>{console.log(err)});


const port = process.env.PORT || 8000;
app.listen( port , function(){
    console.log("server running at PORT " + port + "..."  );
})