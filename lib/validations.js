export const validatePassword = (value) => {
    const minLength = 8;
    // const hasUpperCase = /[A-Z]/.test(value);
    // const hasLowerCase = /[a-z]/.test(value);
    // const hasNumber = /\d/.test(value);
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (value.length < minLength) {
        return { valid: false, message: `Password must be at least ${minLength} characters long.` };
    }
    // if (!hasUpperCase) {
    //     return { valid: false, message: 'Password must contain at least one uppercase letter.' };
    // }
    // if (!hasLowerCase) {
    //     return { valid: false, message: 'Password must contain at least one lowercase letter.' };
    // }
    // if (!hasNumber) {
    //     return { valid: false, message: 'Password must contain at least one number.' };
    // }
    // if (!hasSpecialChar) {
    //     return { valid: false, message: 'Password must contain at least one special character.' };
    // }

    return { valid: true, message: 'Password is valid.' };
};