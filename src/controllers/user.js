const user = require('../handlers/index').user;

const { nanoid } = require('nanoid');

const bcrypt = require('bcrypt');

const {checkDuplicateUsername} = require('./auth');


exports.getAll = async (req, res) => {
    try {
        const getAllData = await user.findAll();

        if( getAllData != null ) {
            return res.status(200).send({
                status: 'success',
                data : {
                    users: getAllData
                }
            });
        } else {
            return res.status(404).send({
                status: 'failed',
                message: 'Article Not Found'
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: 'failed',
            message: err.message || 'Internal Server Error'
        });
    }
};

exports.getOne = async (req, res) => {
    try {
        const { userId } = req.params;
        const getOneData = await user.findByPk(userId);

        if( getOneData != null ) {
            return res.status(200).send({
                status: 'success',
                data : {
                    getOneData
                }
            });
        } else {
            return res.status(404).send({
                status: 'failed',
                message: 'User Not Found'
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: 'failed',
            message: err.message || 'Internal Server Error'
        });
    }   
};

exports.insert = async (req, res) => {
    try {
        const checkUsername = await checkDuplicateUsername(req.body.name);
        
        if( checkUsername ) {
            return res.status(400).send({
                status: 'failed',
                message: 'Username telah digunakan!'
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const data = {
            id: nanoid(16), 
            name: req.body.name,
            password: hashedPassword,
            role: 'member'
        };

        const insertData = await user.create(data);

        if( insertData != null ) {
            return res.status(201).send({
                status: 'success',
                postID: data.id,
           });
        } else {
            return res.status(400).send({
                status: 'failed',
                message: 'Can\'t insert a new User'
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
        const { userId } = req.params;

        const { password } = req.body;
        req.body.password = await bcrypt.hash(password, 10);
        
        const data = req.body;
        
        if( !req.body.name || !req.body.password ) {
            return res.status(400).send({
                status: 'failed',
                message: `Cannot update User. Maybe Article was not found or req.body is empty!`
            });
        }
        
        const changeData = await user.update(userId, data);

        if( changeData != null ) {
            return res.status(200).send({
                status: 'success',
                message: 'User was updated successfully'
            });
        } else {
            return res.status(400).send({
                status: 'failed',
                message: 'Cannot update User. Maybe User was not found or req.body is empty!'
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
        const { userId } = req.params;

        const removeData = await user.delete(userId);
        if( removeData != null ) {
            return res.status(200).send({
                status: 'success',
                message: 'User was deleted successfully',
            });
        } else {
            return res.status(400).send({
                status: 'failed',
                message: `Can\'t delete User`,
            })
        }
    } catch (error) {
        return res.status(500).send({
            status: 'failed',
            message: error.message  || 'internal Server Error'
        });
    }
};
