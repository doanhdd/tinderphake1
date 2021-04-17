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
    email:String,
    pass:String,
    username:String,
    avatar:String
})
var userInsert = db.model('ListUser',user);



app.engine('handlebars', expressHbs({
    layoutsDir: __dirname + '/views/layouts',
    // layout cha mặc địnhco
    defaultLayout: 'main'
}));
app.use(express.static('assets'));
app.set('view engine', 'handlebars');

app.get('/', function (request,
                       response) {
    response.render('abc');
})

app.get('/dangki.handlebars', function (req, res) {

    var action=userInsert({
        email:"String1",
        pass:"Stri1ng",
        username:"Strin1g",
        avatar:"Strin1g"
    }).save(function (error){
        if(error){
            res.render('dangki', { layout: 'main' });
        }else {
            res.render("dangki", {layout: 'main'});
        }
    });
});


app.get('/login.handlebars', function (req, res) {
    res.render("login", {layout: 'main',});

});
app.get('/chinh.handlebars', function (req, res) {
    res.render("chinh", {layout: 'main',});

});