import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users_main extends Model {
  static init(sequelize, DataTypes) {
    this.sequelize = sequelize
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      first_name: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      last_name: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(254),
        allowNull: true
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users_main',
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
      tableName: 'users_main',
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
          name: "um_um_admin_id_idx",
          using: "BTREE",
          fields: [
            { name: "admin_id" },
          ]
        },
      ]
    });
  }
  static login({username}) {
    return this.sequelize.query(`call login (:username);`, {
      replacements: {
        username,
      }
    })
  }
  static create({userId, username, hashPassword}) {
    return this.sequelize.query('call users_main_create(:userId, :username, :hashPassword);', {
      replacements: {
        userId,
        username,
        hashPassword
      }
    })
  }
  static get({userId, from, to}) {
    return this.sequelize.query('call users_main_get(:userId, :from, :to);', {
      replacements: {
        userId,
        from,
        to
      }
    })
  }
  static delete({userId, delUserId}) {
    return this.sequelize.query('call users_delete(:userId, :delUserId);', {
      replacements: {
        userId,
        delUserId
      }
    })
  }
}
