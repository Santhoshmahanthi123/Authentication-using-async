require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
// parses the req.body 
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./src/routes/user');
const db_url = process.env.DBURL;
console.log(db_url)
app.use(session({ secret: 'Inpixon' }));
const db = mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
if (db) {
    console.log("Connected to database!");
} else {
    console.log("Database connection refused!")
};
// Serves static files
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
// handles UTF-8 encoded requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userRoutes)
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Inpixon!" });
})
app.listen(port, () => {
    console.log(`App started on port: ${port}`);
})