module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('coins', {
      username: DataTypes.STRING,
    });
    return users;
  };
  