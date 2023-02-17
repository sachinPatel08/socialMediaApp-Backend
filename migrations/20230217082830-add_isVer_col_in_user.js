'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
    return queryInterface.addColumn(
      'Users',
      'isVerified',{
        type:Sequelize.BOOLEAN,
        allowNull:true,
      }
      
     )
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
      'Users',
      'isVerified'
     )
  }
};
