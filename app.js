const exp=require('express')
const app=exp()
const mongoose=require('mongoose')
const User=require('./models/userSchema')
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'});


/*------------To convert json object to understandable form-------------*/
app.use(exp.json())

//-----------Routes--------------
app.use(require('./routes/authorization'))

//----------connecting to database--------
const dburl=process.env.DATABASEURL;
mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Successfully connected to mongo.");
})
.catch((err) => {
    console.log("Error connecting to mongo.", err);
});

//------------Assinging port number---------
app.listen(3000,()=>{console.log('connected.........')})