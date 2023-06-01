const userService = require("../service/userService");
const { getUserByEmail } = require("../service/userService");
const statusCode = require('../helpers/statusCode');

async function addUser(req, res) {
  const user = req.body;

  try{
    var value = await userService.createUser(user);

    if(value == 'Usuário já registrado'){
      return res.status(statusCode.ALREADY_EXISTS).json({ message: 'USUÁRIO JÁ REGISTRADO' });
    }

    res.status(statusCode.CREATED).json({ value });
  } catch (e) {

    res.status(e.status || 500).json({ message: e.message });
  }
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

module.exports = { addUser, getUser }