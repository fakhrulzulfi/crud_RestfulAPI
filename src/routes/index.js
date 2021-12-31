const router = require('express').Router();  // --> BARU

const post = require('../controllers/index').post;
const user = require('../controllers/index').user;


/**
 * POST ROUTES 
 * */ 
router.get('/post', post.getAll);
router.get('/post/:postId', post.getOne);
router.post('/post', post.insert);
router.put('/post/:postId', post.change);
router.delete('/post/:postId', post.remove);


/**
 * USER ROUTES 
 * */ 
router.get('/user', user.getAll);
router.get('/user/:userId', user.getOne);
router.post('/user', user.insert);
router.put('/user/:userId', user.change);
router.delete('/user/:userId', user.remove);


module.exports = router;