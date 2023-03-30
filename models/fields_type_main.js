import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class fields_type_main extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: DataTypes.STRING(45),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'fields_type_main',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        },
        {
          name: "id_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        },
      ]
    });
  }
  static get({userId}) {
    return this.sequelize.query('call fields_types_main_get(:userId);', {
      replacements: {
        userId
      }
    })
  }
}
