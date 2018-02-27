/**
 * Created by wade on 17/3/9.
 */
var Sequelize = require('sequelize');
import Config from '../config'

export default  new Sequelize(
    Config.mysql.database,
    Config.mysql.username,
    Config.mysql.password,
    {
        host: Config.mysql.host,
        port: Config.mysql.port,
        dialect: 'mysql',
        define: {
            timestamps: false,
            underscored: false
        },
        native: false,

    }
);