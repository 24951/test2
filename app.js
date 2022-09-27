const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));

app.get('/currenttime', function(req, res){
    res.send('<h1>' + new Date().toISOString() + '</h1>')
}) 

app.get('/', (req, res) => {
    res.send('<form action="/store-user" method="POST"><input name="username" type="text" placeholder="여기에 이름 입력"><button>submit</button></form>')
}) 

app.post('/store-user', (req, res) => {
    const userName = req.body.username;

    const filePath = path.join(__dirname, 'data', 'users.json');

    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);

    existingUsers.push(userName);

    fs.writeFileSync(filePath, JSON.stringify(existingUsers));

    res.send('<h1>저장했어요.</h1>');
})

app.listen(3000)