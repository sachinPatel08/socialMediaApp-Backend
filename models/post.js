'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId:DataTypes.STRING
  
  }, {
    toJSON() {
      return { ...User.get(), id: undefined, userId: undefined }
    }
  });
  
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: 'userId' })
    Post.hasMany(models.comments, {  foreignKey: 'postId'});

  };
  
  return Post;
};