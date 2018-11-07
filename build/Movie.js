"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Movie = /** @class */ (function () {
    function Movie() {
    }
    Movie.fromImdbMovie = function (json) {
        return {
            title: json.Title,
            ageRated: json.Rated,
            imdbScore: json.imdbRating,
            director: json.Director,
            genre: json.Genre,
            possessor: undefined
        };
    };
    return Movie;
}());
exports.default = Movie;
