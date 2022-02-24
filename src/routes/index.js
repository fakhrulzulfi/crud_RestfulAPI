const router = require('express').Router();  // --> BARU
const { checkToken, isAdmin } = require('../controllers/auth');

const post = require('../controllers/index').post;
const user = require('../controllers/index').user;
const authentication = require('../controllers/index').verifySign;


/**
 * POST ROUTES 
 * */ 
router.get('/post', checkToken, post.getAll);
router.get('/post/:postId', checkToken, post.getOne);
router.post('/post', checkToken, post.insert);
router.put('/post/:postId', checkToken, post.change);
router.delete('/post/:postId', checkToken, post.remove);


/**
 * USER ROUTES 
 * */ 
router.get('/user', checkToken, isAdmin, user.getAll);
router.get('/user/:userId', checkToken, user.getOne);
router.post('/user', user.insert);
router.put('/user/:userId', checkToken, user.change);
router.delete('/user/:userId', checkToken, user.remove);


router.post('/login', authentication.login);
router.post('/rtoken', authentication.getNewToken);
router.post('/register', user.insert);

module.exports = router;
