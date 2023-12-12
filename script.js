const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");

    const signUpForm = document.querySelector(".sign-up-form");
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = signUpForm.querySelector('input[type="text"]').value;
        const email = signUpForm.querySelector('input[type="email"]').value;
        const password = signUpForm.querySelector('input[type="password"]').value;

        saveUser({ username, email, password });
    });
});

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");

    const signInForm = document.querySelector(".sign-in-form");
    signInForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = signInForm.querySelector('input[type="text"]').value;
        const password = signInForm.querySelector('input[type="password"]').value;

        const isAuthenticated = authenticateUser({ username, password });

        if (isAuthenticated) {
            console.log("User authenticated!");
            location.replace('home.html');

        } else {
            console.log("Authentication failed. Invalid username or password.");
        }
    });
});


function saveUser(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function authenticateUser(credentials) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(user => user.username === credentials.username && user.password === credentials.password);
    return !!foundUser;
}
