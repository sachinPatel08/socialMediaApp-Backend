const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const db = require('./models/index')
const users = require('./routes/user');
const posts = require('./routes/post');
const comment = require('./routes/coment')
const follow = require('./routes/followers')
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use('/user',users)
app.use('/user',posts)
app.use('/user',follow)
app.use('/user',comment)



db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


app.get("/",(req,res)=>{
    res.send("welcome..")
})


const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server started on the ${port} port.`)
})