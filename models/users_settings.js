import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users_settings extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    setting: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'settings_main',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'settings_values_main',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users_main',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'users_settings',
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
        name: "fk_sm_um_setting_id_idx",
        using: "BTREE",
        fields: [
          { name: "setting" },
        ]
      },
      {
        name: "fk_us_svm_setting_value_id_idx",
        using: "BTREE",
        fields: [
          { name: "value" },
        ]
      },
      {
        name: "fk_us_um_user_id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
