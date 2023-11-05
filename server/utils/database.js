const { DATABASE_URL } = require('./config.js')
const { Sequelize, DataTypes, Model } = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')

const path = require('path')
const sequelize = new Sequelize(DATABASE_URL)


const migrationConfig = {
  migrations: {
    glob: path.resolve(__dirname, '../migrations/*.js'),
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}



const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}


const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('database connected')
  } catch (error) {
    console.error('connecting database failed:', error)
    return process.exit(1)
  }

  return null
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConfig)
  await migrator.down()
}

module.exports = { connectToDatabase, rollbackMigration, sequelize, DataTypes, Model }