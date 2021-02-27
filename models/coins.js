module.exports = (sequelize, DataTypes) => {
    const coins = sequelize.define('coins', {
      user_id: DataTypes.INTEGER,
      coin: DataTypes.STRING,
    });
    return coins;
  };
  