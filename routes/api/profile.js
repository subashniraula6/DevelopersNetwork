const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const { check, validationResult } = require('express-validator')
const auth = require('../../middlewares/auth')
const User = require('../../models/users_model')
const Profile = require('../../models/profiles_model')

const request = require('request')
const config = require('config')

//@route Request-type='GET' End-point='api/profile/me'
// @route    GET api/profile/me
// @desc     Get my profile
// @access   Private 
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        //Check

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" })
        }
        res.json(profile)

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }

})

// @route    POST api/profile/me
// @desc     Make/Update profile
// @access   Private 
router.post('/', [auth, [
    check('skills', "Skills must be included")
        .not()
        .isEmpty(),
    check('status', "Status is required")
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        linkedin,
        twitter,
        instagram,
    } = req.body;

    //buid profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim())


    //build profilefield's social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            //update
            const profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            )

            return res.json(profile);

        }
        //create
        newProfile = new Profile(profileFields);
        await newProfile.save();
        return res.json(newProfile)

    } catch (error) {
        console.error(error)
        return res.status(500).send("server error");
    }

})

//@route Request-type='GET' End-point='api/profile'
// @route    GET profile
// @desc     Get all profiles
// @access   Public 
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }

})

//@route Request-type='GET' End-point='api/profile/:id'
// @route    GET profile
// @desc     Get profile by id
// @access   Public 
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        res.json(profile);
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(400).json({ msg: 'Profile not found' });
        console.log(error.message)
        res.status(500).send("Server Error")
    }

})

//@route Request-type='DELETE' End-point='api/profile/:id'
// @route    DELETE profile
// @desc     DELET profile, user , posts
// @access   Private 
router.delete('/', auth, async (req, res) => {
    try {
        //Remove profile
        const profile = await Profile.findOneAndRemove({ user: req.user.id });
        const user = await User.findByIdAndRemove({ _id: req.user.id });
        //Remove profile
        await profile.remove();
        //Remove User
        await user.remove();
        return res.json({ msg: "User successfully deleted" })

    } catch (error) {
        //if(error.type === "null") return res.status(400).json({msg: "No user"})
        console.log(error.message)
        res.status(500).send("Server Error")
    }

})

// @route Request-type='PUT' End-point='api/profile/experience'
// @route    PUT profile/experience
// @desc     Add profile experience
// @access   Private 
router.put('/experience', [auth, [
    check('title', 'Title is required')
        .not()
        .isEmpty(),
    check('company', 'Company is required')
        .not()
        .isEmpty(),
    check('from', 'from is required')
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }

})

// @route Request-type='DELETE' End-point='api/profile/experience/exp_id'
// @route    DELETE profile/experience/:exp_id
// @desc     Delete profile experience
// @access   Private 
router.delete('/experience/:exp_id', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //GET remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);


    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }

})
// @route Request-type='PUT' End-point='api/profile/education'
// @route    PUT profile/education
// @desc     Add profile education
// @access   Private 
router.put('/education', [auth, [
    check('school', 'School is required')
        .not()
        .isEmpty(),
    check('degree', 'Degree is required')
        .not()
        .isEmpty(),
    check('faculty', 'faculty is required')
        .not()
        .isEmpty()]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        school,
        degree,
        faculty
    } = req.body

    const newEdu = {
        school,
        degree,
        faculty
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }

})

// @route Request-type='DELETE' End-point='api/profile/education/edu_id'
// @route    DELETE profile/education/:edu_id
// @desc     Delete profile education
// @access   Private 
router.delete('/education/:edu_id', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //GET remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);


    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }

})

// @route    GET profile/github/:username
// @desc     Get user repos from github
// @access   Public 
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };

        request(options, (error, response, body) => {
            if(error) console.error(error)

            if(response.statusCode !== 200) {
                return res.status(400).json({ msg: "No Github profile found" })
            }
            res.json(JSON.parse(body));
        })
    } catch (err) {
        console.error(err.message);
        res.status(500) / send('server error')
    }
})


module.exports = router; 