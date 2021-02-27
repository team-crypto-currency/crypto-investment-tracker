// const coinABRV = require("./crypto-investment-tracker/public/assets/js/crypto.js");
const axios = require("axios");
const db = require("../models");

module.exports = (app) => {

  // Api route to render index.handlebars (dashboard page)
  app.get("/", (req, res) => res.render("index"));

  // Api route to add user
  app.post("/api/user", (req, res) => {
    console.log("User Data:", req.body);
    db.User.create({
      username: req.body.username
    }).then((results) => res.json(results));
  });

  // RSI
  app.get("/api/coin/rsi/:coin", (req, res) => {
    axios.get("https://api.taapi.io/rsi", {
      params: {
        secret: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWxleXdhaGxyb29zMTVAZ21haWwuY29tIiwiaWF0IjoxNjE0MjA5MzM2LCJleHAiOjc5MjE0MDkzMzZ9.50_xPRl8-tZzpRANXRWBf9VAb2GV31wWyOdIHyZJtD4",
        exchange: "binance",
        symbol: `${req.params.coin}/USDT`,
        interval: "1h",
      }
    }).then(function (response) {
      console.log("rsi", response.data);
      res.json(response.data);
    }).catch(function (error) {
      console.log(error.response.data);
    });
  });

  // MACD call from taapi
  app.get("/api/coin/macd/:coin", (req, res) => {
    axios.get("https://api.taapi.io/macd", {
      params: {
        secret: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWxleXdhaGxyb29zMTVAZ21haWwuY29tIiwiaWF0IjoxNjE0MjA5MzM2LCJleHAiOjc5MjE0MDkzMzZ9.50_xPRl8-tZzpRANXRWBf9VAb2GV31wWyOdIHyZJtD4",
        exchange: "binance",
        symbol: `${req.params.coin}/USDT`,
        interval: "1h",
      }
    }).then(function (response) {
      console.log("macd", response.data);
      res.json(response.data);
    }).catch(function (error) {
      console.log(error.response.data);
    });
  });

  // EMA
  app.get("/api/coin/ema/:coin", (req, res) => {
    axios.get("https://api.taapi.io/ema", {
      params: {
        secret: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWxleXdhaGxyb29zMTVAZ21haWwuY29tIiwiaWF0IjoxNjE0MjA5MzM2LCJleHAiOjc5MjE0MDkzMzZ9.50_xPRl8-tZzpRANXRWBf9VAb2GV31wWyOdIHyZJtD4",
        exchange: "binance",
        symbol: `${req.params.coin}/USDT`,
        interval: "1h",
      }
    }).then(function (response) {
      console.log("ema", response.data);
      res.json(response.data);
    }).catch(function (error) {
      console.log(error.response.data);
    });
  });

  // SMA
  app.get("/api/coin/sma/:coin", (req, res) => {
    axios.get("https://api.taapi.io/sma", {
      params: {
        secret: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWxleXdhaGxyb29zMTVAZ21haWwuY29tIiwiaWF0IjoxNjE0MjA5MzM2LCJleHAiOjc5MjE0MDkzMzZ9.50_xPRl8-tZzpRANXRWBf9VAb2GV31wWyOdIHyZJtD4",
        exchange: "binance",
        symbol: `${req.params.coin}/USDT`,
        interval: "1h",
      }
    }).then(function (response) {
      console.log("sma", response.data);
      res.json(response.data);
    }).catch(function (error) {
      console.log(error.response.data);
    });
  });

};




