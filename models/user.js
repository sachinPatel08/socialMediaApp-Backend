'use strict';
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {

    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING, 
   
  }, {
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  });
  
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Post, { foreignKey: 'userId' })
    User.hasOne(models.session,{foreignKey:'userId'});
    User.hasMany(models.Followers,{foreignKey:'userId'});
    // User.hasMany(models.comments,{foreignKey:'userId'})

  }; 
  return User;
};