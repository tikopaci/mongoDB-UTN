const fs = require('fs');
const publicKey = fs.readFileSync("./keys/public.pem");
const jwt = require('jsonwebtoken');
const localStorage = require("local-storage");

const logged = (req, res, next) => {
    try {
        const { auth } = req.headers;
        const response = jwt.verify(auth, publicKey);
        res.status(200).json(response)
    } catch (err) {
        console.error(err);
        res.sendStatus(401);
    }
};

module.exports = logged;