const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [{
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        },
        description: {
            type: String
        }
    }],
    education: [{
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        faculty: {
            type: String,
            required: true
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        },
        description: {
            type: String
        }
    }],
    social: {
        youtube: String,
        facebook: String,
        linkedin: String,
        instagram: String,
        twitter: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);