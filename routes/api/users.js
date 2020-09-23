const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const User = require('../../models/users_model')
const jwt = require('jsonwebtoken')
const config = require('config')

//@route Request-type='POST' End-point='api/users'
// @route    POST api/users
// @desc     Register user
// @access   Public 
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),

    check('email', 'Please include a valid email')
        .isEmail(),

    check('password', 'Please enter password more than 6 characters')
        .isLength({ min: 6 })

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //showing errors in json format.
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email }) //return user and search by 'email'
        //See if the user exists

        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] })

        }

        //Get user gravatar


        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        //Make a new user from Schema
        user = new User({
            name,
            email,
            avatar,
            password
        })

        //Encrypt the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)

        //User to Database
        await user.save();

        //Return the jsonwebtoken 
        const payload = {
            user: {
                id: user.id //Above mongoDB uses '_id' key but mongoose allows us 'id' key
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            }
        );

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error') //500 status means 'internal server error'
    }

})

module.exports = router; 