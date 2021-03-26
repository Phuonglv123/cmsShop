const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/config');


app.use(express.static(path.join(__dirname, 'client/build')))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
require('./config/passport')(passport);

mongoose.connect(config.mongodbURI, {useNewUrlParser: true})
    .then(() => console.log(" ----- MongoDB starting..."))
    .catch(err => console.log(err));

app.use('/auth', require('./routes/users'));
app.use('/', require('./routes/index'));

const port = 5000;
app.listen(port, () => {
    console.log('listening on port' + port);
});
