// Imports
import { Strategy as DiscordStrategy } from "discord-auth";
import * as DotEnv from "dotenv";
import * as ExpressJS from "express";
import * as session from "express-session";
import * as HTTP from "http";
import * as passport from "passport";
import * as refresh from "passport-oauth2-refresh";
import * as Path from "path";
import * as SocketIO from "socket.io";

// Variables
let app = ExpressJS();
let http = HTTP.createServer(app);
let io = SocketIO(http);

// Env Vars
DotEnv.config();

// View Engine
app.set("view engine", "ejs");

// Authentication
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

var discordStrat = new DiscordStrategy(
    {
        clientID: "518144885849718784",
        clientSecret: "2xl2VAUCfeNnBu__nm5xWkPmPw3Tn2ze",
        callbackURL: process.env.MODE == "dev" ? "http://localhost:3000/auth/callback" : `${process.env.ROOT}/auth/callback`,
        scope: ["identify"],
    },
    function (accessToken: string, refreshToken: string, profile: { refreshToken: string }, cb: Function) {
        profile.refreshToken = refreshToken;
        cb(null, profile);
    }
);

passport.use(discordStrat);
refresh.use(discordStrat);

app.use(
    session({
        secret: "89347yfgrbnefy78guiertuity34q78ob7^&$Ribyt34f78t7y%76t78675w3467653487",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
    res.render(Path.join(__dirname, "..", "routes", "home.ejs"));
});

app.get("/auth/failed", (req, res) => {
    res.render(Path.join(__dirname, "..", "routes", "auth-failed.ejs"), {});
});

app.get("/auth/success", authCheck, (req, res) => {
    res.redirect("/dash");
});

app.get("/auth/go", passport.authenticate("discord"));

app.get(
    "/auth/callback",
    passport.authenticate("discord", {
        failureRedirect: "/auth/failed",
    }),
    function (req, res) {
        res.redirect("/auth/success"); // Successful auth
    }
);

app.get("/auth/logout", authCheck, (req, res) => {
    req.logout();
    res.redirect("/");
});

app.get("/dash", authCheck, (req, res) => {
    res.render(Path.join(__dirname, "..", "routes", "portal.ejs"), { user: req.user });
});

app.use(ExpressJS.static(Path.join(__dirname, "..", "public")));

// Authentication Check
function authCheck(req: { isAuthenticated: () => boolean }, res: { redirect: (arg0: string) => void }, next: Function) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/go");
}

// Socket IO
io.on("connection", (socket) => {
    console.log("x1 new connection");
    socket.on("disconnect", () => {
        console.log("1 disconnected");
    });
});

// Listen
http.listen(process.env.PORT, () => {
    console.log(`listening on *:${process.env.PORT}`);
});
