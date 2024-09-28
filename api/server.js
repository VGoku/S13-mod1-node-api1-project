// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model")

const server = express();
server.use(express.json())

server.delete("/api/users/:id", async (req, res) => {
const possibleUser = await User.findById(req.params.id);
// console.log("posssible user", possibleUser)
if (!possibleUser) {
    res.status(404).json({
        message: "The user with the specified ID does not exist"
    })
} else {
    const deletedUser = await User.remove(possibleUser.id)
    res.status(200).json(deletedUser)
    // console.log(stuff);
}
})

// Root route
// server.get("/", (req, res) => {
//     res.send("Welcome to the API!"); // You can customize this message
// });

server.post("/api/users", (req, res) => {
    const user = req.body;
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    } else {
        User.insert(user)
        .then(createdUser => {
           
            res.status(201).json(createdUser)
              console.log(createdUser);
        })
        .catch(err => {
            res.status(500).json({
                message: "error creating users",
                err: err.message,
                stack: err.stack,
            })
        })
    }
})

server.get("/api/users", (req, res) => {
    // console.log("getting all users");
     // res.json("users")
    User.find()
   .then(users => {
    // throw new Error("Argh!!!!!!!!!")
    // console.log(users);
    res.json(users)
   })
   .catch(err => {
    res.status(500).json({
        message: "error getting users",
        err: err.message,
        stack: err.stack,
    })
   })
})

server.get("/api/users/:id", (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        // console.log(user)
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"})
        }
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({
            message: "error getting user",
            err: err.message,
            stack: err.stack,
        })
    })
})

server.use("*", (req, res) => {
    res.status(404).json({
        message: "Not Found!!"
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
