import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class fields_main extends Model {
  static init(sequelize, DataTypes) {
    this.sequelize = sequelize
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
      name: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'fields_type_main',
          key: 'id'
        }
      },
      is_active: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1
      }
    }, {
      sequelize,
      tableName: 'fields_main',
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
          name: "fk_user_id_idx",
          using: "BTREE",
          fields: [
            { name: "user_id" },
          ]
        },
        {
          name: "fk_fm_ftm_field_type_id_idx",
          using: "BTREE",
          fields: [
            { name: "type_id" },
          ]
        },
      ]
    })
  }
  static create({fieldName, userId, ownerId, fieldType, fieldDes}) {
    return this.sequelize.query('call fields_main_create(:userId, :ownerId, :fieldName, :fieldType, :fieldDes);', {
      replacements: {
        fieldName,
        userId,
        fieldType,
        ownerId,
        fieldDes
      }
    })
  }
  static delete({fieldId, userId}) {
    return this.sequelize.query('call fields_delete(:userId, :fieldId);', {
      replacements: {
        userId,
        fieldId
      }
    })
  }
  static get({userId, from, to}) {
    return this.sequelize.query('call fields_main_get(:userId, :from, :to);', {
      replacements: {
        userId,
        from,
        to
      }
    })
  }
  // static edit({fieldId, fieldName, fieldType}) {
  //   return this.sequelize.query('call fields_main_edit(:fieldId, );')
  // }
}
