export const signupValidation = (name, email, password) => {
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*@)[A-Za-z\d@]{6,}$/;

    // Normalize input
    name = name?.trim().replace(/\s+/g, " ") || "";
    email = email?.trim() || "";
    password = password?.trim() || "";

    // Name validation
    if (!name) {
        return {
            success: false,
            errorType: "Validation Error",
            message: "Name is required.",
        };
    }

    if (name.length < 3) {
        return {
            success: false,
            errorType: "Validation Error",
            message: "Name must be at least 3 characters long.",
        };
    }

    if (name.length > 30) {
        return {
            success: false,
            errorType: "Validation Error",
            message: "Name cannot exceed 30 characters.",
        };
    }

    if (!nameRegex.test(name)) {
        return {
            success: false,
            errorType: "Validation Error",
            message: "Name can only contain letters with single spaces between words.",
        };
    }

    // Email validation
    if (!email) {
        return {
            success: false,
            errorType: "Validation Error",
            message: "Email is required.",
        };
    }
    if (!emailRegex.test(email)) {
        return {
            success: false,
            errorType: "Validation Error",
            message: "Please enter a valid email address.",
        };
    }

    // Password validation
    if (!password) {
        return {
            success: false,
            errorType: "Validation Error",
            message: "Password is required.",
        };
    }

    if (password.length < 6) {
        return {
            success: false,
            errorType: "Validation Error",
            message: "Password must be at least 6 characters long.",
        };
    }

    if (password.length > 20) {
        return {
            success: false,
            errorType: "Validation Error",
            message: "Password cannot exceed 20 characters.",
        };
    }

    if (!passwordRegex.test(password)) {
        return {
            success: false,
            errorType: "Validation Error",
            message: "Password must include an uppercase, lowercase, number, and '@'.",
        };
    }


    return {
        success: true,
        data: { name, email, password },
    };
};
