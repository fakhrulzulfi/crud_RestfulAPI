
const User = require('../../models/index').User;

exports.findAll = async () => {
    return users = await User.findAll();
};

exports.findOne = async (userId) => {
    return await User.findByPk(userId);
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