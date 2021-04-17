var express = require('express');
var expressHbs = require('express-handlebars')
var app = express();
app.listen(process.env.PORT || '3001', function () {
    console.log('doanh ')
});
// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://doanh:doanh@doanhcluster.arwi8.mongodb.net/TinderFake?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("vào ")
});

var user= new mongoose.Schema({
    avatar:String,
    email:String,
    pass:String,
    username:String,
})

app.engine('handlebars', expressHbs({
    layoutsDir: __dirname + '/views/layouts',
    // layout cha mặc địnhco
    defaultLayout: 'main'
}));
app.use(express.static('assets'));
app.set('view engine', 'handlebars');

app.get('/', function (request, response) {
    response.render('abc');
})

app.get('/dangki',function (req, res) {
 res.render("dangki",{layout:'main',});

});
app.post('/add',function (req,res){
    var connectUsers = db.model('users', user);
    console.log("vào ghvhvvghh");
    connectUsers({
        avatar:"req.body.avatars",
        email:req.body.emails,
        pass:req.body.passwords,
        username:req.body.usernames,

    }).save(function (error) {
        if (error) {
            res.send('index');
        } else {
            res.send('index');
        }
    })
});

app.get('/login', function (req, res) {
    res.render("login", {layout: 'main',});

});
app.get('/chinh', function (req, res) {
    res.render("chinh", {layout: 'main',});
});