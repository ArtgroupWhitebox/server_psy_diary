"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const PORT = process.env.PORT || 7000;
const app = (0, express_1.default)();
const publicPath = process.env.PUBLIC_PATH || `C:\\Users\\ML\\APP artgroup_whitebox\\server_psy_diary\\public`;
console.log("PATH P: ", publicPath + '/upload/');
app.use((0, cors_1.default)());
app.use('/static', express_1.default.static(publicPath));
// ограничить размер загружаемого файла
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 10000000 },
    abortOnLimit: true
}));
const jsonBodyMiddlewear = express_1.default.json();
app.use(jsonBodyMiddlewear);
app.get('/users', (req, res) => {
    console.log(db_1.db.users);
    res.json(db_1.db.users);
});
app.get('/users/:id', (req, res) => {
    const foundUser = db_1.db.users.find((el) => el.id === +req.params.id);
    if (!foundUser) {
        res.sendStatus(404);
        return;
    }
    res.json(foundUser);
});
app.post('/users', (req, res) => {
    const createdUser = {
        id: +(new Date()),
        nick: req.body.nick,
        email: req.body.email,
        password: req.body.password
    };
    db_1.db.users.push(createdUser);
    res.json(createdUser);
});
app.post('/upload', (req, res) => {
    var _a;
    // Log the files to the console
    console.log(req.files);
    // Get the file that was set to our field named "image"
    // const { image } = req.files
    const image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
    // If no image submitted, exit
    if (!image)
        return res.status(400).send("Картинка не вставлена");
    // If does not have image mime type prevent from uploading
    if (!/^image/.test(image.mimetype))
        return res.status(400).send("Это не картинка");
    // Move the uploaded image to our upload folder    
    image.mv(publicPath + '/upload/' + image.name);
    // All good
    res.status(200).json({ imageUrl: `http://localhost:${PORT}/static/upload/${image.name}` });
});
// app.put('/users/:id', (req, res) => { 
//     const createdAvatar = {
//         avatar: req.body.avatar
//     }
//     db.users.push(createdAvatar)
//     console.log(createdAvatar)
//     res.json(createdAvatar)    
// })
app.listen(PORT, () => {
    console.log(`CORS-enabled web server listening on port ${PORT}... This is CORS-enabled for all origins!`);
});
