renderSavedCoins();

// Function to render saved coins on coins page
// let coins = [];
function renderSavedCoins(coins) {
  fetch("/api/coins")
    .then((response) => response.json())
    .then(function(data) {
      console.log(data);
    })
    .catch((err) => console.error(err));
}


