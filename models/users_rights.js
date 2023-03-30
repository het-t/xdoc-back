import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users_rights extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users_main',
        key: 'id'
      }
    },
    right_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rights_main',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'users_rights',
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
      {
        name: "fk_ur_um_user_id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_ur_rm_right_id_idx",
        using: "BTREE",
        fields: [
          { name: "right_id" },
        ]
      },
    ]
  });
  }
}
