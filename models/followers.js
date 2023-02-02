'use strict';
module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define('Followers', {

    userId: DataTypes.INTEGER,

    followerId: DataTypes.INTEGER
  }, 

    {
      toJSON() {
        return { ...User.get(), id: undefined, userId: undefined }
      }

  });
  Followers.associate = function(models) {
    Followers.belongsTo(models.User, {foreignKey:'userId'});
    Followers.belongsTo(models.User, {foreignKey:'followerId'});
    // associations can be defined here
  };
  return Followers;
};