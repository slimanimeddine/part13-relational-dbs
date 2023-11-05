const { DataTypes } = require('../utils/database.js')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'admin', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
    ),
    await queryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
    )
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'admin'),
    await queryInterface.removeColumn('users', 'disabled')
  }
}