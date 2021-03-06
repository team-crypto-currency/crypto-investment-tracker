// Global Variables
const searchBtn = $(".searchBtn");
const searchBox = $(".searchFld");
const saveBtn = $("<button>").text("Save Coin").addClass("save-btn py-2 px-4 border-l-4 border-r-4 border-green-500 bg-black rounded-full text-white hover:bg-green-500");
let coinSearch = $(".currentSrch");
const currentDate = moment().format("M/D/YY");
const coinDetails = $(".coinDetail");
const rsiDiv = $(".rsi");
const macdDiv = $(".macd");
const emaDiv = $(".ema");
const smaDiv = $(".sma");
let coinName = $(".coinName").val().trim();


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
  const chartIcon = $("<span>").addClass("fas fa-chart-line");
  console.log("abrev: ", coin);
  const settings3 = {
    async: true,
    crossDomain: true,
    url: `/api/coin/macd/${coin}`,
    method: "GET",
  };
  $.ajax(settings3).done(function (response) {
    console.log("MACD:", response);
    const macdTitle = $("<h1>").text("MACD ").append(chartIcon);
    const macdValue = $("<p>").text(`Value: ${parseFloat(response.valueMACD).toFixed(2)}`);
    const macdSignal = $("<p>").text(`Signal: ${parseFloat(response.valueMACDSignal).toFixed(2)}`);
    const macdHistogram = $("<p>").text(`Histogram: ${parseFloat(response.valueMACDHist).toFixed(2)}`);

    $(macdDiv).append(macdTitle, macdValue, macdSignal, macdHistogram);
  });
}

// RSI
function renderRSI(coin) {
  const chartIcon = $("<span>").addClass("fas fa-chart-line");

  const settings3 = {
    async: true,
    crossDomain: true,
    url: `/api/coin/rsi/${coin}`,
    method: "GET",
  };
  $.ajax(settings3).done(function (response) {
    console.log("RSI:", response);
    const rsiTitle = $("<h1>").text("RSI ").append(chartIcon);
    const rsiValue = $("<p>").text(`Value: ${parseFloat(response.value).toFixed(2)}`);

    $(rsiDiv).append(rsiTitle.append(chartIcon), rsiValue);
  });
}

// EMA
function renderEMA(coin) {
  const chartIcon = $("<span>").addClass("fas fa-chart-line");

  const settings3 = {
    async: true,
    crossDomain: true,
    url: `/api/coin/ema/${coin}`,
    method: "GET",
  };
  $.ajax(settings3).done(function (response) {
    console.log("EMA:", response);
    const emaTitle = $("<h1>").text("EMA ").append(chartIcon);
    const emaValue = $("<p>").text(`Value: ${parseFloat(response.value).toFixed(2)}`);

    $(emaDiv).append(emaTitle, emaValue);
  });
}

// SMA
function renderSMA(coin) {
  const chartIcon =$("<span>").addClass("fas fa-chart-line");

  const settings3 = {
    async: true,
    crossDomain: true,
    url: `/api/coin/sma/${coin}`,
    method: "GET",
  };
  $.ajax(settings3).done(function (response) {
    console.log("SMA:", response);
    const smaTitle = $("<h1>").text("SMA ").append(chartIcon);
    const smaValue = $("<p>").text(`Value: ${parseFloat(response.value).toFixed(2)}`);

    $(smaDiv).append(smaTitle, smaValue);
  });
}

let thisCoin;
function renderManyCoins(searchedCoin) {
  coinDetails.empty();
  macdDiv.empty();
  rsiDiv.empty();
  emaDiv.empty();
  smaDiv.empty();
  $.ajax(settings).then(function (response) {
    for (let i = 0; i < response.data.coins.length; i++) {
      // console.log(coin)
      if (searchedCoin === response.data.coins[i].name) {
        console.log("user search name match: ", response.data.coins[i].name);
        thisCoin = response.data.coins[i];
        setCoinButton(thisCoin.name);
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
  let searchedCoin = $(searchBox).val().trim();
  searchedCoin = searchedCoin.toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
  console.log("searchedcoin:",searchedCoin);
  renderManyCoins(searchedCoin);
});


// Lets the user sign-out
$.get("/api/user_data").then(function(data) {
  $(".member-name").text(data.email);
});


renderLandingCoin();

// render bitcoin on home page
function renderLandingCoin() {
  coinDetails.empty();
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

    $(saveBtn).on("click", async function (event) {
      event.preventDefault();
      // Save the coin the user searched for to our database

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


let buttonList = [];
const buttonDump = $(".buttonDump");

// on search button click, append search item to button list
function setCoinButton(searchBarCoin){

  const newButton = $("<button class='py-2 px-4 h-10 w-80 border-l-4 border-r-4 border-green-500 bg-black rounded-full text-white hover:bg-green-500'>").text(searchBarCoin);
  buttonList.push(searchBarCoin);

  // retrieving local storage array information
  const coinHistory = JSON.parse(window.localStorage.getItem("coin-name")) || [];

  // if local storage has the coin already, don't duplicate
  if (coinHistory.indexOf(searchBarCoin) === -1){
    coinHistory.push(searchBarCoin);
    window.localStorage.setItem("coin-name", JSON.stringify(coinHistory));
    $(buttonDump).append(newButton);
  }

}

// on initial load of page, display local storage
displayLocalButton();
function displayLocalButton(){
  const coinHistory = JSON.parse(window.localStorage.getItem("coin-name")) || [];

  for (let i = 0; i < coinHistory.length; i++){
    const newButton = $("<button class='py-2 px-4 h-10 w-80 border-l-4 border-r-4 border-green-500 bg-black rounded-full text-white space-wide-1 hover:bg-green-500'>").text(coinHistory[i]);
    $(buttonDump).append(newButton);

    $(newButton).click(function() {
      const inputSave = $(this).text();
      console.log("button click", inputSave);
      renderManyCoins(inputSave);
    });
  }
}