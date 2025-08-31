const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const passwordBtn = document.getElementById('passwordBtn');
const otpBtn = document.getElementById('otpBtn');
const loginPasswordField = document.getElementById('login-password-fields');
const loginOtpField = document.getElementById('login-otp-fields');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');

loginBtn.addEventListener('click', () => {
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
});

signupBtn.addEventListener('click', () => {
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
});

passwordBtn.addEventListener('click', () => {
    passwordBtn.classList.add('active');
    otpBtn.classList.remove('active');
    loginPasswordField.classList.add('active');
    loginOtpField.classList.remove('active');
});

otpBtn.addEventListener('click', () => {
    otpBtn.classList.add('active');
    passwordBtn.classList.remove('active');
    loginOtpField.classList.add('active');
    loginPasswordField.classList.remove('active');
});

const USERS_KEY = 'registered_users';

function saveUser(email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    users[email] = password;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function authenticateUser(email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    return users[email] === password;
}

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');

    if (users[email]) {
        alert('This email is already registered. Please log in.');
        return;
    }

    saveUser(email, password);
    alert('Registration successful! You can now log in.');
    signupForm.reset();
    
    loginBtn.click();
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const loginEmail = loginEmailInput.value;
    
    if (passwordBtn.classList.contains('active')) {
        const loginPassword = loginPasswordInput.value;
        if (authenticateUser(loginEmail, loginPassword)) {
            alert('Login successful!');
            loginForm.reset();
        } else {
            alert('Invalid email or password.');
        }
    } else {
        alert('This is a UI feature only. No OTP verification is performed.');
    }
});

