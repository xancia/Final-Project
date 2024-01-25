const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateToken(newUser) {
    const payload = { id: newUser._id, username: newUser.username }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 300 })
}

async function register(req, res) {
    console.log('REGISTER /auth/register')
    try {

        const foundUser = await User.findOne({ username: req.body.username })

        if (foundUser) {
            return res.status(400).json({ error: 'User already exists' })
        }


        const encryptedPassword = await bcrypt.hash(req.body.password, 10)


        const newUser = await User.create({ ...req.body, password: encryptedPassword })

            
        const token = generateToken(newUser)

        res.status(200).json({ token })

    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }

}

async function login(req, res) {
    console.log('LOGIN /auth/login')
    try {


        const foundUser = await User.findOne({ username: req.body.username })

        if (!foundUser) {
            return res.status(400).json({ error: 'No such user exists' }) 
        }


        const validPass = await bcrypt.compare(req.body.password, foundUser.password)

        if (!validPass) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }


        const token = generateToken(foundUser)
        
        res.status(200).json({ token })

    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports = {
    register,
    login
}