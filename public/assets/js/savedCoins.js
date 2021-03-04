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
// let coins = [];
function renderSavedCoins(coin) {
  fetch("/api/coins")
    .then((response) => response.json())
    .then(function(data) {
      console.log(data);
      for(i=0;i<data.length;i++){
        // coins.push(data[i].name);
      }
    })
    .catch((err) => console.error(err));
}


