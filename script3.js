// Show registration form
function showRegisterForm() {
    document.getElementById("loginCard").style.display="none";
    document.getElementById("registerForm").style.display="block";
}

// Show login form
function showLoginForm() {
    document.getElementById("registerForm").style.display="none";
    document.getElementById("loginCard").style.display="block";
}

// Complete registration
function completeRegister() {
    let username = document.getElementById("regUsername").value.trim();
    let password = document.getElementById("regPassword").value.trim();
    let fullName = document.getElementById("fullName").value.trim();
    let address = document.getElementById("address").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let email = document.getElementById("email").value.trim();

    if(!username || !password || !fullName || !address || !mobile || !email){
        document.getElementById("regMessage").innerText="All fields are required!";
        return;
    }

    if(localStorage.getItem(username)){
        document.getElementById("regMessage").innerText="Username already exists!";
        return;
    }

    let userData = {password, fullName, address, mobile, email};
    localStorage.setItem(username, JSON.stringify(userData));

    alert("Registration successful! Please login.");
    showLoginForm();
}

// Login
function login() {
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let userData = JSON.parse(localStorage.getItem(username));
    if(userData && userData.password === password){
        document.getElementById("loginCard").style.display="none";
        document.getElementById("registerForm").style.display="none";
        document.getElementById("dashboard").style.display="block";
        document.getElementById("welcomeMsg").innerText=`Welcome ${userData.fullName}!`;
    } else {
        document.getElementById("loginMessage").innerText="Invalid username or password!";
    }
}

// Logout
function logout(){
    document.getElementById("dashboard").style.display="none";
    document.getElementById("loginCard").style.display="block";
    document.getElementById("loginUsername").value="";
    document.getElementById("loginPassword").value="";
}
