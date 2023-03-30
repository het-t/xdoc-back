import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users_activities extends Model {
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
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'activities_main',
        key: 'id'
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    ref_table_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tables_main',
        key: 'id'
      }
    },
    ref_table_pk_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    details: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: "success"
    }
  }, {
    sequelize,
    tableName: 'users_activities',
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
        name: "fk_am_um_user-id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_ua_am_activity_id_idx",
        using: "BTREE",
        fields: [
          { name: "activity_id" },
        ]
      },
      {
        name: "fk_ua_tm_ref_table_id_idx",
        using: "BTREE",
        fields: [
          { name: "ref_table_id" },
        ]
      },
    ]
  });
  }
}
