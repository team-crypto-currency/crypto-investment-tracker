module.exports = (sequelize, DataTypes) => {
  const Coin = sequelize.define("Coin", {
    name: DataTypes.STRING,
  });

  Coin.associate = (models) => {
    Coin.belongsTo(models.User);
  };
  return Coin;
};