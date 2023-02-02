'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {

    text: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  comments.associate = function(models) {
    comments.belongsTo(models.Post, {  foreignKey:'postId'});
    comments.belongsTo(models.User, {  foreignKey: 'userId'});
  };
  return comments;
};