const exp=require('express')
const app=exp()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const User=require('./models/userSchema')

app.use(require('./routes/authorization'))

dotenv.config({path:'./config.env'});
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


app.get('/', (req,res)=>
{
   res.send('om namah shivaya')
})

app.listen(3000,()=>{console.log('connected.........')})