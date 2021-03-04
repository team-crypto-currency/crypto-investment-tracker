renderSavedCoins();

// Api call to retreive all user data
// fetch("/api/user")
//   .then((response) => response.json())
//   .then(function(data) {
//     console.log(data);
//     for(let i=0; i< data.length; i++) {
//       console.log(data[i].id);
//     }
//   })
//   .catch((err) => console.error(err));

// Function to render saved coins on coins page
function renderSavedCoins(coins) {
  fetch("/api/coin")
    .then((response) => response.json())
    .then(function(data) {
      console.log(data);
    })
    .catch((err) => console.error(err));
}