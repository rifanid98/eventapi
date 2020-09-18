const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

app.use(cors());
app.use(morgan('dev'));

/** Global Root Path */
const config = require('./src/configs/global');
const path = require('path');
global.appRoot = path.resolve(__dirname);

/** Body Parser*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Static File */
app.use(`/${config.rootProjectPath}`, express.static("src/assets/"));

/** Routes */
const routes = require('./src/routes/r_index');
app.use(`/${config.rootProjectPath}/api/v1`, routes);


/** URL Error Handling */
app.use(function (req, res, next) {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({
        error: {
            status: error.status,
            message: error.message
        }
    });
})

/** Config MySQL */
const conn = require('./src/helpers/mysql');
function connect() {
    conn.connect(function (error) {
        if (error) throw error;
        console.log("DB Connected!");
    });
}

/** Server Start */
const port = process.env.PORT || 3000;
const host = process.env.HOST;
app.listen(port, host, () => {
    connect();
    console.log("Server is running on port " + port);
});