var express = require('express');
var app = express();
const { error } = require('node:console');
const fs = require('node:fs');

const port = 3000;
const dataFileName = 'data/data.json'

app.use(express.json());


// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://vue.test');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

app.get('/', function (req, res) {
    res.json({"msg":"welcome to server"});
});

app.get('/data', function (req, res) {
    let jsonString = getFromFile();
    res.json(JSON.parse(jsonString));
});

app.post('/data', function (req, res) {
    saveToFile(req.body);
    res.status(200).send('OK');
});

// запуск сервера
app.listen(port, () => console.log(`Listening on localhost:${port}`));


function createFileIfEmpty() {
    if (!fs.existsSync(dataFileName)) {
        fs.writeFileSync(dataFileName, JSON.stringify({}), (error) => {
            if (error) {
                console.log(error);
            }
    
            console.log('Empty file created');
        });
    }
}

function saveToFile(data) {
    fs.writeFile(dataFileName, JSON.stringify(data), (error) => {
        if (error) {
            console.log(error);
        }

        console.log('Data written to file');
    });
}

function getFromFile() {
    createFileIfEmpty();

    return fs.readFileSync(dataFileName, "utf-8", (error, data) => {
        if (error) {
            console.log("Error occuried: " + error);
            return;
        }

        return data;
    });
}

