var username = document.querySelector(".input--username");
var email = document.querySelector(".input--email");
var password = document.querySelector(".input--password");
var password2 = document.querySelector(".input--password2");
var usernameErrMsg = document.querySelector(".error-msg--username");
var emailErrMsg = document.querySelector(".error-msg--email");
var passwordErrMsg = document.querySelector(".error-msg--password");
var password2ErrMsg = document.querySelector(".error-msg--password2");
var button = document.querySelector(".bttn");
var lowerVal = document.querySelector("#lower-val");
var upperVal = document.querySelector("#upper-val");
var numVal = document.querySelector("#num-val");
var specialVal = document.querySelector("#special-val");
var lengthVal = document.querySelector("#length-val");
var lowerSp = document.querySelector("#lower-sp");
var upperSp = document.querySelector("#upper-sp");
var numSp = document.querySelector("#num-sp");
var specialSp = document.querySelector("#special-sp");
var lengthSp = document.querySelector("#length-sp");
var valDiv = document.querySelector(".container--password-val");

//function: add the .error class to the selected input and .errorVis class to its corresponding small tag
function error(input, msg, text) {
  input.classList.remove("success");
  input.classList.add("error");
  msg.classList.add("errorVis");
  msg.textContent = text;
}

//function: add the .success class to the selected input and remove the .errorVis class from its corresponding small tag
function success(input, msg) {
  input.classList.remove("error");
  input.classList.add("success");
  msg.classList.remove("errorVis");
}

//function: check the username for length between 3-15 characters
function checkUsername(input, msg) {
  if (input.value === "") {
    error(input, msg, "This Field is required");
  } else if (input.value.length > 15) {
    error(input, msg, "The username must be 10 characters or shorter");
  } else if (input.value.length < 3) {
    error(input, msg, "The username must be 3 characters or longer");
  } else {
    success(input, msg);
  }
}

//function: check if the email is a valid email
function checkEmail(input, msg) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (input.value === "") {
    error(input, msg, "This field is required");
  } else if (re.test(email.value.toLowerCase())) {
    success(input, msg);
  } else {
    error(input, msg, "Invalid email address");
  }
}

//function: check if the password fits the specified requirements
function checkPassword(input, msg) {
  var re = new RegExp(
    "^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[.!/{}()\"'?@#$%^&*])"
  );

  if (input.value === "") {
    error(input, msg, "This field is required");
  } else if (!re.test(input.value)) {
    error(input, msg, "Password does not meet specified requirements");
  } else {
    success(input, msg);
  }
}

//function: check if the passwords match
function passwordMatch(input, input2, msg) {
  if (input2.value === "") {
    error(input2, msg, "This feild is required");
  } else if (input.value !== input2.value) {
    error(input2, msg, "Passwords don't match");
  } else {
    success(input2, msg);
  }
}

//function: check all inputs at once
function checkAllInputs() {
  checkUsername(username, usernameErrMsg);
  checkEmail(email, emailErrMsg);
  checkPassword(password, passwordErrMsg);
  passwordMatch(password, password2, password2ErrMsg);
}

//function: Make password validation div visible and make the password error message not visible
function showDiv() {
  valDiv.classList.add("show");
  valDiv.classList.remove("hide");
  passwordErrMsg.classList.add("hide");
  passwordErrMsg.classList.remove("show");
}

//function:  Make password validation div not visible and make the password error message visible
function hideDiv() {
  valDiv.classList.add("hide");
  valDiv.classList.remove("show");
  passwordErrMsg.classList.add("show");
  passwordErrMsg.classList.remove("hide");
}

//function that will add the .notValid class to the specified paragraph and will add an X icon to the specified span
function notValid(p, sp) {
  p.classList.add("notValid");
  sp.classList.add("fa-times");
  sp.classList.remove("fa-check");
  p.classList.remove("valid");
}

//function:add the .notValid class to the specified paragraph and will add a check mark to the correspoding span
function valid(p, sp) {
  p.classList.add("valid");
  sp.classList.add("fa-check");
  sp.classList.remove("fa-times");
  p.classList.remove("notValid");
}

//function: check each validation statement for the password to determine if it is valid or not and stle them accordingly
function val(stat, input1, input2) {
  if (stat) {
    notValid(input1, input2);
  } else {
    valid(input1, input2);
  }
}

//function: check if the  password is valid
function passwordVal(input) {
  var hasNumber = new RegExp("^(?=.*[0-9])");
  var hasUpper = new RegExp("^(?=.*[A-Z])");
  var hasLower = new RegExp("^(?=.*[a-z])");
  var hasSymbol = new RegExp("^(?=.*[.!/{}()\"'?@#$%^&*])");

  val(input.value.length < 8 || input.value.length > 20, lengthVal, lengthSp);
  val(!hasNumber.test(input.value), numVal, numSp);
  val(!hasUpper.test(input.value), upperVal, upperSp);
  val(!hasLower.test(input.value), lowerVal, lowerSp);
  val(!hasSymbol.test(input.value), specialVal, specialSp);
}

//event listener: check the password on every key up to verify its validation for each validating statement
password.addEventListener("keyup", () => {
  passwordVal(password);
});

//event listener: when password is in focus change the display of the validation div to block
password.addEventListener("focus", () => {
  showDiv();
});

// event listener: when password is not focus change the display of the validation div to none
password.addEventListener("blur", () => {
  hideDiv();
});

//event listener: when the button is clicked, check each input for validity
button.addEventListener("click", () => {
  checkAllInputs();
});
