const mongoose = require('mongoose');

const tokenBlacklist = new mongoose.Schema({
    token: String
});

module.exports = mongoose.Model('TokenBlacklist', tokenBlacklist);
