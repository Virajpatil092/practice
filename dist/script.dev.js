"use strict";

var sign_in_btn = document.querySelector("#sign-in-btn");
var sign_up_btn = document.querySelector("#sign-up-btn");
var container = document.querySelector(".container");
sign_up_btn.addEventListener('click', function () {
  container.classList.add("sign-up-mode");
  var signUpForm = document.querySelector(".sign-up-form");
  signUpForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var username = signUpForm.querySelector('input[type="text"]').value;
    var email = signUpForm.querySelector('input[type="email"]').value;
    var password = signUpForm.querySelector('input[type="password"]').value;
    saveUser({
      username: username,
      email: email,
      password: password
    });
  });
});
sign_in_btn.addEventListener('click', function () {
  container.classList.remove("sign-up-mode");
  var signInForm = document.querySelector(".sign-in-form");
  signInForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var username = signInForm.querySelector('input[type="text"]').value;
    var password = signInForm.querySelector('input[type="password"]').value;
    var isAuthenticated = authenticateUser({
      username: username,
      password: password
    });

    if (isAuthenticated) {
      console.log("User authenticated!");
      location.replace('home.html');
    } else {
      console.log("Authentication failed. Invalid username or password.");
    }
  });
});

function saveUser(user) {
  var users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

function authenticateUser(credentials) {
  var users = JSON.parse(localStorage.getItem('users')) || [];
  var foundUser = users.find(function (user) {
    return user.username === credentials.username && user.password === credentials.password;
  });
  return !!foundUser;
}