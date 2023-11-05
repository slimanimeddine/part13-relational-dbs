const { sequelize, Model, DataTypes } = require('../utils/database.js')
const jtw = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

class User extends Model { 
  async generateToken() {
    const userForToken = {
      username: this.username, 
      id: this.id,
    }
   
    const token = jtw.sign(userForToken, SECRET, { expiresIn: 60 * 60 }) 
   
    return token
  }

}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  }, 
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user'
})


module.exports = User