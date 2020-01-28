const router = require("express").Router();
const bc = require("bcryptjs");

const Users = require("../users/user-model");

router.post("/register", (req, res) => {
    let user = req.body;
    const hash = bc.hashSync(req.body.password, 8);
    user.password = hash;
    Users.add(user)
    .then(saved => {
        res.status(201).json({ message: "Successfully added user."});
    })
    .catch(error => {
        res.status(500).json({ message: "Error registering new user."})
    })
});

router.post("/login", (req, res) => {
    let { username, password }= req.body;
    Users.findBy({ username })
    .first()
    .then(user => {
        if(user && bc.compareSync(password, user.password)){
            res.status(200).json({ message: `Welcome ${user.username}`})
        } else {
            res.status(401).json({ message: `Invalid credentials`})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "Error logging in."})
    })
});

module.exports = router;