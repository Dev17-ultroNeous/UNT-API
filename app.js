const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser')
const app = express();
const mainRoute = require("./routes/mainRoute")
const viewRoute = require("./routes/viewRoute")
const ErrorController = require("./controllers/errorController");
// const https = require("https")
// const http = require("http")
// const fs = require("fs")
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/ultroneous.com/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/ultroneous.com/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/ultroneous.com/chain.pem', 'utf8');

// const credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca
// };
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(bodyParser.json({ limit: '50mb' }))
app.use(express.json({ limit: "50mb" }));
app.use("/public/", express.static(path.join("public"))); //path image
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));

app.get("/test", (req, res, next) => {
    res.send("Working...");
});
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    res.status(statusCode).json({
        status,
        message: err.message,
    });
});

app.use('/admin', mainRoute);

app.set('view engine', 'ejs');

app.use('/admin', viewRoute)
app.use(ErrorController);

const port = process.env.PORT || 8000;
// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(8000, () => {
//     console.log('HTTPS Server running on port 8000');
// });

app.listen(port)
app.listen(console.log('server listening at port ' + port));