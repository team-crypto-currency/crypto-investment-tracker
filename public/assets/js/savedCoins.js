
$(saveBtn).on("click", function (event) {
  event.preventDefault();
  alert("I've been clicked!");
  // Save the coin the user searched for to our database
  const coinName = $(".coinName").val().trim();
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: coinName})
  };
  fetch("/api/coin", requestOptions)
    .then(response => response.json())
    .then(data => this.setState({ postId: data.id }));

  // If the user is not signed in, take them to the sign in page
  window.location.replace("/sign-in");
  // If the user is signed in, take them to their saved-coins page/portfolio
  renderSavedCoins();
});

// Api call to retreive all user data
fetch("/api/user")
  .then((response) => response.json())
  .then(function(data) {
    console.log(data);
    for(let i=0; i< data.length; i++) {
      console.log(data[i].id);
    }
  })
  .catch((err) => console.error(err));

// Function to render saved coins on coins page
function renderSavedCoins(coins) {
  fetch("/api/coin")
    .then((response) => response.json())
    .then(function(data) {
      console.log(data);
    })
    .catch((err) => console.error(err));

}