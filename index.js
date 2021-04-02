var express = require('express');
var expressHbs = require('express-handlebars')
var app = express();
app.listen(process.env.PORT || '3001');
app.engine('handlebars', expressHbs({
    layoutsDir: __dirname + '/views/layouts',
    // layout cha mặc định
    defaultLayout: 'main'
}));
app.use(express.static('assets'));
app.set('view engine', 'handlebars');

app.get('/', function (request,
                       response) {
    response.render('abc');
})

app.get('/dangki.handlebars', function (req, res) {
    res.render("dangki", {layout: 'main'});
});

app.get('/login.handlebars', function (req, res) {
    res.render("login", {layout: 'main',});

});
app.get('/chinh.handlebars', function (req, res) {
    res.render("chinh", {layout: 'main',});

});