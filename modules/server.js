/*const http = require(`http`);
const colors = require(`colors`);
const handlers = require(`./handlers`)

function start() {
    function onRequest(request, response) {
        console.log(`Odebrano zapytanie`);
        response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        console.log("Zapytanie " + request.url + " odebrane.");

        switch (request.url) {

            case `/`:
            case `/start`:
                handlers.welcome(request, response);
                console.log(request.url);
                break;
            case `/upload`:
                handlers.upload(request, response);
                break;
            case `/show`:
                handlers.show(request, response);
                break;
            default:
                handlers.error(request, response);
        }

    }
    http.createServer(onRequest).listen(30001);
    console.log(`Uruchomiono serwer`.green);
}
*/


const express = require(`express`);
const path = require(`path`);
const colors = require(`colors`)
const app = express();
const formidable = require(`formidable`);


app.set('view engine', 'ejs');
app.use(express.static('public'));

const welcome = [`/`, `/start`, ]

function start() {
    app.get(welcome, function(req, res) {
        console.log(`Rozpoczynam przetwarzać żądanie welcome`);
        res.sendFile(path.join(__dirname + `/../templates/index.html`));
    });

    app.post(`/upload`, function(req, res) {
        const form = new formidable.IncomingForm();
        form.parse(req);
        form.keepExtensions = false;
        form.on(`fileBegin`, function(name, file) {
            file.path = __dirname + `/../public/uploads/` + file.name;
            console.log(file.path);
            var tag = file.name;
            console.log(file.name);
            res.render(__dirname + '/../templates/upload', {
                tagline: tag
            });
        });
        form.on(`file`, function(name, file) {
            console.log(`Uploaded ` + file.name);
        });

    });
    app.get(`*`, function(req, res) {
        res.set(`Content-Type`, `image/jpg`)
        res.sendFile(path.join(__dirname + `/../img/404.jpg`));
        console.log(`Nie wiem co robić`);
    });
    const server = app.listen(9001, function() {
        console.log(`Sever on port :9001`.green)
    })
}
exports.start = start;
/*
exports.show = function(request, response) {
    fs.readFile(img_name, "binary", function(error, file) {
        response.writeHead(200, { "Content-Type": "image/png" });
        response.write(file, "binary");
        response.end();
    });
}
*/