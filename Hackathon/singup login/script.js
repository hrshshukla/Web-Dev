function showForm(form) {
    document.getElementById('login').classList.remove('active');
    document.getElementById('signup').classList.remove('active');
    document.getElementById(form).classList.add('active');

    document.getElementById('login-btn').classList.remove('active');
    document.getElementById('signup-btn').classList.remove('active');
    document.getElementById(form + '-btn').classList.add('active');

    document.getElementById('form-title').innerText = form === 'login' ? 'Login Form' : 'Signup Form';
}

function validateSignup() {
    const emailInput = document.getElementById('signup-email');
    const emailError = document.getElementById('email-error');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value)) {
        emailError.style.display = 'block';
    } else {
        emailError.style.display = 'none';
        showSuccessPopup();
    }
}

function showSuccessPopup() {
    const popup = document.getElementById('success-popup');
    popup.style.display = 'flex';
    popup.style.top = '20px';
    setTimeout(() => {
        popup.style.top = '-50px';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    }, 1000);
}