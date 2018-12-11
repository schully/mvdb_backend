"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dataBase_1 = require("./dataBase");
/**
 *
 * @author Daniel Grigore
 */
var app = express_1.default();
dataBase_1.setupDb().then(function (db) {
    var baseUrl = '/api';
    app.listen(8094, function () {
        console.log("IS-ON");
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use(cors_1.default());
    app.get(baseUrl + "/movies", require('./Get').getMovies);
    app.get(baseUrl + "/movie/:id", require('./Get').getMovie);
    app.get(baseUrl + "/movie/imdb/:imdbId", require('./Get').getImdb);
    app.put(baseUrl + "/movie/:movieId", require('./Put').default);
    app.post(baseUrl + "/movie", require('./Post').default);
    app.delete(baseUrl + "/movie/:movieId", require('./Delete').default);
});
