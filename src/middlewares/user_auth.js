const jwt = require('jsonwebtoken');
module.exports = {
    // To create token
    createToken: (id) => {
        return jwt.sign({
            id
        }, process.env.JWT_SECRET_KEY);
    },
    isLoggedIn: (req, res, next) => {
        const id = req.body.id;
        const token = req.headers.token;
        try {
            var user = token ? jwt.verify(token, process.env.JWT_SECRET_KEY) : false;
        } catch (err) {
            return res.json({ status: false, message: "User is not Authorized" });
        };
        if (user && user.id) {
            id = user.id;
            next();
        } else {
            return res.json({ status: false, message: "User is not Authorized" });

        }
    }
}