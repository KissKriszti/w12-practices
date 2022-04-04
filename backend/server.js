const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 9000;
const userFile = path.join(`${__dirname}/../frontend/users.json`)

app.get('/', (req,res,next) => {
    console.log("Request received");
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
})

app.get('/kiskutya', (req,res,next) => {
    console.log("Request received");
    res.sendFile(path.join(`${__dirname}/../frontend/somefile.json`));
})

app.get('/something', (req,res,next) => {
    console.log("Request received for Something endpoint");
    res.send("Thank you for the request. This is our response for something endpoint.")
})

app.get('/api/v1/users', (req,res,next) => {
    console.log("Request received for users endpoint");
    res.sendFile(userFile);
});

app.get('/api/v1/users/active', (req,res,next) => {
    fs.readFile(userFile, (error,data) => {
        if (error) {
            res.send("Something went wrong in reading the file")
        }
        else {
            const users = JSON.parse(data)
            res.send(users.filter(user => user.status === "active"))
        }
    })
})

app.get('/api/v1/users/passive', (req,res,next) => {
    fs.readFile(userFile, (error,data) => {
        if (error) {
            res.send("Something went wrong in reading the file")
        }
        else {
            const users = JSON.parse(data)
            res.send(users.filter(user => user.status === "passive"))
        }
    })
})

app.use('/public', express.static(`${__dirname}/../frontend/public`));

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})