const express = require('express')
const router = express.Router();
const auth = require('../../middlewares/auth')
const User = require('../../models/users_model')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

//@route Request-type='GET' End-point='api/auth'
// @route    GET api/auth
// @desc     Get user based on passed token from localstorage if exists
// @access   Public 
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password') //exclude password
        res.json(user);
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('server error')
    }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public 

router.post('/', [
    check('email', 'Please include a valid email')
        .isEmail(),

    check('password', 'Password is required')
        .exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //showing errors in json format.
        }
    
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email }) //return user and search by 'email'
            
            //See if the user exists    
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] })

            }

            //see if password is correct
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] })
            }

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
                    return res.json({ token })
                }
            );
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error') //500 status means 'internal server error'F
        }

    }
)

module.exports = router; 