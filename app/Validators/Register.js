"use strict";

class Register {
  get rules() {
    return {
      email: "required|email|unique:users",
      password: "required|min:5",
      username: "required|unique:users",
    };
  }

  get messages() {
    return {
      "email.required": "The email field is required",
      "email.email": "Enter a valid email address",
      "email.unique": "Email already exists",
      "password.required": "The password field is required",
      "password.min": "The password field must be at least 5 characters",
      "username.required": "The username field is required",
      "username.unique": "Username already exists",
    };
  }
}

module.exports = Register;
