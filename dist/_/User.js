"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(json) {
        this.m_isDeveloper = json.developer || false;
        this.m_isAdministrator = json.administrator || false;
        this.m_isPermGranted = json.permsGranted || false;
        this.m_snowflake = json.snowflake || "0";
    }
    return User;
}());
exports.default = User;
