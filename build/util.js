"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
/**
 * @author Daniel Grigore
 */
exports.default = {
    assertParams: function (props, obj, allowEmptyString) {
        if (allowEmptyString === void 0) { allowEmptyString = false; }
        var missingProps = [];
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var p = props_1[_i];
            if (!obj.hasOwnProperty(p) || (allowEmptyString ? false : obj[p] == '')) {
                missingProps.push(p);
            }
        }
        if (missingProps.length > 0) {
            throw new Error('Missing parameters: ' + missingProps.join(','));
        }
    },
    readContents: function (filePath) {
        console.log(__dirname);
        return fs_1.readFileSync(path_1.default.resolve(filePath)).toString();
    },
    getQuery: function (name) {
        if (!name.endsWith('.sql')) {
            name += ".sql";
        }
        return fs_1.readFileSync(path_1.default.resolve(__dirname, '../sql', name)).toString();
    },
    reobject: function (original) {
        return JSON.parse(JSON.stringify(original));
    }
};
