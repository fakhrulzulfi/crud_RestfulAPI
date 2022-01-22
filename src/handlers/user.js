
const User = require('../../models/index').User;

exports.findAll = async () => {
    return users = await User.findAll();
};

exports.findByPk = async (userId) => {
    return await User.findByPk(userId);
};

exports.findOne = async (data) => {
    return await User.findOne(data);
};

exports.create = async (data) => {
    return await User.create(data); 
};

exports.update = async (userId, data) => {
    return await User.update(data, { where: { id: userId } });
};

exports.delete = async (userId) => {
    return await User.destroy({ where: { id: userId } });
};

exports.searchUserByUsername = async (username) => {
    return await User.findOne({ where: { name: username } });
}