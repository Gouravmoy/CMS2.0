/**
 * Created by Sinu on 1/30/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pageShema = new Schema({
    title: String,
    url: {type: String, index: {unique: true}},
    content: String,
    menuIndex: Number,
    date: Date
});

var Page = mongoose.model('Page', pageShema);
module.exports = Page;