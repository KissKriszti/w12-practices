const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 9000;
const userFile = path.join(`${__dirname}/../frontend/users.json`)

const fFolder = path.join(`${__dirname}/../frontend`);

app.use(express.json());
app.use('/public', express.static(`${fFolder}/public`));

app.get('/', (req,res,next) => {
    console.log("Request received");
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
})

app.get('/admin/order-view', (req,res,next) => {
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

app.get('/api/v1/users-query', (req,res,next) => {
    console.log(req.query.apiKey)
    if (req.query.apiKey === 'apple') {
        res.sendFile(userFile);
    }
    else {
        res.send('Unauthorized request')
    }
});

app.get('/api/v1/users-params/:key', (req,res,next) => {
    console.dir(req.params)
    console.log(req.params.key)
    if (req.params.key === 'apple') {
        res.send("You wrote apple")
    }
    else {
        res.send("It's not an apple")

    }
});

app.get('/api/v1/users/:status', (req,res,next) => {
    if (req.params.status === "active") {
        fs.readFile(userFile, (error,data) => {
            if (error) {
                res.send("Something went wrong in reading the file")
            }
            else {
                const users = JSON.parse(data)
                res.send(users.filter(user => user.status === "active"))
            }
        })
    }
    else {
        fs.readFile(userFile, (error,data) => {
            if (error) {
                res.send("Something went wrong in reading the file")
            }
            else {
                const users = JSON.parse(data)
                res.send(users.filter(user => user.status === "passive"))
            }
        })
    }
})

app.post('/users/new', (req,res) => {
    fs.readFile(`${fFolder}/users.json`, (error,data) => {
        if (error) {
            console.log(error);
            res.send("Error reading users file");
        } else {
            const users = JSON.parse(data);
            console.log(req.body)
            users.push(req.body);

            fs.writeFile(`${fFolder}/users.json`, JSON.stringify(users), error => {
                if (error) {
                    console.log(error);
                    res.send("Error writing users file");
                }
            })
            res.send(req.body)
        }
    })
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})