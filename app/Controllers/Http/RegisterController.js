"use strict";
const User = use("App/Models/User");

class RegisterController {
  async store({ request, auth, response }) {
    try {
      // creatign a new user
      let user = await User.create(request.all());
      let token = await auth.generate(user);
      Object.assign(user, token);
      delete user["$attributes"].password;
      delete user["$attributes"].created_at;
      delete user["$attributes"].updated_at;
      return response.status(201).json({
        message: "User created.",
        user,
      });
    } catch (err) {
      console.log(err);
      return response.status(err.status).json({
        message: "Something went wrong.",
        error: err.message,
      });
    }
  }
}

module.exports = RegisterController;
