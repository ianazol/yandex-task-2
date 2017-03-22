"use strict";

const express = require("express");
const app = express();
const database = require("./database");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

database.connect();

app.listen(port, function () {
    console.log('Listening on port ' + port)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));
app.use(express.static('./client/'));

require("./routes/school.routes")(app);
require("./routes/classroom.routes")(app);
require("./routes/lecture.routes")(app);

app.use(function(req, res){
    res.status(404).send('404 Not Found');
});

app.use(function(err, req, res, next){
    console.dir(err);
    res.status(500).send('500 Server Error');
});