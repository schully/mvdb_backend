"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.listen(8083, function () { return console.log("YAYAY it workd"); });
app.get("/movie/:movieId", function (req, res) {
    console.log(req.header("date"));
    console.log(req.params);
    res.end("movieBoi");
});
