// Create an ajax call with jQuery to test apis 
    // Taapi.io for indicators


// Successful api call for coins/prices! with coin-ranking api (See console in browser)
const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://coinranking1.p.rapidapi.com/coins/",
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "198c5d9404msh8afbdbe95aa7f12p115299jsn1d3f7e17a3ea",
        "x-rapidapi-host": "coinranking1.p.rapidapi.com"
    }
};
$.ajax(settings).done(function (response) {

    console.log("ajax1:", response);
});


// const settings2 = {
//     "async": true,
//     "crossDomain": true,
//     "url": `https://coinranking1.p.rapidapi.com/coin/${coinID}`,
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-key": "198c5d9404msh8afbdbe95aa7f12p115299jsn1d3f7e17a3ea",
//         "x-rapidapi-host": "coinranking1.p.rapidapi.com"
//     }
// };
// $.ajax(settings2).done(function (response) {

//     console.log("ajax2:", response);
// });


const searchBtn = $(".searchBtn");
const searchBox = $(".searchFld");
const coinSearch = $(".currentSrch");
const coinDetails = $(".coinDetail");
const currentDate = (moment().format("M/D/YY"));
const saveBtn = $("<button>").text("Save Coin").addClass("save-btn");

searchBtn.click(function(){
    const searchedCoin = $(searchBox).val();
    renderManyCoins(searchedCoin)
});


let thisCoin;
function renderManyCoins(searchedCoin) { 
    coinDetails.empty();
    $.ajax(settings).then(function(response) {

        for(let i=0;i<response.data.coins.length;i++) {
            // console.log(coin)
            if (searchedCoin === response.data.coins[i].name){
                console.log("user search name match: ", response.data.coins[i].name)
                thisCoin = response.data.coins[i];
                console.log("this coin: ", thisCoin)
            }
        };

        
        const coinName = thisCoin.name;

        const coinABRV = thisCoin.symbol;

        const coinPriceToInt = parseFloat(thisCoin.price).toFixed(2);

        const changeVar = thisCoin.change;

        const highestVar = thisCoin.allTimeHigh.timestamp;

        const highPriceToInt = parseFloat(thisCoin.allTimeHigh.price).toFixed(2);
        const currentPrice = $("<p>").text(`Current Price: $${coinPriceToInt}`);

        const change = $("<p>").text(`Change: ${changeVar}`);

        const highMarkTime = `Hit on: ${moment(highestVar).format("MM/DD/YYYY")}`

        const highMark = $("<p>").text(`All Time High: $${highPriceToInt} ${highMarkTime}`);



        $(coinSearch).text(`${coinName} (${currentDate})`);
        $(coinDetails).append(currentPrice, change, highMark, saveBtn);

        renderMACD(coinABRV);

  });

}

$(saveBtn).on("click", function(event) {
    event.preventDefault();
    alert("I've been clicked!");
    // If the user is not signed in, take them to the sign in page
    window.location.replace("/sign-in");
    // If the user is signed in, take them to their saved-coins page/portfolio
});

$(".signup").on("click", async function(event) {
    event.preventDefault();
     let userInput = $('.user-input').val().trim();
    const response = await fetch("/api/user", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({username: `${userInput}`}) 
    });
    console.log(response)
})






function renderMACD(coin){
    console.log("abrev: ", coin);

    const settings3 = {
        "async": true,
        "crossDomain": true,
        "url": `/api/coin/${coin}`,
        "method": "GET",
    };
    $.ajax(settings3).done(function (response) {

        console.log("MACD:", response);
        
    });

}

