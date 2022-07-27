const User = require('../Models/User')
const Role = require('../Models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../config')

const generateAccesToken = (id, roles) => {
    const payload = {
        id,
        roles,
    }

    return jwt.sign(payload, secret, { expiresIn: "24h" })
}


class authController {
    async registration(req, res) {
        try {
            const validErrors = validationResult(req)
            if (!validErrors.isEmpty()) {
                return res.status(400).json({ message: "Registration errors!", validErrors })
            }

            const { username, password } = req.body

            const candidate = await User.findOne({ username })
            if (candidate) {
                return res.status(400).json({ message: "Username is already created" })
            }

            const hashPassword = bcrypt.hashSync(password, 10)

            const userRole = await Role.findOne({ value: "USER" })

            const user = new User({
                username,
                password: hashPassword,
                roles: [userRole.value]
            })

            await user.save()

            return res.json({ message: "User sucesfull created" })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Registration error", error: error })
        }
    }

    async login(req, res) {
        try {
            const validErrors = validationResult(req)
            if (!validErrors.isEmpty()) {
                return res.status(400).json({ message: "Registration errors!", validErrors })
            }

            const { username, password } = req.body

            const user = await User.findOne({ username })
            if (!user) {
                return res.status(400).json({ mesaage: `User - ${username} not found` })
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ mesaage: `Password is not correct` })
            }

            const token = generateAccesToken(user._id, user.roles)

            return res.json({ token })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Login error", error: error })
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json({ users })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new authController();