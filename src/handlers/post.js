const { Op } = require('sequelize');

const User = require('../../models/index').User;
const Post = require('../../models/index').Post;


exports.findAll = async (search) => {
    var condition = search ? {
        [Op.or]: [
            {title: { [Op.like]: `%${search}%` }}, 
            {content: { [Op.like]: `%${search}%` }}
        ] 
    } : null;

    return await Post.findAll({
        where: condition,
        // attributes: ['title', 'content'],
        include: [{
            model: User,
            as: 'user',
            // attributes: ['name']
        }],
    });
};

exports.findByPk = async (postId) => {
    return await Post.findByPk(postId);
};

exports.create = async (data) => {
    return await Post.create(data); 
};

exports.update = async (postId, data) => {
    return await Post.update(data, { where: { id: postId } });       
};

exports.delete = async (postId) => {
    return await Post.destroy({ where: { id: postId } });
};