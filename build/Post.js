"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __importDefault(require("./util"));
var omdbConnection_1 = require("./omdbConnection");
var Movie_1 = __importStar(require("./Movie"));
var IdFromImdb_1 = __importDefault(require("./IdFromImdb"));
var dataBase_1 = require("./dataBase");
var errorHandler_1 = __importDefault(require("./errorHandler"));
var validate = function (movie) {
    if ((movie.runtime <= 5)) {
        return "To short for a movie";
    }
    if ((movie.title || "").length < 2) {
        return "You sure? Cause I am sure you are wrong...";
    }
    if (!Array.isArray(movie.genre) || !movie.genre.length) {
        return "Not valid genre";
    }
    return true;
};
var insertGenre = function (movie) { return __awaiter(_this, void 0, void 0, function () {
    var genre, genreId, _i, genre_1, g;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                genre = movie.genre.map(function (c) { return c.trim().toString(); });
                _i = 0, genre_1 = genre;
                _a.label = 1;
            case 1:
                if (!(_i < genre_1.length)) return [3 /*break*/, 7];
                g = genre_1[_i];
                return [4 /*yield*/, dataBase_1.query(util_1.default.getQuery("genre"), [g], {
                        forceArray: false,
                        skipObjectIfSingleResult: true
                    })];
            case 2:
                genreId = ((_a.sent()) || {}).id;
                console.log("Existing Grenre ID: ", genreId);
                if (!!genreId) return [3 /*break*/, 4];
                return [4 /*yield*/, dataBase_1.query(util_1.default.getQuery("insert_genre"), [g])];
            case 3:
                genreId = (_a.sent()).insertId;
                console.log("Inserted genre ID: ", genreId);
                _a.label = 4;
            case 4:
                console.log("Genre id: ", genreId, "movie id: ", movie.id);
                return [4 /*yield*/, dataBase_1.query("UPDATE movies SET genre_id = ? WHERE id = ?", [genreId, movie.id])];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                _i++;
                return [3 /*break*/, 1];
            case 7:
                movie.genre = genre;
                return [2 /*return*/];
        }
    });
}); };
var insertMovie = function (movie) { return __awaiter(_this, void 0, void 0, function () {
    var insertId, movieId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("hlo im ins 1", movie);
                return [4 /*yield*/, dataBase_1.query(util_1.default.getQuery("insert_movie"), [movie.title, movie.imdbScore, movie.runtime, movie.plot, movie.ageRated, movie.possessor || ''])];
            case 1:
                insertId = (_a.sent()).insertId;
                movieId = insertId;
                movie.id = movieId;
                return [2 /*return*/];
        }
    });
}); };
/**
 * @author Daniel Grigore
 * @param req
 * @param res
 */
exports.default = (function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var param, body, addByImdbId, result, imdbMovie, fetched, validationError, imdbMovie, field, error_1, movieId, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                param = req.param, body = req.body;
                addByImdbId = 'imdb_id' in body;
                console.log(body);
                if (!addByImdbId) return [3 /*break*/, 2];
                imdbMovie = result = new IdFromImdb_1.default();
                imdbMovie.imdbId = body.imdb_id;
                return [4 /*yield*/, omdbConnection_1.fetchMovie(imdbMovie.imdbId)];
            case 1:
                fetched = (_a.sent()).result;
                return [3 /*break*/, 3];
            case 2:
                result = new Movie_1.default();
                _a.label = 3;
            case 3:
                console.log(body);
                result.title = body.title;
                result.runtime = parseInt(body.runtime);
                result.plot = body.plot;
                result.ageRated = Movie_1.convertRatingValue(body.ageRated);
                result.imdbScore = (body.imdbScore);
                result.genre = (body.genre || "").split(",");
                result.possessor = body.possessor;
                if ((validationError = validate(result)) !== true) {
                    return [2 /*return*/, res.status(400).end(JSON.stringify({ validationError: validationError }))];
                }
                _a.label = 4;
            case 4:
                _a.trys.push([4, 7, , 8]);
                if (!addByImdbId) return [3 /*break*/, 6];
                return [4 /*yield*/, omdbConnection_1.fetchMovie(body.imdb_id)];
            case 5:
                imdbMovie = (_a.sent()).result;
                for (field in Movie_1.default.prototype) {
                    if (result[field] == null) {
                        result[field] = imdbMovie[field];
                    }
                }
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                if (error_1.result == 'noMatch') {
                    return [2 /*return*/, errorHandler_1.default(res, 'client', error_1)];
                }
                else {
                    return [2 /*return*/, errorHandler_1.default(res, 'server', null, error_1)];
                }
                return [3 /*break*/, 8];
            case 8:
                _a.trys.push([8, 11, , 12]);
                return [4 /*yield*/, insertMovie(result)];
            case 9:
                _a.sent();
                movieId = result.id;
                return [4 /*yield*/, insertGenre(result)];
            case 10:
                _a.sent();
                return [2 /*return*/, res.status(200).end(JSON.stringify({ "ok": true, "movie_id": movieId }))];
            case 11:
                error_2 = _a.sent();
                errorHandler_1.default(res, 'server', null, error_2);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); });
