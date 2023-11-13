"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDocument = exports.objectIdToString = exports.stringToObjectId = exports.isValidObjectId = void 0;
const mongodb_1 = require("mongodb");
const isValidObjectId = (id) => mongodb_1.ObjectId.isValid(id);
exports.isValidObjectId = isValidObjectId;
const stringToObjectId = (string) => {
    return new mongodb_1.ObjectId(string);
};
exports.stringToObjectId = stringToObjectId;
const objectIdToString = (objectId) => {
    return objectId.toHexString();
};
exports.objectIdToString = objectIdToString;
const mapDocument = (document) => {
    const { _id } = document, rest = __rest(document, ["_id"]);
    const id = (0, exports.objectIdToString)(_id);
    return Object.assign(Object.assign({}, rest), { id });
};
exports.mapDocument = mapDocument;
