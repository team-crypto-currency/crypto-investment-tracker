// Create an ajax call with jQuery to test apis 
    // Taapi.io for indicators


// Successful api call for coins/prices! with coin-ranking api (See console in browser)
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://coinranking1.p.rapidapi.com/coins",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "198c5d9404msh8afbdbe95aa7f12p115299jsn1d3f7e17a3ea",
            "x-rapidapi-host": "coinranking1.p.rapidapi.com"
        }
    };
    $.ajax(settings).done(function (response) {

        console.log("ajax1:", response);
    });


    const settings2 = {
        "async": true,
        "crossDomain": true,
        "url": "https://coinranking1.p.rapidapi.com/coins",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "198c5d9404msh8afbdbe95aa7f12p115299jsn1d3f7e17a3ea",
            "x-rapidapi-host": "coinranking1.p.rapidapi.com"
        }
    };

    // const settings3 = {
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

    searchBtn.click(function(){
        const searchedCoin = $(searchBox).val();
        renderManyCoins(searchedCoin)
    });
    
    
    let thisCoin;
    function renderManyCoins(searchedCoin) { 
        coinDetails.empty();
        $.ajax(settings2).then(function(response) {

            for(let i=0;i<response.data.coins.length;i++) {
                // console.log(coin)
                if (searchedCoin === response.data.coins[i].name){
                    console.log(response.data.coins[i].name)
                    thisCoin = response.data.coins[i];
                    console.log(thisCoin)
                }
            };

            
            const coinName = thisCoin.name;

            const coinPriceToInt = parseFloat(thisCoin.price).toFixed(2);

            const changeVar = thisCoin.change;

            const highestVar = thisCoin.allTimeHigh.timestamp;

            const highPriceToInt = parseFloat(thisCoin.allTimeHigh.price).toFixed(2);
            const currentPrice = $("<p>").text(`Current Price: $${coinPriceToInt}`);

            const change = $("<p>").text(`Change: ${changeVar}`);

            const highMarkTime = `Hit on: ${moment(highestVar).format("MM/DD/YYYY")}`

            const highMark = $("<p>").text(`All Time High: $${highPriceToInt} ${highMarkTime}`);

            // const oneMonth = $("<p>").text(`Price One Month Ago: $${monthPrice}`);

            

            
            $(coinSearch).text(`${coinName} (${currentDate})`);
            $(coinDetails).append(currentPrice, change, highMark);
        

        // const monthPrice = parseFloat(response.data.coins[0].allTimeHigh.price).toFixed(2);

        // const yearPrice;

      });
    
    }



    
    function renderSingleCoin(coinName, coinID) {

        if (searchedCoin === coinName) {
            
        }
        $.ajax(settings2).then(function(response) {

        });
    }

    // search coin
    // find in ajax call 1
    // run ajax call 2 with id from ajax 1