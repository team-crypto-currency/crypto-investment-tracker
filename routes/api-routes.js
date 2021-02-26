// const coinABRV = require("./crypto-investment-tracker/public/assets/js/crypto.js");
const axios = require('axios');

module.exports = (app) => {

    app.get('/', (req, res) => res.render('index'));
  
    // app.get('/api/waitlist', (req, res) => res.json(waitListData));
  
    // app.post('/', (req, res) => {
  
    //     res.send();
    //   }
    // });
  
  
//     app.post('/api/', (req, res) => {

//       res.json();
//     });
  


  // MACD call from taapi
  app.get('/api/coin/:coin', (req, res) => {
    // Require axios: npm i axios
    

    axios.get('https://api.taapi.io/rsi', {
      params: {
        secret: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWxleXdhaGxyb29zMTVAZ21haWwuY29tIiwiaWF0IjoxNjE0MjA5MzM2LCJleHAiOjc5MjE0MDkzMzZ9.50_xPRl8-tZzpRANXRWBf9VAb2GV31wWyOdIHyZJtD4",
        exchange: "binance",
        symbol: `${req.params.coin}/USDT`,
        interval: "1h",
      }
    })
    .then(function (response) {
      console.log("axios", response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
  
  });

};