// firebaseConfig.auth().onAuthStateChanged((user) => {
//     if (!user) {
//         location.replace("index.html");
//     }
// });

// TODO: show-hide password
// TODO:  date-of-birth error msgs show

const formEl = document.querySelector("[data-sign-up-form]");
const emailInput = formEl.querySelector("#email");
const passwordInput = formEl.querySelector("#password");
const inputs = formEl.querySelectorAll("input");
console.log(inputs);

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
});

// functions =================================
function validateInputs(input) {
    switch (input.type) {
        case "password":
            if (input.value.length < 8) {
                setError(input, "Password must contain 8 characters.");
                return;
            } else {
                const regEx = /^[a-zA-Z0-9._@$#]/;
                // const regEx = /^[a-zA-Z0-9]$/;
                // alert(input.value);
                // alert(regEx.test(String(input.value)));
                if (regEx.test(String(input.value))) {
                    setSuccess(input);
                } else {
                    setError(
                        input,
                        "Password should contain a-z, A-Z, 0-9, Special symbols(., _, $, @, #)"
                    );
                }
            }
            break;

        case "text":
            if (input.id === "email") {
                const re = /^[a-zA-Z0-9._%+-]+@[a-z]+\.[a-zA-Z]{2,}$/;
                if (re.test(String(input.value).toLowerCase())) {
                    setSuccess(input);
                } else {
                    setError(input, "Enter a valid email address.");
                }
            } else {
                const textRegEx = /^[a-zA-Z]/;
                if (textRegEx.test(input.value)) setSuccess(input);
                else
                    setError(
                        input,
                        "Name can contain only alphabets (a-z, A-Z)"
                    );
            }
            break;

        // for number type: if it is empty then if part of event listener will be executed. value here can only be null so that case is handled there only
    }
}

function setError(input, msg) {
    input.closest("div.form-control").classList.add("error");
    input
        .closest("div.form-control")
        .querySelector(".error-msg span").textContent = msg;
}

function setSuccess(input) {
    input.closest("div.form-control").classList.remove("error");
}
// ===========================================

// validating inputs =========================
inputs.forEach((input) => {
    console.log(input.value);

    // when input is not in focus => if value of input is null show error
    // else validate input
    input.addEventListener("blur", () => {
        const parentEl = input.closest(".form-control");
        if (input.value === "" || input.value === null) {
            // handling the date and year inputs from date-of-birth section
            if (input.type === "number") {
                // getting class of the parent div
                const parentClass = input.closest("div").getAttribute("class");

                if (
                    input.id === "year-val" &&
                    input.value !== "" &&
                    input.value.length !== "4"
                ) {
                    parentEl.querySelector(
                        `[data-${parentClass}-error] span`
                    ).textContent = "Year should be of 4 digits.";
                }
                // selecting the error-msg corresponding to the parent div class name
                parentEl.querySelector(
                    `[data-${parentClass}-error]`
                ).style.display = "flex";
            } else {
                parentEl.classList.add("error");
            }
        } else {
            if(input.type === 'number' && 
            (input.value < input.getAttribute('min') || 
            input.value > input.getAttribute('max'))){
                parentEl.querySelector(
                    `[data-${parentClass}-error]`
                ).style.display = "flex";
            }
            if (input.type === "number") {
                const parentClass = input.closest("div").getAttribute("class");
                parentEl.querySelector(
                    `[data-${parentClass}-error]`
                ).style.display = "none";
            }
            validateInputs(input);
        }
    });
});

formEl.querySelector("select#month-val").addEventListener("blur", () => {
    const selectEl = formEl.querySelector("select#month-val");
    const parentClass = selectEl.closest("div").getAttribute("class");
    if (selectEl.value <= 0) {
        formEl.querySelector(`[data-${parentClass}-error]`).style.display =
            "flex";
    } else {
        formEl.querySelector(`[data-${parentClass}-error]`).style.display =
            "none";
    }
});
// ===========================================
