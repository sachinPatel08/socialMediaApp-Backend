const { User, session, Post, Followers } = require("../models");
const { validationResult } = require("express-validator");

const savefollow = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let follow;
    const followerId = req.params.id;
    const userId = req.headers.userId;

    const result = await Followers.findOne({ where: { userId, followerId } });

    if (result == null) {
      follow = await Followers.create({
        userId: userId,
        followerId: followerId,
      });
    } else {
      return next(res.json({ msg: " already followed.." }));
    }

    res.status(200).json(follow);
  } catch (error) {
    res.status(401).json({ error: { msg: "something went wrong.." } });
  }
};
const checkFollower =  async (req,res) =>{
  const UserId = req.headers.userId;
  const followed = await Followers.findAll({
    where: { UserId },
    include: [
      {
        model: User,
      },
    ],
  });
if(followed.some((followed) => followed.followerId == req.params.id)){
  res.json(true)
}else{
  res.json(false)
}


}
 
const showFollower = async (req, res, next) => {
  //     const data = User.findByPk(req.headers.userId, {
  //     include: [{
  //       model: Followers,

  //     }]
  //   },
  //   )
  const UserId = req.headers.userId;
  const followed = await Followers.findAll({
    where: { UserId },
    include: [
      {
        model: User,
      },
    ],
  });

  res.json(followed);
};

const unFollow = async (req, res, next) => {
  const UserId = req.headers.userId;

  const followed = await Followers.findAll({
    where: { UserId },
    attributes: ["followerId"],
  });

  if (followed.find((followed) => followed.followerId == req.params.id)) {
    Followers.destroy({
      where: {
        userId: req.headers.userId,
        followerId: req.params.id,
      },
    });
    return res.json({
      msg: "deleted..",
    });
  } else {
    return res.json({ msg: "not found.." });
  }

  res.json(followed);
};
module.exports = { savefollow, showFollower, unFollow, checkFollower };
