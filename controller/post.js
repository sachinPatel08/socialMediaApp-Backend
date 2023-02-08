const { Post, User } = require("../models");
const { validationResult } = require("express-validator");

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content } = req.body;

  const data = await Post.create({
    title: title,
    content: content,
    userId: req.headers.userId,
  });

  try {
    await res.json(data);
  } catch (error) {
    return next(res.send(error));
  }
};
const showPost = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["title", "content", "id"],
      include: [{ model: User, attributes: ["userName", "id"] }],
    });
      
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
const postById = async (req, res) => {
  // const data = await User.findByPk(req.headers.userId, {

  const data = await Post.findAll({
    where: {
      userId: req.headers.userId,
    },
    include: [
      {
        model: User,
      },
    ],
  });

  res.json(data);
};
// const view =async (req,res)=>{
//   const check =await Post.findAll({
//     where:{
//       userId:req.headers.userId,

//     },attributes : ["id",'title']
//   })
//   console.log(req.params.id)
//       console.log(check.some(check => check.id == req.params.id) )

// }

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, content } = req.body;

  const check = await Post.findAll({
    where: {
      userId: req.headers.userId,
    },
    attributes: ["id"],
  });

  const data = await Post.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (check.some((check) => check.id == req.params.id)) {
    data.set({
      title: title,
      content: content,
    });

    data.save();
  } else {
    return res.json({ msg: "error.." });
  }

  res.json(data);
};

const delet = async (req, res) => {
  const check = await Post.findAll({
    where: {
      userId: req.headers.userId,
    },
    attributes: ["id"],
  });

  if (check.some((check) => check.id == req.params.id)) {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "deleted.." });
  } else {
    return res.json({
      message: "invalid post id.",
    });
  }
};

const getSingalPost = async (req, res) => {
  
  const data = await Post.findOne({
    where: {
      id: req.params.id,
    },
    include:[{model:User}]
  });
  
  try {
    await res.json(data);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  createPost,
  postById,
  update,
  delet,
  showPost,
  getSingalPost,
};
