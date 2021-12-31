const handler = require('../handlers/index.js');

const { nanoid } = require('nanoid');

exports.getAll = async (req, res) => {
    try {
        const { search } = req.query;
        const getAllData = await handler.post.findAll(search);
        
        if( getAllData != null ) {
            return res.status(200).send({
                status: 'success',
                posts: getAllData,
            });
        } else {
            return res.status(404).send({
                status: 'failed',
                message: 'Article not found'
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: 'failed',
            message: error.message || 'Internal Server Error'
        });
    }
};

exports.getOne = async (req, res) => {
    try {
        const { postId } = req.params;

        const getOneData = await handler.post.findByPk(postId);

        if( getOneData != null ) {
            return res.status(200).send({
                status: 'success',
                post: getOneData
            });
        } else {
            return res.status(404).send({
                status: 'failed',
                message: 'Article not found'
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: 'failed',
            message: `Error retrieving Article with id = ${postId} `,
        });
    }
};

exports.insert = async (req, res) => {
    try {
        if( !req.body.title || !req.body.content || !req.body.is_published || !req.body.user_id ) {
            return res.status(400).send({
                status: 'failed',
                message: 'Content can\'t be empty!',
            });
        }

        const data = {
            id: nanoid(16),
            title: req.body.title,
            content: req.body.content,
            is_published: req.body.is_published,
            user_id: req.body.user_id
        };

        const insertData = await handler.post.create(data);

        if( insertData != null ) {
            return res.status(201).send({
                status: 'success',
                postID: data.id,
            });
        } else {
            return res.status(400).send({
                status: 'failed',
                message: 'Can\'t insert a new Article '
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: 'failed',
            message: error.message || 'Internal Server Error',
        });
    }
};

exports.change = async (req, res) => {
    try {
        const { postId } = req.params;
        const data = req.body;

        const changeData = await handler.post.update(postId, data);

        if( changeData != null ) {
            return res.status(200).send({
                status: 'success',
                message: 'Article was updated successfully'
            });
        } else {
            return res.status(400).send({
                status: 'failed',
                message: `Cannot update Article. Maybe Article was not found or req.body is empty!`
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: 'failed',
            message: error.message || 'Internal Server Error' 
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const { postId } = req.params;
        
        const removeData = await handler.post.delete(postId);

        if( removeData != null ) {
            return res.status(200).send({
                status: 'success',
                message: 'Article was deleted successfully',
            });
        } else {
            return res.status(400).send({
                status: 'failed',
                message: 'Cannot delete Article'
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: 'failed',
            message: error.message || 'Internal Server Error'
        });
    }
};
