'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: { 
        type: Sequelize.STRING
      },
      userId:{
          type: Sequelize.STRING,
          allowNull:false,
          references: {
            model: 'Users',
            key: 'id',
          }, 
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
      
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sessions');
  }
};