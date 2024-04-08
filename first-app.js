console.log("learning node js");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const pug = require("pug");
const multer = require("multer");
const errController = require("./controller/error404");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/user");

const postRoutes = require("./routes/post");
// const Product = require("./models/Product");
const User = require("./models/User");
const mongoConnect = require('./utils/database').mongoConnect;
const mongoose = require('mongoose');

const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);


const store = new MongoDBStore({
    uri: 'mongodb+srv://suryaneelankar:v5KGmKGoP8Wb5rfA@cluster0.25j8xei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    collection: "sessions",

})

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'images/jpeg') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const sequelize = require("./utils/database");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");



// db.execute('SELECT * FROM products').then(result => {console.log(result)}).catch(err => console.log(err));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({storage:fileStorage, fileFilter: fileFilter}).single('image'))
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Acccess-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type','Authorization');
    next();
})

app.use("/admin", adminRoutes.router);

app.use(shopRoutes);

app.use(userRoutes);

app.use(postRoutes)

app.use(errController.errorController);

app.use(session({ secret: "My secret code", resave: false, saveUninitialized: false, store: store }));

app.use((req, res, next) => {
    User.findById('66042f9bed06443887d361f2')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));

})

const server = http.createServer(app);


// mongoConnect(() => 
//   server.listen(3000);
// });


mongoose.connect("mongodb+srv://suryaneelankar:v5KGmKGoP8Wb5rfA@cluster0.25j8xei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(result => {
        console.log('connected through mongoose');

        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'surya',
                    email: 'surya@gmail.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        server.listen(3000);
    })
    .catch(err => console.log(err))
