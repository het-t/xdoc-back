import _sequelize from 'sequelize';
import validateToNull from '../helpers/validateToNull.js';
const { Model, Sequelize } = _sequelize;

export default class records_main extends Model {
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
      is_deleted: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0
      },
      parent_record_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'records_main',
          key: 'id'
        }
      },
      root_record_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'records_main',
          key: 'id'
        }
      },
      testing_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'records_main',
          key: 'id'
        }
      }
    }, {
      sequelize,
      tableName: 'records_main',
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
          name: "fk_rm_um_user_id_idx",
          using: "BTREE",
          fields: [
            { name: "user_id" },
          ]
        },
        {
          name: "fk_rm_rm_root_record_id_idx",
          using: "BTREE",
          fields: [
            { name: "root_record_id" },
          ]
        },
        {
          name: "fk_rm_rm_parent_record_id_idx",
          using: "BTREE",
          fields: [
            { name: "parent_record_id" },
          ]
        },
      ]
    })
  }
  static getRoots({userId, from, to}) {
    return this.sequelize.query('call records_main_get_root_records (:userId, :from, :to)', {
      replacements: {
        userId,
        from,
        to
      }
    })
    .catch(err => console.log(err))
  }
  static getBaseRecords({userId, rootRecordId, from, to}) {
    return this.sequelize.query('call records_main_get_base_records(:userId, :rootRecordId);', {
      replacements: {
        userId,
        rootRecordId
      }
    })
  }
  static getIndividual({recordId}) {
    return this.sequelize.query('call records_main_get_individual(:recordId);', {
      replacements: {
        recordId
      }
    })
  }
  static create({userId, record, parentRecordId, rootRecordId}) {
    let formattedRecord = []
    let rawRecord = JSON.parse(record)

    for(let fieldId in rawRecord) {
      formattedRecord.push({
        fieldId,
        value: rawRecord[fieldId]
      })
    }
    
    return this.sequelize.query('call records_main_create(:userId, :record, :parentRecordId, :rootRecordId);', {
      replacements: {
        userId,
        record: JSON.stringify(formattedRecord),
        parentRecordId: validateToNull(parentRecordId),
        rootRecordId: validateToNull(rootRecordId)
      }
    })
  }
  static delete({userId, recordId}) {
    return this.sequelize.query('call records_main_delete(:userId, :recordId);', {
      replacements: {
        userId,
        recordId
      }
    })
  }
}
