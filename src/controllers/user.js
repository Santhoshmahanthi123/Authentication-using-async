const bcrypt = require('bcrypt');
const User = require('../models/user')
const auth = require('../middlewares/user_auth')
async function user_signup(req, res) {
    console.log("Inside Signup controller");
    const { username, email, password } = req.body;
    try {
        const details = await User.find({ email }, { username })
        if (details.length >= 1) {
            res.status(409).json({ message: "User name or email already exists, please add a different user" });

        } else {
            await bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                else {
                    const user = new User({
                        username: username,
                        email: email,
                        password: hash
                    });
                    user.save();
                    return res.json({ message: "user created", user });
                }

            });

        }

    } catch (err) {
        console.log("error", err)
        return res.json({ message: "Error", err: err });

    }
};
async function user_login(req, res) {
    console.log("Inside login controller");
    const { email, username, password } = req.body;
    try {
        const user = await User.findOne({ $or: [{ email }, { username }] })
        if (user) {
            console.log("User found ", user);
            const isMatch = bcrypt.compareSync(password, user.password);
            if (isMatch) {
                var token = auth.createToken(user._id);
                return res.json({ status: true, message: 'Success', token })
            } else {
                return res.json({ status: false, message: 'Incorrect Password' })


            }
        } else {
            res.json({ status: false, message: 'Incorrect Username or Email' })

        }

    } catch (err) {
        console.log("error", err)
        return res.json({ message: "Error", err: err });

    }
};
async function user_remove(req, res) {
    console.log("Inside user remove controller");
    const { id } = req.params;
    try {
        const user_delete = await User.remove({ _id: id })
        if (!user_delete) {
            res.status(404).json({ message: `User with id ${id} doesn't exists in the database.` });

        } else {

            return res.json({ message: `User ${id} deleted.` });


        }

    } catch (err) {
        console.log("error", err)
        return res.json({ message: "Error", err: err });

    }

};
async function user_find(req, res) {
    console.log("Inside user find controller");
    const _id = req.params.id;
    try {
        const user_find = await User.findOne({ _id });
        if (!user_find) {
            res.status(404).json({ message: `User with _id ${_id} doesn't exists in the database.` });

        } else {

            return res.json({ user_find });


        }

    } catch (err) {
        console.log("error", err)
        return res.json({ message: "Error", err: err });

    }

};
async function user_find_all(req, res) {
    console.log("Inside user find All controller");
    try {
        const users = await User.find()
        if (!user_find) {
            res.status(404).json({ message: "Users doesn't exists in the database" });

        } else {

            return res.json({ users });


        }

    } catch (err) {
        console.log("error", err)
        return res.json({ message: "Error", err: err });

    }

};
module.exports = {
    user_signup,
    user_remove,
    user_find,
    user_find_all,
    user_login
}