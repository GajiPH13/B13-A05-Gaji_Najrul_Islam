const userName = document.getElementById("inputeUserName")
const userPassword = document.getElementById("inputUserPassword")
const loginBtn = document.getElementById("btnLogin")

validUserName = "admin";
validUserPassword = "admin123";



loginBtn.addEventListener('click', function () {

    userCredential(userName, userPassword)
})

// function for user credentials
function userCredential(userName, userPassword) {
    if (userName.value == validUserName && userPassword.value == validUserPassword) {
        window.open("main.html", "_blank");
    } else {
        alert('incorect credentioa try again')
    }
}