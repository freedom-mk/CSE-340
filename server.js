const express = require('express')
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const pssport = require('pass')

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Acccess-Control-Allow-origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else{
       app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
    }
});

