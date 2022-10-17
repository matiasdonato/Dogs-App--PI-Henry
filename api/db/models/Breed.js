const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Breed", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        max_height: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        min_height: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        height: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.min_height} - ${this.max_height}`
            }
        },
        max_weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        min_weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        weight: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.min_weight} - ${this.max_weight}`
            }
        },
        max_life: {
            type: DataTypes.INTEGER,
        },
        min_life: {
            type: DataTypes.INTEGER,
        },
        yearsOfLife: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.min_life} - ${this.max_life}`
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false,
    }, )
}