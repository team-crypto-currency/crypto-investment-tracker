$(document).ready(function() {
  // Getting references to our form and inputs
  var signInForm = $(".sign-in");
  var usernameInput =$(".usernameInput");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");

  // When the form is submitted, we validate there's an email and password entered
  signInForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    signInUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function signInUser(email, password) {
    $.post("/api/sign-in", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/coins");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});