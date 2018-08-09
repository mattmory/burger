module.exports = function(sequalize, DataTypes) {
    var Burger = sequalize.define("burgers", {
        name: DataTypes.STRING,
        eaten: DataTypes.BOOLEAN
    });
    return Burger;
}