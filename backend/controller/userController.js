const userService = require("../service/userService");
const { getUserByEmail } = require("../service/userService");

const addUser = (req, res) => {
    // Todo : saves user information to supabase
    // Getting Email and Password from Sign Up Button
    const user = req.body;
  
    userService.createUser(user);

    return res.status(200).json({
      message: "Users added successfully",
      success: true,
    });
  };

  async function getUser(req, res) {
    const email = req.body;
  
    var value = await getUserByEmail(email);
  
    if (value == "Invalid email or password") {
      return res.status(200).json({
        message: value,
      });
    } else {
      return res.status(200).json({
        message: value,
        success: true,
      });
    }
  }

  module.exports = {addUser, getUser}