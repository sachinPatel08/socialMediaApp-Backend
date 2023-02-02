'use strict';
module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define('session', {
    
    token: DataTypes.STRING
  }, {
    
      toJSON() {
        return { ...User.get(), id: undefined, userId: undefined }
      }
  });

  session.associate = function(models) {
    session.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return session;
};