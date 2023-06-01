const { createClient } = require("@supabase/supabase-js");
const { User } = require("../models/userModel")
var bcrypt = require('bcrypt')

require("dotenv").config();

const supabase = createClient(
  process.env.DATABASE_URL,
  process.env.DATABASE_KEY
);

const createUser = async (User) => {

  var salt = bcrypt.genSaltSync(10)
  var encryptedPassword = bcrypt.hashSync(User.password, salt)

  const { data, error } = await supabase
    .from("Users").insert([{
      name: User.name, email: User.email, password: encryptedPassword,
      answerOne: User.answerOne, answerTwo: User.answerTwo
    }])


  if (error) {
    if (error.code == '23505') {
      return 'Usuário já registrado';
    } else {
      throw new error;
    }
  } else {
    return data;
  }
}

  async function getUserByEmail(user) {
    const { data, error } = await supabase
      .from("Users")
      .select("name")
      .eq('email', user.email)

    if (error) {
      console.log(error);
      return error;
    } else if (data.length === 0) {
      return "Invalid email or password";
    } else {
      return data;
    }
  }

  module.exports = { createUser, getUserByEmail };