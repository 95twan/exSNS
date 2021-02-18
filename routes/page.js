const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, Post } = require('../models')

const router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보 - NodeSNS', user: req.user });
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {
        title: '회원가입 - NodeSNS',
        user: req.user,
        joinError: req.flash('joinError'),
    });
});

router.get('/', (req, res, next) => {
    Post.findAll({
        include: {
            model: User,
            attributes: ['id', 'nick'],
        },
        order: [['createdAt', 'DESC']],
    }).then((posts) => {
        res.render('main', {
            title: 'NodeSNS',
            twits: posts,
            user: req.user,
            loginError: req.flash('loginError'),
        })
    }).catch((err) => {
        console.error(err);
        next(err);
    })
});

module.exports = router;