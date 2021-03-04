// Global Variables
const searchBtn = $(".searchBtn");
const searchBox = $(".searchFld");
const saveBtn = $("<button>").text("Save Coin").addClass("save-btn");
const coinSearch = $(".currentSrch");
const currentDate = moment().format("M/D/YY");
const coinDetails = $(".coinDetail");
const rsiDiv = $(".rsi");
const macdDiv = $(".macd");
const emaDiv = $(".ema");
const smaDiv = $(".sma");

// Defines settings for api calls
const settings = {
  async: true,
  crossDomain: true,
  url: "https://coinranking1.p.rapidapi.com/coins/",
  method: "GET",
  headers: {
    "x-rapidapi-key": "198c5d9404msh8afbdbe95aa7f12p115299jsn1d3f7e17a3ea",
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  },
};

// use this ajax call to display all data if need be
// $.ajax(settings).done(function (response) {
//   console.log("ajax1:", response);
// });

// MACD
function renderMACD(coin) {
  console.log("abrev: ", coin);
  const settings3 = {
    async: true,
    crossDomain: true,
    url: `/api/coin/macd/${coin}`,
    method: "GET",
  };
  $.ajax(settings3).done(function (response) {
    console.log("MACD:", response);
    const macdTitle = $("<h1>").text("MACD");
    const macdValue = $("<p>").text(`Value: ${parseFloat(response.valueMACD).toFixed(2)}`);
    const macdSignal = $("<p>").text(`Signal: ${parseFloat(response.valueMACDSignal).toFixed(2)}`);
    const macdHistogram = $("<p>").text(`Histogram: ${parseFloat(response.valueMACDHist).toFixed(2)}`);

    $(macdDiv).append(macdTitle, macdValue, macdSignal, macdHistogram);
  });
}

// RSI
function renderRSI(coin) {
  const settings3 = {
    async: true,
    crossDomain: true,
    url: `/api/coin/rsi/${coin}`,
    method: "GET",
  };
  $.ajax(settings3).done(function (response) {
    console.log("RSI:", response);
    const rsiTitle = $("<h1>").text("RSI");
    const rsiValue = $("<p>").text(`Value: ${parseFloat(response.value).toFixed(2)}`);

    $(rsiDiv).append(rsiTitle, rsiValue);
  });
}

// EMA
function renderEMA(coin) {
  const settings3 = {
    async: true,
    crossDomain: true,
    url: `/api/coin/ema/${coin}`,
    method: "GET",
  };
  $.ajax(settings3).done(function (response) {
    console.log("EMA:", response);
    const emaTitle = $("<h1>").text("EMA");
    const emaValue = $("<p>").text(`Value: ${parseFloat(response.value).toFixed(2)}`);

    $(emaDiv).append(emaTitle, emaValue);
  });
}

// SMA
function renderSMA(coin) {
  const settings3 = {
    async: true,
    crossDomain: true,
    url: `/api/coin/sma/${coin}`,
    method: "GET",
  };
  $.ajax(settings3).done(function (response) {
    console.log("SMA:", response);
    const smaTitle = $("<h1>").text("SMA");
    const smaValue = $("<p>").text(`Value: ${parseFloat(response.value).toFixed(2)}`);

    $(smaDiv).append(smaTitle, smaValue);
  });
}

let thisCoin;
function renderManyCoins(searchedCoin) {
  $.ajax(settings).then(function (response) {
    for (let i = 0; i < response.data.coins.length; i++) {
      // console.log(coin)
      if (searchedCoin === response.data.coins[i].name) {
        console.log("user search name match: ", response.data.coins[i].name);
        thisCoin = response.data.coins[i];
        console.log("this coin: ", thisCoin);
      }
    }

    const coinName = thisCoin.name;
    const coinABRV = thisCoin.symbol;
    const coinPriceToInt = parseFloat(thisCoin.price).toFixed(2);
    let changeVar = $("<span>").text(`${thisCoin.change}%`);
    const highestVar = thisCoin.allTimeHigh.timestamp;
    const highPriceToInt = parseFloat(thisCoin.allTimeHigh.price).toFixed(2);
    const currentPrice = $("<p>").text(`Current Price: $${coinPriceToInt}`);
    let change = $("<p>").text("Real Time Change: ").append(changeVar);
    const highMarkTime = `Hit on: ${moment(highestVar).format("MM/DD/YYYY")}`;
    const highMark = $("<p>").text(`All Time High: $${highPriceToInt} ${highMarkTime}`);

    if (thisCoin.change > 0){
      changeVar = $("<span class='text-green-500'>").text(`+${thisCoin.change}%`);
      change = $("<p>").text("Real Time Change: ").append(changeVar);
      $(coinDetails).append(currentPrice, change, highMark, saveBtn);
    } else {
      changeVar = $("<span class='text-red-700'>").text(`${thisCoin.change}%`);
      change = $("<p>").text("Real Time Change: ").append(changeVar);
      $(coinDetails).append(currentPrice, change, highMark, saveBtn);
    }

    $(coinSearch).text(`${coinName} [${coinABRV}] (${currentDate})`);

    $(saveBtn).on("click", async function (event) {
      event.preventDefault();
      // Save the coin the user searched for to our database
      const coinName = $(".coinName").val().trim();
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: coinName})
      };
      await fetch("/api/coin", requestOptions);

      // If the user is not signed in, take them to the sign in page
      window.location.replace("/sign-in");
      // If the user is signed in, take them to their saved-coins page/portfolio
    });

    renderMACD(coinABRV);
    renderRSI(coinABRV);
    renderEMA(coinABRV);
    renderSMA(coinABRV);
  });
}

searchBtn.click(function () {
  const searchedCoin = $(searchBox).val();
  coinDetails.empty();
  macdDiv.empty();
  rsiDiv.empty();
  emaDiv.empty();
  smaDiv.empty();
  renderManyCoins(searchedCoin);
});


// Lets the user sign-out
$.get("/api/user_data").then(function(data) {
  $(".member-name").text(data.email);
});


renderLandingCoin();

// render bitcoin on home page
function renderLandingCoin() {
  macdDiv.empty();
  rsiDiv.empty();
  emaDiv.empty();
  smaDiv.empty();
  $.ajax(settings).then(function (response) {
    for (let i = 0; i < response.data.coins.length; i++) {
      // console.log(coin)
      if (response.data.coins[i].name === "Bitcoin") {
        thisCoin = response.data.coins[i];
        console.log("this coin: ", thisCoin);
      }
    }

    const coinName = thisCoin.name;
    const coinABRV = thisCoin.symbol;
    const coinPriceToInt = parseFloat(thisCoin.price).toFixed(2);
    let changeVar = $("<span>").text(`${thisCoin.change}%`);
    const highestVar = thisCoin.allTimeHigh.timestamp;
    const highPriceToInt = parseFloat(thisCoin.allTimeHigh.price).toFixed(2);
    const currentPrice = $("<p>").text(`Current Price: $${coinPriceToInt}`);
    let change = $("<p>").text("Real Time Change: ").append(changeVar);
    const highMarkTime = `Hit on: ${moment(highestVar).format("MM/DD/YYYY")}`;
    const highMark = $("<p>").text(`All Time High: $${highPriceToInt} ${highMarkTime}`);

    if (thisCoin.change > 0){
      changeVar = $("<span class='text-green-500'>").text(`+${thisCoin.change}%`);
      change = $("<p>").text("Real Time Change: ").append(changeVar);
      $(coinDetails).append(currentPrice, change, highMark, saveBtn);
    } else {
      changeVar = $("<span class='text-red-700'>").text(`${thisCoin.change}%`);
      change = $("<p>").text("Real Time Change: ").append(changeVar);
      $(coinDetails).append(currentPrice, change, highMark, saveBtn);
    }

    $(coinSearch).text(`${coinName} [${coinABRV}] (${currentDate})`);


    renderMACD(coinABRV);
    renderRSI(coinABRV);
    renderEMA(coinABRV);
    renderSMA(coinABRV);
  });
}