"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const PORT = process.env.PORT || 7000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/static', express_1.default.static(__dirname + '/public'));
const jsonBodyMiddlewear = express_1.default.json();
app.use(jsonBodyMiddlewear);
app.get('/users', (request, response) => {
    console.log(db_1.db.users);
    response.json(db_1.db.users);
});
app.get('/users/:id', (request, response) => {
    const foundUser = db_1.db.users.find((el) => el.id === +request.params.id);
    if (!foundUser) {
        response.sendStatus(404);
        return;
    }
    response.json(foundUser);
});
app.post('/users', (request, response) => {
    const createdUser = {
        id: +(new Date()),
        nick: request.body.nick,
        email: request.body.email,
        password: request.body.password
    };
    db_1.db.users.push(createdUser);
    response.json(createdUser);
});
// app.put('/users/:id', (request, response) => { 
//     const createdAvatar = {
//         avatar: request.body.avatar
//     }
//     db.users.push(createdAvatar)
//     console.log(createdAvatar)
//     response.json(createdAvatar)    
// })
app.listen(PORT, () => {
    console.log(`CORS-enabled web server listening on port ${PORT}... This is CORS-enabled for all origins!`);
});
