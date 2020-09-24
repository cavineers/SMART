"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_auth_1 = require("discord-auth");
var DotEnv = require("dotenv");
var ExpressJS = require("express");
var session = require("express-session");
var HTTP = require("http");
var passport = require("passport");
var refresh = require("passport-oauth2-refresh");
var Path = require("path");
var SocketIO = require("socket.io");
var app = ExpressJS();
var http = HTTP.createServer(app);
var io = SocketIO(http);
DotEnv.config();
app.set("view engine", "ejs");
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
var discordStrat = new discord_auth_1.Strategy({
    clientID: "518144885849718784",
    clientSecret: "2xl2VAUCfeNnBu__nm5xWkPmPw3Tn2ze",
    callbackURL: process.env.MODE == "dev" ? "http://localhost:3000/auth/callback" : process.env.ROOT + "/auth/callback",
    scope: ["identify"],
}, function (accessToken, refreshToken, profile, cb) {
    profile.refreshToken = refreshToken;
    cb(null, profile);
});
passport.use(discordStrat);
refresh.use(discordStrat);
app.use(session({
    secret: "89347yfgrbnefy78guiertuity34q78ob7^&$Ribyt34f78t7y%76t78675w3467653487",
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.get("/", function (req, res) {
    res.render(Path.join(__dirname, "..", "routes", "home.ejs"));
});
app.get("/auth/failed", function (req, res) {
    res.render(Path.join(__dirname, "..", "routes", "auth-failed.ejs"), {});
});
app.get("/auth/success", authCheck, function (req, res) {
    res.redirect("/dash");
});
app.get("/auth/go", passport.authenticate("discord"));
app.get("/auth/callback", passport.authenticate("discord", {
    failureRedirect: "/auth/failed",
}), function (req, res) {
    res.redirect("/auth/success");
});
app.get("/auth/logout", authCheck, function (req, res) {
    req.logout();
    res.redirect("/");
});
app.get("/dash", authCheck, function (req, res) {
    res.render(Path.join(__dirname, "..", "routes", "portal.ejs"), { user: req.user });
});
app.use(ExpressJS.static(Path.join(__dirname, "..", "public")));
function authCheck(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect("/auth/go");
}
io.on("connection", function (socket) {
    console.log("x1 new connection");
    socket.on("disconnect", function () {
        console.log("1 disconnected");
    });
});
http.listen(process.env.PORT, function () {
    console.log("listening on *:" + process.env.PORT);
});
