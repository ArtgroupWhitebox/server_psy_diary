"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 7000;
const app = (0, express_1.default)();
app.get('/', (request, response) => {
    console.log(`hi`);
    response.json({ name: "Sveto4ka" });
});
app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});