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

        console.log(response);
    });