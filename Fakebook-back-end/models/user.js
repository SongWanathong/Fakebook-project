module.exports = (sequelize, DataType) => {

  const user = sequelize.define('user', {

    username: { type: DataType.STRING(255) },
    password: { type: DataType.STRING(255) },
    name: { type: DataType.STRING(100) },
    profile_img_url: { type: DataType.STRING(500) },
    role: { type: DataType.ENUM('user', 'admin') },

  })

  user.associate = (models) => {
    user.hasMany(models.comment, { onDelete: 'CASCADE', foreignKey: 'user_id' })
    user.hasMany(models.post, { onDelete: 'CASCADE', as: 'author', foreignKey: 'user_id' })
    user.belongsToMany(user, { as: 'request_to', foreignKey: 'request_to_id', through: models.friend })
    user.belongsToMany(user, { as: 'request_from', foreignKey: 'request_from_id', through: models.friend })
  }


  return user

}