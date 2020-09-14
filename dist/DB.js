"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var DB = (function () {
    function DB() {
        this.users = new discord_js_1.Collection();
    }
    return DB;
}());
exports.default = DB;
