document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const themeToggle = document.getElementById('themeToggle');
    const resetFormBtn = document.getElementById('resetForm');
    
    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const passwordStrength = document.getElementById('passwordStrength');
    
    // Input elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Track if form has been attempted to submit
    let formSubmitted = false;
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Real-time validation for name (only show errors after form submission attempt)
    nameInput.addEventListener('blur', function() {
        if (formSubmitted) {
            validateName();
        }
    });
    
    // Real-time validation for email (only show errors after form submission attempt)
    emailInput.addEventListener('blur', function() {
        if (formSubmitted) {
            validateEmail();
        }
    });
    
    // Real-time password strength and validation (only show errors after form submission attempt)
    passwordInput.addEventListener('input', function() {
        updatePasswordStrength();
        if (formSubmitted) {
            validatePassword();
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Set form as submitted to show errors
        formSubmitted = true;
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            // Hide form and show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // In a real application, you would send the data to a server here
            console.log('Form submitted successfully!');
            console.log('Name:', nameInput.value);
            console.log('Email:', emailInput.value);
            console.log('Password:', passwordInput.value);
        }
    });
    
    // Reset form functionality
    resetFormBtn.addEventListener('click', function() {
        form.reset();
        form.style.display = 'block';
        successMessage.style.display = 'none';
        formSubmitted = false;
        
        // Reset error messages
        nameError.classList.remove('show');
        emailError.classList.remove('show');
        passwordError.classList.remove('show');
        passwordStrength.className = 'password-strength-bar';
    });
    
    // Validation functions
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.classList.add('show');
            return false;
        } else {
            nameError.classList.remove('show');
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.classList.add('show');
            return false;
        } else {
            emailError.classList.remove('show');
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasMinLength = password.length >= 8;
        
        if (!hasMinLength || !hasUpperCase || !hasNumber) {
            passwordError.classList.add('show');
            return false;
        } else {
            passwordError.classList.remove('show');
            return true;
        }
    }
    
    function updatePasswordStrength() {
        const password = passwordInput.value;
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        // Reset classes
        passwordStrength.className = 'password-strength-bar';
        
        // Apply appropriate class based on strength
        if (password.length === 0) {
            passwordStrength.style.width = '0%';
        } else if (strength <= 1) {
            passwordStrength.classList.add('strength-weak');
        } else if (strength <= 3) {
            passwordStrength.classList.add('strength-medium');
        } else {
            passwordStrength.classList.add('strength-strong');
        }
    }
    
    // Initialize - hide all error messages
    nameError.classList.remove('show');
    emailError.classList.remove('show');
    passwordError.classList.remove('show');
});
