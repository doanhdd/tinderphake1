var express = require('express');
var expressHbs = require('express-handlebars')
var app = express();
const Handlebars = require("handlebars");
var multer = require('multer');
var linkanh = "img/";

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://doanh:doanh@doanhcluster.arwi8.mongodb.net/TinderFake?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.static('assets'));
// app.use(express.static('public/data'));
app.set('view engine', 'handlebars');
app.engine('handlebars', expressHbs({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)

}));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("vào ")
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            //cho phép tải  mỗi  anh png
            cb(null, './assets/img');
        } else {
            cb(new Error('đuôi'), null);
            return
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);

        console.log(file);
    }
})
var upload = multer({
    dest: ('./assets/img')
    , storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024, // gioi han file size <= 1MB
    }
}).single('avatars')
var uploads = multer({
    dest: ('./assets/img')
    , storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024, // gioi han file size <= 1MB
    }
}).single('avatarsa')

var user = new mongoose.Schema({
    avatars: String,
    email: String,
    pass: String,
    username: String,
})

app.get('/', function (request, response) {
    response.render('abc');
})

app.get('/dangki', function (req, res) {
    console.log('day la trang dang ki tai khoan')
    res.render("dangki", {layout: 'main',});

});
app.post("/add", upload, function (req, res) {
    var connectUsers = db.model('listUser1', user);
    connectUsers({
        avatars: req.file.originalname,
        email: req.body.emails,
        pass: req.body.passwords,
        username: req.body.usernames,
    }).save(function (error) {
        if (error) {
            console.log("vào name" + req.body.usernames);
            res.send('error' + error.message);
        } else {
            console.log("vào name" + req.body.usernames);
            connectUsers.find({}, function (error, user) {
                if (error) {
                    res.send('error' + error)
                } else {
                    res.render("login", {layout: 'main', users: user});
                }
            })
        }
    })
});
app.get("/getUser", function (req, res) {
    var connectUsers = db.model('listUser1', user);

    connectUsers.find({}, function (error, user) {
        if (error) {
            res.send('error' + error)
        } else {
            res.render("login", {layout: 'main', users: user});
        }
    })
});
app.get("/delete/:id", function (req, res) {
    var connectUsers = db.model('listUser1', user);
    var id = req.params.id
    connectUsers.findByIdAndRemove(id, function (error, user) {
        if (error) {
            res.send("da co loi xay ra" + error)
        } else {
            res.send("ok")
        }
    })

})


app.post('/update', uploads,function (req, res) {
    var connectUsers = db.model('listUser1', user);
    console.log("da chay vao day uppdate");
    connectUsers.updateOne({_id: req.body.ids}, {
        avatars: req.file.originalname,
        email: req.body.emailsa,
        pass: req.body.passwordsa,
        username: req.body.usernamesa,
    }, function (err, user) {
        if (err) {
            console.log("đã lỗi " + err.message);
        } else {
            res.render('login');
        }
    })

})

app.get('/chinh', function (req, res) {
    res.render("chinh", {layout: 'main',});
});
app.listen(process.env.PORT || '3000', function () {
    console.log('doanh')
});