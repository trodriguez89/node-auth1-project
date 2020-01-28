const router = require("express").Router();

const Users = require("./user-model");

router.get("/", (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "Error retrieving users."})
    })
});

module.exports = router;