const { comments, Post, User } = require("../models");

const pushComment = async (req, res) => {
  const { text } = req.body;

  const data = await comments.create({
    text: text,
    userId: req.headers.userId,
    postId: req.params.id,
  });

  res.json(data);
};

const showComent = async (req, res) => {
  const data = await comments.findAll({
    where: { userId: req.headers.userId },
    attributes: ["text", "id"],
    include: [
      {
        model: User,
        attributes: ["id", "userName"],
      },
    ],
    include: [
      {
        model: Post,
        attributes: ["title", "content", "id"],
      },
    ],
  });

  res.json(data);
};
const showCommentByPost = async (req,res)=>{
  const postData = await comments.findAll({
    where:{
      postId:req.params.id
    },
    include:[
      {
        model:User,
      }
    ]
  }
  )
  res.json(postData)
  }

const deleteComment =async (req, res) => {

  const val = await comments.findOne({
    where:{
      id: req.params.id,
      userId:req.headers.userId
    }
  })

  const data = await comments.destroy({
    where: {
      id: req.params.id,
      userId:req.headers.userId
    },
  });
  res.json(val);
};

const checkComment = ()=>{
const data = Comment.findOne(
  {
    where:{
      
    }
  }
)
}
module.exports = { pushComment, showComent, deleteComment,showCommentByPost,checkComment };
