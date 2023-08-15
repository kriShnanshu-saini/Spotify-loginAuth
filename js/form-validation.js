const form = document.querySelector("[data-logIn-form]");
const emailUsernameInput = document.querySelector("#email-username");
const passwordInput = document.querySelector("#password");

const logInBtn = document.querySelector("[data-log-in]");

form.addEventListener("submit", (e) => {
    validateInputs();

    // if any input has error => prevent submitting
    if (
        Array.from(form.querySelectorAll("input")).find((input) =>
            input.parentElement.classList.contains("error")
        )
    ) {
        e.preventDefault();
    }
});

// does the email satisfies the conditions for being a valid email
const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-z]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
};

// showing corresponding error message and error-effect
const setError = (element, message) => {
    const formControl = element.parentElement;
    const errorDisplay = formControl.querySelector(".error-msg span");
    errorDisplay.textContent = message;
    formControl.classList.add("error");
    form.parentElement.querySelector('.error-display').classList.remove('hide');
};

// resetting the error-effects
const setSuccess = (element) => {
    const formControl = element.parentElement;
    formControl.classList.remove("error");
    form.parentElement.querySelector('.error-display').classList.add('hide');
}

// check if the inputs are valid or not
const validateInputs = () => {
    // if inputValue contains'@' => it's an email
    // else it's username
    const email = emailUsernameInput.value.includes("@")
        ? emailUsernameInput.value.trim()
        : undefined;
    const username = email ? undefined : emailUsernameInput.value.trim();
    const password = passwordInput.value.trim();

    // if user inputs username and it is ''
    if (username && username === "") {
        setError(emailUsernameInput, "invalid username");
    } else {
        setSuccess(emailUsernameInput);
    }

    // if username is undefined => user input's email
    if (!username) {
        // if email is empty
        if (email === "") {
            setError(emailUsernameInput, "email cannot be empty");
        } 
        // if email is defined and is invalid
        else if (email && !isValidEmail(email)) {
            setError(emailUsernameInput, "Please enter valid email address");
        } else {
            setSuccess(emailUsernameInput);
        }
    }

    // if password is empty
    if (password === "") {
        setError(passwordInput, "Password is required.");
    } else{
        setSuccess(passwordInput);
    }
};