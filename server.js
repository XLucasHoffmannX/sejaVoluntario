// modules
const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./src/routes');


// instance express
const app = express();

// hbs config
app.set('view engine', 'html')
app.engine('html', require('hbs').__express)
app.set('views', __dirname + '/src/views')


// config statics file
app.use(bodyParser.json())
app.use(express.static('public'))

//config request body
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use(routers);
// host
app.listen(3045, console.log('server in on port 3045'))