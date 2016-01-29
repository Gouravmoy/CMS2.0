/**
 * Created by Sinu on 1/30/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var admin_usersSchema = new Schema({
    userName: String,
    password: String
});
var adminUser = mongoose.model('admin_user', admin_usersSchema);
module.exports = adminUser;
