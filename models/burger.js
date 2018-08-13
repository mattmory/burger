module.exports = function(sequalize, DataTypes) {
    var Burger = sequalize.define("burgers", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: {args:  [1,55],message: "Burger Names must be between 1 and 55 characters."}}
        },
        eaten: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false},
        eaten_by: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {len: {args:  [1,55],message: "Eater Names must be between 1 and 55 characters."}}
        }
    });
    return Burger;
}