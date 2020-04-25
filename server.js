//Require the express module
const express = require('express')
require("dotenv").config();

//Require MongoDB
const mongodb = require('mongodb')

//Create our express server
const app = express()

//Environment variable for mongoDB database password
const mongodbPassword = process.env.MONGOPASSWORD;

//Store Database in a variable
let db

//Make the content in public folder available for the root of server
app.use(express.static('public'))



//Connection string
const connectionString = `mongodb+srv://todoAppUser:${mongodbPassword}@jbcluster-v5kqr.mongodb.net/myTodoApp?retryWrites=true&w=majority`

//Connecting our app to mongoDB Atlas
mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    //Select our MongoDB database
    db = client.db()

    //Once MongoDB establishes a connection, server starts listening on port PORT
    app.listen(PORT, () => console.log("Server listening on PORT", PORT))
})

//Port for the server to listen
const PORT = 3000

//Always add the following boilerplate code to your app for enabling the asyncronous requests to be accessible from the req.body object
app.use(express.json())

//Always add the following boilerplate code to your app for enabling the user request to be accessible from the req.body object
app.use(express.urlencoded({extended: false}))

//Process incoming GET requests
app.get("/", (req, res) => {
    //Talk to the database and read all documents in the collection and convert it into a JS array
    db.collection('items').find().toArray( (err, items) => {
        // console.log(items)
        //Respond to requests
        res.send(`<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simple To-Do App</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        </head>
        <body>
        <div class="container">
            <h1 class="display-4 text-center py-1">To-Do App</h1>
            
            <div class="jumbotron p-3 shadow-sm">
            <form id="create-form" action="/create-item" method="POST">
                <div class="d-flex align-items-center">
                <input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                <button class="btn btn-primary">Add New Item</button>
                </div>
            </form>
            </div>
            
            <ul id="item-list" class="list-group pb-5">
                ${items.map( (item) => {
                    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                                <span class="item-text">${item.text}</span>
                                <div>
                                <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                                <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
                                </div>
                            </li>`
                }).join('')
                    }
            </ul>
            
        </div>
        
        
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

        <script src="/client.js"></script>
        </body>
        </html>`)
    })
})

//Process POST request for creating item
// app.post("/create-item", (req, res) => {
//     //Create a new document in the collection
//     db.collection('items').insertOne({text: req.body.item}, () => {
//         res.redirect("/")
//         // console.log(req.body.item)
//         // res.send("Thanks for submitting the form.")
//     })
    
// })

//Process POST request for creating item asynchronously
app.post("/create-item", (req, res) => {
    //Create a new document in the collection
    db.collection('items').insertOne({text: req.body.text}, (err, info) => {
        //Send back the JS object that represents the new mongodb document we just created
        res.json(info.ops[0])
        // res.send("Success")
        // console.log(req.body.item)
        // res.send("Thanks for submitting the form.")
    })
    
})

//Process POST request for updating item
app.post("/update-item", (req, res) => {
    // console.log(req.body.text)
    // res.send("Success")
    db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)}, {$set: {text: req.body.text}}, () => {
        res.send("Success")
    })
})

//Process POST request for deleting item
app.post("/delete-item", (req, res) => {
    // console.log(req.body.text)
    // res.send("Success")
    db.collection('items').deleteOne({_id: new mongodb.ObjectId(req.body.id)}, () => {
        res.send("Success")
    })
})

