const express = require("express");
const {Port} = require("./config/serverconfig");
const body_parser = require("body-parser");
const routes = require("./router/index");
const passportAuth = require("./config/passport");
const passport = require("passport");

const starting_up = ()=>{
    const app  = express();
    app.use(body_parser.json());
    app.use(body_parser.urlencoded({extended:true}));
    app.use(passport.initialize());
    passportAuth(passport);

    app.use("/api", routes);

    app.listen(Port,()=>{
        console.log(`http://localhost:${Port}`);
    });

}

starting_up();
