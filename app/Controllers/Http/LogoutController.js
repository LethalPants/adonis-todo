"use strict";
const User = use("App/Models/User");

class LoginController {
  async store({ request, auth, response }) {
    let { email, password } = request.all();

    try {
      await auth.authenticator("jwt").revokeTokens();
      return response.status(200).json({
        message: "Logged out successfully",
      });
    } catch (e) {
      console.log(e);
      return response.status(e.status).json({
        message: "Something went wrong.",
        error: e.message,
      });
    }
  }
}

module.exports = LoginController;
