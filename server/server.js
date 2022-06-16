const express = require('express');
const cors = require('cors');
require("dotenv").config();
const app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("./db.json");
const corsOptions = {
    exposedHeaders: 'Authorization',
};

app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.listen(3000);

createDatabaseExample();

app.post("/api/v1/login", async (req, res) => {
    const { username, password } = await req.body;
    const user = db.find(user => user.username === username);

    if (!user) {
        res.status(401)
        res.json({
            message: "username or password not found"
        })
    } else {
        await bcrypt.compare(password, user.password).then(resp => {
            if (resp) {
                res.statusCode = 200;
                var token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET, {
                    expiresIn: 3600 // expires in 1hr
                });
                res.setHeader('Authorization', `bearer ${token}`);
                res.json();
            } else {
                res.status(401)
                res.json({
                    message: "username or password not found"
                })
            }
        });
    }

})

app.post("/api/v1/user", async (req, res) => {
    const { username, password } = req.body;
    const user = await saveUser(username, password);
    res.json({ id: user.id, username: user.username });
})

app.get("/api/v1/user", (req, res) => {
    res.json(db.map(({ id, username }) => ({ id, username })));
})

function createDatabaseExample() {
    saveUser("admin", "admin");
}

async function saveUser(username, passwordToBeHashed) {
    const index = db.length;
    const hashedPassword = await bcrypt.hash(passwordToBeHashed, 10);
    const user = {
        id: index,
        username: username,
        password: hashedPassword
    };
    db.push(user)
    return user;
}
