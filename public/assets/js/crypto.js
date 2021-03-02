// Successful api call for coins/prices! with coin-ranking api (See console in browser)
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

// Successful api call for coins/prices! with coin-ranking api (See console in browser)
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
    const changeVar = thisCoin.change;
    const highestVar = thisCoin.allTimeHigh.timestamp;
    const highPriceToInt = parseFloat(thisCoin.allTimeHigh.price).toFixed(2);
    const currentPrice = $("<p>").text(`Current Price: $${coinPriceToInt}`);
    const change = $("<p>").text(`Change: ${changeVar}`);
    const highMarkTime = `Hit on: ${moment(highestVar).format("MM/DD/YYYY")}`;
    const highMark = $("<p>").text(`All Time High: $${highPriceToInt} ${highMarkTime}`);

    $(coinSearch).text(`${coinName} (${currentDate})`);
    $(coinDetails).append(currentPrice, change, highMark, saveBtn);

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


$(saveBtn).on("click", function (event) {
  event.preventDefault();
  alert("I've been clicked!");
  // Save the coin the user searched for
  const coinName = $(".coinName").val().trim();
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: coinName, UserId: 1 })
  };
  fetch("/api/coin", requestOptions)
    .then(response => response.json())
    .then(data => this.setState({ postId: data.id }));
  // If the user is not signed in, take them to the sign in page
  window.location.replace("/sign-in");
  // If the user is signed in, take them to their saved-coins page/portfolio
});



// const userInput = $("#userInput").val().trim();
$(".sign-in").on("click", async function () {
  // search through the database and compare what the user entered to the usernames in the database
  // Once we find their username, pull all of the saved coins for that User
  // Display all saved coins on /coins route page
  const userInput = $("#userInput").val().trim();
  fetch("/api/user")
    .then((response) => response.json())
    .then(function(data) {
      console.log(data);
      for(let i=0; i< data.length; i++) {
        if(data[i].username === userInput) {
          console.log(data[i].Coins);
        }
      }
    })
    .catch((err) => console.error(err));
});


// Lets the user sign-out
$.get("/api/user_data").then(function(data) {
  $(".member-name").text(data.email);
});
