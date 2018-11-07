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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
var express_1 = __importDefault(require("express"));
var Movie_1 = __importDefault(require("./Movie"));
var mysql_1 = __importDefault(require("mysql"));
var app = express_1.default();
var baseUrl = 'http://www.omdbapi.com/?apikey=3227a5fa&i=';
var connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'snacksis'
});
connection.connect(function (err) {
    if (err) {
        console.error('error: ' + err.stack);
        return;
    }
});
function query(sql, values) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, values, function (err, rows) {
            if (err)
                reject(err);
            resolve(rows);
            console.log('DataResiecevdMan');
            console.log(rows);
        });
    });
}
app.get("/movie/imdb/:id", function (req, res) {
    node_fetch_1.default(baseUrl + req.params.id).then(function (res) { return res.json(); }).then(function (json) {
        res.end(JSON.stringify(Movie_1.default.fromImdbMovie(json)));
    });
});
app.post("/movie/imdb", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var mta, md, mis, mg1, mg2, sqlM, sqlD, sqlI, sqlG, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mta = ['The Ten Commandments', 'G'];
                md = ['Cecil B. DeMille'];
                mis = ['7.9'];
                mg1 = ['Adventure'];
                mg2 = ['Drama'];
                sqlM = 'INSERT INTO movies (title,age_rated) VALUES (?, ?);';
                sqlD = 'INSERT INTO director (name) VALUES (?);';
                sqlI = 'INSERT INTO from_imdb (imdb_score) VALUES (?);';
                sqlG = 'INSERT INTO genres (name) VALUES (?);';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                // await waits for reolve to continue
                return [4 /*yield*/, query(sqlM, mta)];
            case 2:
                // await waits for reolve to continue
                _a.sent();
                return [4 /*yield*/, query(sqlD, md)];
            case 3:
                _a.sent();
                return [4 /*yield*/, query(sqlG, mg1)];
            case 4:
                _a.sent();
                return [4 /*yield*/, query(sqlI, mis)];
            case 5:
                _a.sent();
                return [4 /*yield*/, query(sqlG, mg2)];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 8];
            case 8:
                res.end(JSON.stringify({
                    status: "ok"
                }));
                return [2 /*return*/];
        }
    });
}); });
app.listen(8094, function () {
    console.log("ISON");
});
exports.default = app;
