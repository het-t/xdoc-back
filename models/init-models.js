import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _activities_main from  "./activities_main.js";
import _fields_main from  "./fields_main.js";
import _fields_type_main from  "./fields_type_main.js";
import _records_main from  "./records_main.js";
import _rights_main from  "./rights_main.js";
import _settings_main from  "./settings_main.js";
import _settings_values_main from  "./settings_values_main.js";
import _tables_main from  "./tables_main.js";
import _users_activities from  "./users_activities.js";
import _users_main from  "./users_main.js";
import _users_rights from  "./users_rights.js";
import _users_settings from  "./users_settings.js";

export default function initModels(sequelize) {
  const activities_main = _activities_main.init(sequelize, DataTypes);
  const fields_main = _fields_main.init(sequelize, DataTypes);
  const fields_type_main = _fields_type_main.init(sequelize, DataTypes);
  const records_main = _records_main.init(sequelize, DataTypes);
  const rights_main = _rights_main.init(sequelize, DataTypes);
  const settings_main = _settings_main.init(sequelize, DataTypes);
  const settings_values_main = _settings_values_main.init(sequelize, DataTypes);
  const tables_main = _tables_main.init(sequelize, DataTypes);
  const users_activities = _users_activities.init(sequelize, DataTypes);
  const users_main = _users_main.init(sequelize, DataTypes);
  const users_rights = _users_rights.init(sequelize, DataTypes);
  const users_settings = _users_settings.init(sequelize, DataTypes);

  users_activities.belongsTo(activities_main, { as: "activity", foreignKey: "activity_id"});
  activities_main.hasMany(users_activities, { as: "users_activities", foreignKey: "activity_id"});
  fields_main.belongsTo(fields_type_main, { as: "type", foreignKey: "type_id"});
  fields_type_main.hasMany(fields_main, { as: "fields_mains", foreignKey: "type_id"});
  records_main.belongsTo(records_main, { as: "parent_record", foreignKey: "parent_record_id"});
  records_main.hasMany(records_main, { as: "records_mains", foreignKey: "parent_record_id"});
  records_main.belongsTo(records_main, { as: "root_record", foreignKey: "root_record_id"});
  records_main.hasMany(records_main, { as: "root_record_records_mains", foreignKey: "root_record_id"});
  users_rights.belongsTo(rights_main, { as: "right", foreignKey: "right_id"});
  rights_main.hasMany(users_rights, { as: "users_rights", foreignKey: "right_id"});
  users_settings.belongsTo(settings_main, { as: "setting_settings_main", foreignKey: "setting"});
  settings_main.hasMany(users_settings, { as: "users_settings", foreignKey: "setting"});
  users_settings.belongsTo(settings_values_main, { as: "value_settings_values_main", foreignKey: "value"});
  settings_values_main.hasMany(users_settings, { as: "users_settings", foreignKey: "value"});
  users_activities.belongsTo(tables_main, { as: "ref_table", foreignKey: "ref_table_id"});
  tables_main.hasMany(users_activities, { as: "users_activities", foreignKey: "ref_table_id"});
  fields_main.belongsTo(users_main, { as: "user", foreignKey: "user_id"});
  users_main.hasMany(fields_main, { as: "fields_mains", foreignKey: "user_id"});
  records_main.belongsTo(users_main, { as: "user", foreignKey: "user_id"});
  users_main.hasMany(records_main, { as: "records_mains", foreignKey: "user_id"});
  users_activities.belongsTo(users_main, { as: "user", foreignKey: "user_id"});
  users_main.hasMany(users_activities, { as: "users_activities", foreignKey: "user_id"});
  users_main.belongsTo(users_main, { as: "admin", foreignKey: "admin_id"});
  users_main.hasMany(users_main, { as: "users_mains", foreignKey: "admin_id"});
  users_rights.belongsTo(users_main, { as: "user", foreignKey: "user_id"});
  users_main.hasMany(users_rights, { as: "users_rights", foreignKey: "user_id"});
  users_settings.belongsTo(users_main, { as: "user", foreignKey: "user_id"});
  users_main.hasMany(users_settings, { as: "users_settings", foreignKey: "user_id"});

  return {
    activities_main,
    fields_main,
    fields_type_main,
    records_main,
    rights_main,
    settings_main,
    settings_values_main,
    tables_main,
    users_activities,
    users_main,
    users_rights,
    users_settings,
  };
}
