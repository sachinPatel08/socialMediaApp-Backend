// const { json } = require('body-parser');
const { User, session } = require("../models");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userName, email, password } = req.body;

  try {
    let userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
      return next(res.json({ message: "this user already exist.." }));
    }

    const data = await User.create({
      userName: userName,
      email: email,
      password: password,
    });

    res.status(200).json(data);
  } catch (error) {
    return next(res.json(error));
  }
};

// const show = async (req, res) => {
//   const data = await User.findAll();
//   res.json(data);
// };
const showById = async (req, res) => {
  const data = await User.findOne({
    where: {
      // id: req.headers.userId,
      id: req.params.id,
    }
    // attributes: ["UserName", "email", "createdAt", "updatedAt"],
  });
  // const data = await User.findAll({include: [{model:session}] })

  try {
    await res.json(data);
  } catch (error) {
    res.send(error);
  }
};

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userName, password, email } = req.body;

  const data = await User.findOne({
    where: {
      id: req.headers.userId,
    },
  });
  await data.set({
    userName: userName,
    email: email,
    password: password,
  });

  try {
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.json(error);
  }
};
const delet = async (req, res) => {
  User.destroy({
    where: {
      id: req.headers.userId,
    },
  });

  res.json({
    message: "delete..",
  });
};

const login = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({
      where: { email: req.body.email },
    });
    if (user === null) {
      return next(
        res.status(404).json({
          message: "user not found.",
        })
      );
    }
    if (user.password !== req.body.password) {
      return next(
        res.status(401).json({
          message: "invalid User..",
        })
      );
    }
    // delete user.dataValues.password;
    user = user.toJSON();
    delete user.password;
    let token = jwt.sign({ userId: user.id }, process.env.Token_Secret, {
      expiresIn: "5h",
    });
    await session.create({
      token: token,
      userId: user.id,
    });
    // let tokens = await models.Session.findAll();
    user.token = token;
    user.userId = user.id;
    res.status(200).json(user);
  } catch (e) {
    return next(
      res.status(500).json({
        message: "something went wrong..",
      })
    );
  } 
};

const  logout = async (req, res, next) => {
  try {
    await session.destroy({
      where: { token: req.headers["token"] },
    });
    res.status(200).json({ message: "Logout successfully." });
  } catch (e) {
    return next(
      res.status(500).json({
        message: "something went wrong..",
      })
    );
  }
};

const getUser = async (req,res)=>{
const data = await User.findOne({where:{
  "id":req.headers.userId
}})
res.json(data)
}
module.exports = { register, showById, update, delet, login, logout ,getUser};
