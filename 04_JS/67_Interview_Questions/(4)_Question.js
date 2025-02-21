// 4. The Password Validator: You are building a password validation feature. 
//    Create a function that checks if a given password meets the following criteria:
//     -- at least 8 characters long
//     -- contains both uppercase and lowercase letters 
//     -- includes at least one digit.

let userPass = "HH095HaH"

// Solution (1)
function passwordValidator(password) {
    password.length >= 8 &&
    password.match(/[0-9]+/g) &&
    password.match(/[A-Z]+/g) &&
    password.match(/[a-z]+/g) ? console.log("Password is valid") : console.log("Password is invalid")
}

// Solution (2)
function passVaildator(password) {
    const hasMinilength = password.length >= 8
    hasNumber = /[0-9]/.test(password)
    hasLowerCase = /[a-z]/.test(password)
    hasUpperCase = /[A-Z]/.test(password)

    hasNumber && hasLowerCase && hasUpperCase ? 
    console.log("Password is valid") : console.log("Password is invalid")
}

passVaildator(userPass)

