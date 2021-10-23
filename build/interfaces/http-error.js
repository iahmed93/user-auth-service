"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
var HttpError = /** @class */ (function () {
    function HttpError(code, msg, error) {
        this.code = code;
        this.msg = msg;
        this.error = error;
    }
    return HttpError;
}());
exports.HttpError = HttpError;
