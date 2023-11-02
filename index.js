// initialize express app object
let express = require('express');
let app = express();

//DB 1 connect to mongoDB
const { Database } = require("quickmongo");
const db = new Database(process.env.MONGODB-URL);
db.on("ready", () => {
    console.log("Connected to the database");
})

db.connect();

app.use(express.json());

let inputTracker =[];

// 2. add a route 
app.post('/noResponse', (req, res) => {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        response: req.body
    }
    
    //DB 2 add values to the DB
    db.push("inputTrackerData", obj);


    // console.log(inputTracker);
    res.json({task:"success"});
})


app.use('/', express.static('public'));

app.listen(3000, ()=>{
    console.log('listening at localhost:3000')
})


//add route to get all word inputs
app.get('/getResponse', (req, res)=>{
    //DB 3 fetch from the DB
    db.get("inputTrackerData").then(inputData => {
        let obj = {data: inputData};
        res.json(obj);
    }) 
});