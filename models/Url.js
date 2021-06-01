module.exports = (sequelize, Sequelize) => {
  const Url = sequelize.define("urls", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    long: {
      type: Sequelize.STRING,
    },
    short: {
      type: Sequelize.STRING,
    },
    clicks: {
      type: Sequelize.INTEGER,
    },
  });

  return Url;
};
