"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Daniel Grigore
 *
 */
var Movie = /** @class */ (function () {
    function Movie() {
    }
    return Movie;
}());
exports.default = Movie;
function convertRatingValue(rating) {
    switch (rating) {
        case "G":
            return 7;
        case "PG":
            return 12;
        case "PG-13":
            return 13;
        case "R":
            return 15;
        default:
            return;
    }
}
exports.convertRatingValue = convertRatingValue;
