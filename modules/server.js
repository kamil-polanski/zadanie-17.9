const express = require(`express`);
const path = require(`path`);
const colors = require(`colors`)
const app = express();
const formidable = require(`formidable`);


app.set(`view engine`, `ejs`);
app.use(express.static(`public`));

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
            const file_name = file.name;
            res.render(__dirname + `/../templates/upload`, {
                file_name: file_name,
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