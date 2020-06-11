"use strict";
const User = use("App/Models/User");

class LoginController {
  async store({ request, auth, response }) {
    let { email, password } = request.all();

    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy("email", email);
        let token = await auth.generate(user);

        Object.assign(user, token);
        delete user["$attributes"].password;
        delete user["$attributes"].created_at;
        delete user["$attributes"].updated_at;
        return response.status(200).json(user);
      }
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
